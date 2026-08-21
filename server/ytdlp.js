// server/ytdlp.js
// Thin wrapper around the system `yt-dlp` CLI.
// Keep all heavy lifting (signature deciphering, format extraction, ffmpeg
// merging/transcoding) on the server. yt-dlp supports YouTube, Facebook,
// Instagram, TikTok, Dailymotion, X/Twitter and many more — so a single
// endpoint serves every video-downloader tool in the frontend.

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { existsSync } from 'node:fs';
import { readFile, unlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import crypto from 'node:crypto';

const execFileAsync = promisify(execFile);

// Default binary names — allow override via env (e.g. a vendored binary path).
export const YTDLP_BIN = process.env.YTDLP_BIN || 'yt-dlp';
export const FFMPEG_BIN = process.env.FFMPEG_BIN || 'ffmpeg';

// JS runtime yt-dlp uses to solve YouTube signature challenges (EJS).
// Newer yt-dlp enables only `deno` by default. Since this server runs on
// Node.js, we point yt-dlp at the exact Node executable that is running us
// (`process.execPath`) — no PATH lookup needed. Override if needed:
//   YTDLP_JS_RUNTIMES=deno            (if deno is installed)
//   YTDLP_JS_RUNTIMES=node:/custom/node
export const JS_RUNTIMES =
  process.env.YTDLP_JS_RUNTIMES || `node:${process.execPath}`;

// Where uploaded cookies.txt is stored (self-service YouTube 429 fix).
// YTDLP_COOKIES can point at any file path inside the container.
export const COOKIES_FILE = process.env.YTDLP_COOKIES || '/data/cookies.txt';

// Real browser User-Agent — YouTube/other sites often 429/403 the default
// Python-urllib UA coming from a datacenter IP. Override if needed.
export const USER_AGENT =
  process.env.YTDLP_USER_AGENT ||
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

// Default extractor args — use web-family YouTube player clients. Combined
// with the BgUtils POT provider running in the container (see Dockerfile +
// index.js), these generate Proof-of-Origin tokens so YouTube doesn't
// bot-block / rate-limit our datacenter IP — no user cookies needed.
// Override with YTDLP_EXTRACTOR_ARGS if needed.
export const EXTRACTOR_ARGS =
  process.env.YTDLP_EXTRACTOR_ARGS ||
  'youtube:player_client=web,web_safari,web_embedded,mweb,android,tv';

// Supported hostnames — validation guard to avoid SSRF / arbitrary scrapers.
export const ALLOWED_HOSTS = [
  'youtube.com',
  'www.youtube.com',
  'youtu.be',
  'm.youtube.com',
  'youtube-nocookie.com',
  'facebook.com',
  'www.facebook.com',
  'm.facebook.com',
  'fb.watch',
  'instagram.com',
  'www.instagram.com',
  'tiktok.com',
  'www.tiktok.com',
  'vm.tiktok.com',
  'dailymotion.com',
  'www.dailymotion.com',
  'dai.ly',
  'twitter.com',
  'x.com',
  'vimeo.com',
  'www.vimeo.com',
  'twitch.tv',
  'www.twitch.tv',
  'reddit.com',
  'www.reddit.com',
  'soundcloud.com',
  'on.soundcloud.com',
  'rutube.ru',
  'ok.ru',
  'vk.com',
];

export function isAllowedUrl(url) {
  try {
    const parsed = new URL(url);
    if (!/^https?:$/.test(parsed.protocol)) return false;
    return ALLOWED_HOSTS.some(
      (h) => parsed.hostname === h || parsed.hostname.endsWith('.' + h)
    );
  } catch {
    return false;
  }
}

// yt-dlp runs are heavy and YouTube rate-limits the server IP, so cap how many
// can run at once. A burst of concurrent users otherwise hammers YouTube and
// guarantees 429s. Override with YTDLP_MAX_CONCURRENT (default 1 — stability
// over throughput on free-tier shared IPs).
const MAX_CONCURRENT = Math.max(1, Number(process.env.YTDLP_MAX_CONCURRENT || 1));
let activeRuns = 0;
const runQueue = [];

function run(args) {
  return new Promise((resolve, reject) => {
    const go = () => {
      activeRuns++;
      execFileAsync(YTDLP_BIN, args, {
        maxBuffer: 1024 * 1024 * 32, // 32MB for large JSON metadata dumps
      })
        .then(resolve)
        .catch(reject)
        .finally(() => {
          activeRuns--;
          const next = runQueue.shift();
          if (next) next();
        });
    };
    if (activeRuns < MAX_CONCURRENT) go();
    else runQueue.push(go);
  });
}

// Base yt-dlp args shared by every command — enables the JS runtime that
// handles YouTube's signature challenges, plus proxy/cookies/extractor-args
// and transport hardening for rate-limit (429) mitigation.
function baseArgs() {
  const args = [
    '--js-runtimes', JS_RUNTIMES,
    '--retries', '5',
    '--fragment-retries', '10',
    '--extractor-retries', '3',
    // Sleep between retries instead of hammering YouTube back-to-back — a
    // rate-limit usually resets within a few seconds.
    '--retry-sleep', '5',
    '--socket-timeout', '30',
    // Small delay between requests inside a single run — avoids burst 429s.
    '--sleep-requests', '0.4',
    // Cloud hosts (Railway/Vercel) sometimes route via IPv6 and get blocked;
    // force IPv4 for a cleaner egress path.
    '--force-ipv4',
    '--user-agent', USER_AGENT,
  ];
  if (process.env.YTDLP_PROXY) {
    args.push('--proxy', process.env.YTDLP_PROXY);
  }
  // Use uploaded cookies (or YTDLP_COOKIES path) when the file exists.
  if (existsSync(COOKIES_FILE)) {
    args.push('--cookies', COOKIES_FILE);
  }
  args.push('--extractor-args', EXTRACTOR_ARGS);
  return args;
}

/**
 * Update yt-dlp to the latest release in the background.
 * YouTube changes frequently and most 429 / bot-block / extraction breakage
 * is fixed by a newer yt-dlp — so keep it current on server boot.
 */
export function updateYtdlp() {
  return execFileAsync(YTDLP_BIN, ['-U'], { timeout: 60000 })
    .then(({ stdout, stderr }) => {
      const line = (stdout + stderr).trim().split('\n')[0] || '';
      if (line) console.log(`[yt-dlp] ${line}`);
    })
    .catch((err) => {
      console.error(`[yt-dlp] self-update skipped: ${(err && err.message) || err}`);
    });
}

// Detect platform rate-limiting (HTTP 429) AND YouTube's bot-block
// ("Sign in to confirm you're not a bot") in a failed yt-dlp run.
export function isRateLimited(err) {
  const s = `${(err && err.message) || ''} ${(err && err.stderr) || ''}`;
  return /HTTP Error 429|Too Many Requests|rate[- ]limit|not a bot|confirm you['\u2019]?re not a bot|bot[- ]block/i.test(s);
}

/**
 * Extract metadata for a video URL.
 * Returns a curated, frontend-friendly format list: one entry per resolution
 * (the best stream of each height), plus deduped audio options.
 */
export async function getVideoInfo(url) {
  const { stdout } = await run([...baseArgs(), '-J', '--no-playlist', url]);
  const info = JSON.parse(stdout);

  // Partition formats. YouTube (and most DASH sites) serve video-only and
  // audio-only streams separately, so "combined" formats are rare/absent —
  // we can't rely on them for the video list. A format belongs in the video
  // list when it carries a real video codec (vcodec present and not 'none'):
  // that catches both combined formats AND video-only DASH streams.
  const allFormats = info.formats || [];
  const videoStreams = allFormats.filter(
    (f) => f.vcodec && f.vcodec !== 'none'
  );
  const audioOnly = allFormats.filter(
    (f) => (!f.vcodec || f.vcodec === 'none') && f.acodec && f.acodec !== 'none'
  );

  // Rank streams inside one resolution bucket. Priority: combined
  // (video+audio in one stream, no merge needed) > h264/mp4 (plays
  // everywhere) > bitrate.
  const scoreStream = (f) => {
    let s = 0;
    if (f.acodec && f.acodec !== 'none') s += 100000;
    if (/^avc|^h264/i.test(f.vcodec || '')) s += 10000;
    if (f.ext === 'mp4') s += 2000;
    s += Math.min(f.tbr || f.bitrate || 0, 9000);
    return s;
  };

  // One entry per height: keep the best-ranked stream (fps breaks ties).
  // This removes the duplicate "1080p webm / 1080p mp4 / 1080p60 ..." noise
  // and guarantees every real resolution appears exactly once in the UI.
  const bestPerHeight = new Map();
  for (const f of videoStreams) {
    const h = f.height || 0;
    const cur = bestPerHeight.get(h);
    if (
      !cur ||
      scoreStream(f) > scoreStream(cur) ||
      (scoreStream(f) === scoreStream(cur) && (f.fps || 0) > (cur.fps || 0))
    ) {
      bestPerHeight.set(h, f);
    }
  }
  const resolutionLadder = [...bestPerHeight.values()].sort(
    (a, b) => (b.height || 0) - (a.height || 0)
  );

  // Only expose qualities backed by formats returned by yt-dlp. A synthetic
  // quality can make the UI promise a resolution that the selected video
  // does not actually provide.
  const bestEntry = resolutionLadder[0];
  const videoList = bestEntry ? [bestEntry, ...resolutionLadder.slice(1)] : [];

  // Human-readable labels: "1080p · MP4 · ~85.2 MB" / "128k · M4A · 3.9 MB".
  const formatLabel = (f) => {
    if (f.label) return f.label;
    const parts = [];
    if (f.format_note === 'Best') {
      parts.push(info.height ? `Best (${info.height}p)` : 'Best available');
    } else if (f.height) {
      parts.push(`${f.height}p${f.fps >= 50 ? f.fps : ''}`);
    } else if (f.abr) {
      parts.push(`${Math.round(f.abr)}k`);
    } else {
      parts.push(f.format_note || 'auto');
    }
    if (f.ext) parts.push(String(f.ext).toUpperCase());
    const bytes = f.filesize || f.filesize_approx || 0;
    if (bytes) parts.push(`~${(bytes / (1024 * 1024)).toFixed(1)} MB`);
    return parts.join(' · ');
  };

  // For video-only streams, append `+bestaudio` so the download includes
  // audio — DASH video-only streams have no audio of their own. Entries whose
  // format_id already contains `+` (Best/4K selectors) are left untouched.
  const toVideoOption = (f) => ({
    format_id:
      (!f.acodec || f.acodec === 'none') && !f.format_id.includes('+')
        ? `${f.format_id}+bestaudio/best`
        : f.format_id,
    ext: f.ext,
    note: f.format_note || null,
    height: f.height || null,
    fps: f.fps || null,
    filesize: f.filesize || f.filesize_approx || null,
    label: formatLabel(f),
  });

  // Dedupe audio by bitrate (sites expose several containers per bitrate).
  const bestPerAbr = new Map();
  for (const f of audioOnly) {
    const k = f.abr || f.tbr || 0;
    const cur = bestPerAbr.get(k);
    if (!cur || (f.tbr || 0) > (cur.tbr || 0)) bestPerAbr.set(k, f);
  }
  const audioOptions = [...bestPerAbr.values()]
    .sort((a, b) => (b.abr || b.tbr || 0) - (a.abr || a.tbr || 0))
    .slice(0, 5)
    .map((f) => ({
      format_id: f.format_id,
      ext: f.ext,
      note: f.format_note || null,
      abr: f.abr || null,
      filesize: f.filesize || f.filesize_approx || null,
      label: formatLabel(f),
    }));

  return {
    id: info.id || null,
    title: info.title || 'Untitled video',
    thumbnail: info.thumbnail || null,
    duration: info.duration || 0,
    uploader: info.uploader || info.channel || null,
    webpage_url: info.webpage_url || url,
    formats: {
      video: videoList.map(toVideoOption),
      audio: audioOptions,
    },
  };
}

// Unique temp file path per request so concurrent downloads don't collide.
function tempPath(ext) {
  return join(tmpdir(), `minitools-${crypto.randomUUID()}.${ext}`);
}

// Build a friendly download filename from the video title (sanitized), with
// a timestamped fallback when no title is available.
function safeFilename(title, fallbackPrefix, ext) {
  const base = String(title || '')
    .replace(/[\\/:*?"<>|\u0000-\u001F]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 80);
  return base ? `${base}.${ext}` : `${fallbackPrefix}-${Date.now()}.${ext}`;
}

/**
 * Download a video (or audio-only) file to a temp path.
 * Returns { path, filename, ext }.
 */
export async function downloadVideo(url, formatId, type = 'video', title = '') {
  const ext = type === 'audio' ? 'm4a' : 'mp4';
  const out = tempPath(ext);

  const args = [
    ...baseArgs(),
    '-f',
    formatId || (type === 'audio' ? 'bestaudio/best' : 'bestvideo+bestaudio/best'),
    '--no-playlist',
    '--no-warnings',
    '-o',
    out,
    url,
  ];

  if (type !== 'audio') {
    args.splice(args.indexOf('--no-playlist'), 0, '--merge-output-format', 'mp4');
    args.splice(args.indexOf('--no-playlist'), 0, '--ffmpeg-location', FFMPEG_BIN);
  }

  await run(args);
  return {
    path: out,
    filename: safeFilename(title, type === 'audio' ? 'audio' : 'video', ext),
    ext,
  };
}

/**
 * Download + convert to a target format via ffmpeg (mp3 audio, or mp4 video).
 * For MP4, an optional `formatId` (from /api/info) pins the requested
 * quality; without it the best available stream is used.
 */
export async function convertVideo(url, to = 'mp3', formatId = '', title = '') {
  const ext = to === 'mp3' ? 'mp3' : 'mp4';
  const out = tempPath(ext);

  const args = [...baseArgs()];

  if (to === 'mp3') {
    // Extract audio from the video and convert to MP3.
    args.push('-x', '--audio-format', 'mp3');
  } else {
    // Download the requested quality (falls back to best) and mux into an
    // MP4 container. (Previously used `-x --recode-video mp4`, but `-x` strips
    // video, leaving `--recode-video` with no stream to work on — so "Convert
    // to MP4" failed.)
    args.push(
      '-f',
      formatId || 'bestvideo+bestaudio/best',
      '--merge-output-format',
      'mp4'
    );
  }

  args.push(
    '--ffmpeg-location',
    FFMPEG_BIN,
    '--no-playlist',
    '--no-warnings',
    '-o',
    out,
    url
  );

  await run(args);
  return { path: out, filename: safeFilename(title, 'converted', ext), ext };
}

/**
 * Stream a finished temp file to the Express response and clean it up after.
 */
export async function sendFile(res, { path, filename, ext }) {
  res.download(path, filename, async (err) => {
    try {
      await unlink(path).catch(() => {});
    } catch {
      /* ignore cleanup errors */
    }
    if (err && !res.headersSent) {
            res.status(500).json({ error: 'Error sending file.' });
    }
  });
}

// Small helper so callers can read a temp file directly if needed.
export async function readTempFile(path) {
  return readFile(path);
}
