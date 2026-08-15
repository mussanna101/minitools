// server/index.js
// MiniTools Video Downloader Backend
// -------------------------------
// Self-hosted wrapper around `yt-dlp` (+ `ffmpeg`) that lets the static
// frontend download & convert videos from YouTube, Facebook, Instagram,
// TikTok, Dailymotion and more.
//
// Requirements:
//   - Node.js 18+
//   - yt-dlp  (https://github.com/yt-dlp/yt-dlp)     -> install on PATH
//   - ffmpeg  (https://ffmpeg.org)                   -> install on PATH
//
// Run locally:  npm install && npm start   (defaults to port 4000)
// Env:
//   PORT            -> listening port (default 4000)
//   CORS_ORIGIN     -> allowed frontend origin (default * for dev)
//   YTDLP_BIN       -> custom yt-dlp binary path
//   FFMPEG_BIN      -> custom ffmpeg binary path

import express from 'express';
import cors from 'cors';
import { spawn, execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { existsSync } from 'node:fs';
import net from 'node:net';
import {
  getVideoInfo,
  downloadVideo,
  convertVideo,
  sendFile,
  isAllowedUrl,
  isRateLimited,
  updateYtdlp,
  YTDLP_BIN,
} from './ytdlp.js';

const execFileAsync = promisify(execFile);

const app = express();
const PORT = process.env.PORT || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

const POT_SERVER_BIN = process.env.POT_SERVER_BIN || '';
const POT_SERVER_PORT = Number(process.env.POT_SERVER_PORT || 4416);

// Short-lived cache for /api/info — the same viral video is requested many
// times from the same Railway IP, and every extraction hits YouTube several
// times. Caching for a few minutes cuts that traffic and reduces 429s.
const INFO_CACHE_TTL_MS = 10 * 60 * 1000;
const infoCache = new Map();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Retry once on a YouTube rate-limit (429) after a short pause, so the user
// doesn't have to manually wait and re-click. Non-429 errors pass through.
async function with429Retry(fn, { attempts = 2, delayMs = 8000 } = {}) {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      const isRate = isRateLimited(err);
      if (i < attempts - 1 && isRate) {
        console.warn(`[429] rate-limited, retrying in ${delayMs}ms...`);
        await sleep(delayMs);
        continue;
      }
      if (isRate) {
        updateYtdlp(); // fire-and-forget: newer yt-dlp often fixes blocks
      }
      throw err;
    }
  }
}

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json({ limit: '1mb' }));

// Friendly error mapper for yt-dlp failures.
function ytError(res, error, fallback) {
  console.error(error);

  // Detect platform rate-limiting (YouTube 429 / Too Many Requests) and give
  // the user actionable info instead of a raw stack trace. Also kick off a
  // yt-dlp self-update in the background — many 429/bot-blocks are fixed by a
  // newer yt-dlp release.
  if (isRateLimited(error)) {
    updateYtdlp();
    return res.status(429).json({
      error:
        'YouTube is rate-limiting this server right now (HTTP 429). The server refreshes its access tokens automatically — please wait a minute and try again.',
    });
  }

  const msg =
    (error && error.message) ||
    (error && error.stdout) ||
    fallback ||
    'Server error. Please try again.';
  res.status(500).json({ error: String(msg).slice(0, 500) });
}

// --- Health / index ----------------------------------------------------------
app.get('/', (_req, res) => {
  res.json({ ok: true, service: 'MiniTools Video Downloader' });
});

// --- Diagnostics: POT provider up?, yt-dlp version, POT plugin installed? ---
app.get('/api/status', async (_req, res) => {
  const pot = await new Promise((resolve) => {
    const socket = net.connect(POT_SERVER_PORT, '127.0.0.1');
    socket.setTimeout(3000);
    socket.once('connect', () => { socket.destroy(); resolve('up'); });
    socket.once('error', () => { socket.destroy(); resolve('down'); });
    socket.once('timeout', () => { socket.destroy(); resolve('down'); });
  });

  let ytdlpVersion = null;
  try {
    const { stdout } = await execFileAsync(YTDLP_BIN, ['--version'], { timeout: 10000 });
    ytdlpVersion = stdout.trim();
  } catch (err) {
    ytdlpVersion = `unavailable (${(err && err.message) || err})`;
  }

  let potPlugin = false;
  try {
    await execFileAsync('pip3', ['show', 'bgutil-ytdlp-pot-provider'], { timeout: 10000 });
    potPlugin = true;
  } catch {
    potPlugin = false;
  }

  res.json({
    potServer: pot,
    potPluginInstalled: potPlugin,
    ytdlpVersion,
    infoCacheEntries: infoCache.size,
  });
});

// --- Fetch video metadata + format options ----------------------------------
app.post('/api/info', async (req, res) => {
  const { url } = req.body || {};
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Please provide a video URL.' });
  }
  if (!isAllowedUrl(url)) {
    return res.status(400).json({
      error:
        'Sorry, this URL is not supported. Please use it with YouTube, Facebook, Instagram, TikTok, Dailymotion, Vimeo, Twitter, Reddit, SoundCloud, or similar platforms.',
    });
  }

  try {
    const cacheKey = url.trim();
    const hit = infoCache.get(cacheKey);
    if (hit && hit.expires > Date.now()) {
      return res.json(hit.value);
    }

    const info = await with429Retry(() => getVideoInfo(url));
    infoCache.set(cacheKey, { value: info, expires: Date.now() + INFO_CACHE_TTL_MS });
    // Opportunistically drop expired entries so the map can't grow unbounded.
    if (infoCache.size > 500) {
      const now = Date.now();
      for (const [k, v] of infoCache) if (v.expires < now) infoCache.delete(k);
    }
    res.json(info);
  } catch (err) {
    ytError(res, err, 'Could not fetch video info. Please check the URL.');
  }
});

// --- Direct download (video or audio) ---------------------------------------
app.post('/api/download', async (req, res) => {
  const { url, formatId, type } = req.body || {};
  if (!url || !isAllowedUrl(url)) {
    return res.status(400).json({ error: 'Invalid or unsupported URL.' });
  }

  try {
    const file = await with429Retry(() =>
      downloadVideo(url, formatId, type || 'video')
    );
    await sendFile(res, file);
  } catch (err) {
        ytError(res, err, 'Video could not be downloaded.');
  }
});

// --- Download + convert (MP3 audio / MP4 video) ------------------------------
app.post('/api/convert', async (req, res) => {
  const { url, to } = req.body || {};
  if (!url || !isAllowedUrl(url)) {
    return res.status(400).json({ error: 'Invalid or unsupported URL.' });
  }
  if (to !== 'mp3' && to !== 'mp4') {
    return res.status(400).json({ error: 'Format must be either mp3 or mp4.' });
  }

  try {
    const file = await with429Retry(() => convertVideo(url, to));
    await sendFile(res, file);
  } catch (err) {
    ytError(res, err, 'Conversion failed. Please check that FFmpeg is installed.');
  }
});

// --- Start the BgUtils POT provider (generates YouTube Proof-of-Origin
// tokens so the backend isn't bot-blocked / rate-limited). Returns a promise
// that resolves once the server answers /ping, or after a short timeout so the
// API still boots if the provider is unavailable.
function startPotProvider() {
  if (!POT_SERVER_BIN || !existsSync(POT_SERVER_BIN)) {
    console.warn(
      `[pot] provider binary not found (${POT_SERVER_BIN || 'POT_SERVER_BIN unset'}) — continuing without it.`
    );
    return Promise.resolve();
  }

  const child = spawn(
    process.execPath,
    [POT_SERVER_BIN, '-p', String(POT_SERVER_PORT)],
    { stdio: 'inherit' }
  );
  child.on('error', (err) => {
    console.error('[pot] provider failed to start:', err.message);
  });
  child.on('exit', (code) => {
    if (code && code !== 0) console.warn(`[pot] provider exited with code ${code}`);
  });
  process.on('exit', () => child.kill());

  return new Promise((resolve) => {
    const deadline = Date.now() + 10000;
    const ping = () => {
      const socket = net.connect(POT_SERVER_PORT, '127.0.0.1');
      socket.once('connect', () => {
        socket.destroy();
        console.log(`[pot] provider ready on 127.0.0.1:${POT_SERVER_PORT}`);
        resolve();
      });
      socket.once('error', () => {
        socket.destroy();
        if (Date.now() > deadline) {
          console.warn('[pot] provider not ready in time — continuing anyway.');
          resolve();
        } else {
          setTimeout(ping, 500);
        }
      });
    };
    ping();
  });
}

// --- JSON parse error handler (returns clean JSON instead of an HTML page) --
app.use((err, _req, res, next) => {
  if (err && err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Request body must be valid JSON.' });
  }
  next(err);
});

startPotProvider().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 MiniTools video downloader server running on http://localhost:${PORT}`);
    // Keep yt-dlp current in the background after boot — non-blocking, so the
    // container is ready immediately and YouTube fixes get picked up.
    setTimeout(updateYtdlp, 5000);
  });
});
