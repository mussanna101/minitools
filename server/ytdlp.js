// server/ytdlp.js
// Thin wrapper around the system `yt-dlp` CLI.
// Keep all heavy lifting (signature deciphering, format extraction, ffmpeg
// merging/transcoding) on the server. yt-dlp supports YouTube, Facebook,
// Instagram, TikTok, Dailymotion, X/Twitter and many more — so a single
// endpoint serves every video-downloader tool in the frontend.

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { readFile, unlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import crypto from 'node:crypto';

const execFileAsync = promisify(execFile);

// Default binary names — allow override via env (e.g. a vendored binary path).
export const YTDLP_BIN = process.env.YTDLP_BIN || 'yt-dlp';
export const FFMPEG_BIN = process.env.FFMPEG_BIN || 'ffmpeg';

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

function run(args) {
  return execFileAsync(YTDLP_BIN, args, {
    maxBuffer: 1024 * 1024 * 32, // 32MB for large JSON metadata dumps
  });
}

/**
 * Extract metadata for a video URL.
 * Returns a curated, frontend-friendly format list.
 */
export async function getVideoInfo(url) {
  const { stdout } = await run(['-J', '--no-playlist', url]);
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
      res.status(500).json({ error: 'File send karne me error aaya.' });
    }
  });
}

// Small helper so callers can read a temp file directly if needed.
export async function readTempFile(path) {
  return readFile(path);
}
