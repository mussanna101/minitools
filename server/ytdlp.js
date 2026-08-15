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
 * Returns a curated, frontend-friendly format list.
 */
export async function getVideoInfo(url) {
  const { stdout } = await run([...baseArgs(), '-J', '--no-playlist', url]);
  const info = JSON.parse(stdout);

  // Pick the best combined formats first, then best audio.
  const combined = (info.formats || []).filter(
    (f) => f.vcodec && f.vcodec !== 'none' && f.acodec && f.acodec !== 'none'
  );
  const audioOnly = (info.formats || []).filter(
    (f) => (!f.vcodec || f.vcodec === 'none') && f.acodec && f.acodec !== 'none'
  );

  const formatLabel = (f) => {
    let label = f.format_note || f.height || 'auto';
    if (f.ext) label += ` · ${f.ext}`;
    if (f.filesize || f.filesize_approx) {
      const mb = (f.filesize || f.filesize_approx) / (1024 * 1024);
      label += ` · ${mb.toFixed(1)} MB`;
    }
    return label;
  };

  // Augment video list: if cookies are present, prepend a 4K synthetic entry
  // so the UI always shows a 4K/2160p option (yt-dlp will resolve it at download time).
  let videoList = combined.length ? combined : info.formats || [];
  if (existsSync(COOKIES_FILE)) {
    videoList = [
      {
        format_id: 'bestvideo[height<=2160]+bestaudio/best',
        height: 2160,
        ext: 'mp4',
        note: '4K',
        label: '4K · mp4 (up to 2160p)',
        vcodec: 'vp9',
        acodec: 'none',
      },
      ...videoList,
    ];
  }

  const pickFormats = (list, take) =>
    [...new Map(list.map((f) => [f.format_id, f])).values()]
      .sort((a, b) => (b.height || 0) - (a.height || 0))
      .slice(0, take)
      .map((f) => ({
        format_id: f.format_id,
        ext: f.ext,
        note: f.format_note || null,
        height: f.height || null,
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
      video: pickFormats(
        combined.length ? combined : info.formats || [],
        8
      ),
      audio: pickFormats(audioOnly, 5),
    },
  };
}

// Unique temp file path per request so concurrent downloads don't collide.
function tempPath(ext) {
  return join(tmpdir(), `minitools-${crypto.randomUUID()}.${ext}`);
}

/**
 * Download a video (or audio-only) file to a temp path.
 * Returns { path, filename, ext }.
 */
export async function downloadVideo(url, formatId, type = 'video') {
  const ext = type === 'audio' ? 'm4a' : 'mp4';
  const out = tempPath(ext);

  const args = [
    ...baseArgs(),
    '-f',
    formatId || (type === 'audio' ? 'bestaudio/best' : 'bestvideo+bestaudio/best'),
    '--merge-output-format',
    'mp4',
    '--no-playlist',
    '--no-warnings',
    '-o',
    out,
    url,
  ];

  await run(args);
  return { path: out, filename: `video-${Date.now()}.mp4`, ext };
}

/**
 * Download + convert to a target format via ffmpeg (mp3 audio, or mp4 video).
 */
export async function convertVideo(url, to = 'mp3') {
  const ext = to === 'mp3' ? 'mp3' : 'mp4';
  const out = tempPath(ext);

  const args = [
    ...baseArgs(),
    '-x',
    to === 'mp3' ? '--audio-format' : '--recode-video',
    to === 'mp3' ? 'mp3' : 'mp4',
    '--ffmpeg-location',
    FFMPEG_BIN,
    '--no-playlist',
    '--no-warnings',
    '-o',
    out,
    url,
  ];

  await run(args);
  return { path: out, filename: `converted-${Date.now()}.${ext}`, ext };
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
