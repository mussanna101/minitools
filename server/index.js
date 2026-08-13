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
import { dirname } from 'node:path';
import { mkdirSync, writeFileSync, unlinkSync, existsSync } from 'node:fs';
import {
  getVideoInfo,
  downloadVideo,
  convertVideo,
  sendFile,
  isAllowedUrl,
  isRateLimited,
  COOKIES_FILE,
} from './ytdlp.js';

const app = express();
const PORT = process.env.PORT || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

app.use(cors({ origin: CORS_ORIGIN }));
// 10MB so uploaded cookies.txt files fit in the request body.
app.use(express.json({ limit: '10mb' }));

// Friendly error mapper for yt-dlp failures.
function ytError(res, error, fallback) {
  console.error(error);

  // Detect platform rate-limiting (YouTube 429 / Too Many Requests) and give
  // the user actionable info instead of a raw stack trace.
  if (isRateLimited(error)) {
    return res.status(429).json({
      error:
        'YouTube/website ne is backend ko rate-limit kar diya (HTTP 429). Kuch der baad dobara try karein, ya tool ke "🍪 Cookies" section me apni YouTube cookies upload karein (self-service fix). Server admin ho to YTDLP_PROXY bhi set kar sakte hain.',
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

// --- Fetch video metadata + format options ----------------------------------
app.post('/api/info', async (req, res) => {
  const { url } = req.body || {};
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Video URL provide karein.' });
  }
  if (!isAllowedUrl(url)) {
    return res.status(400).json({
      error:
        'Sorry, ye URL supported nahi hai. YouTube, Facebook, Instagram, TikTok, Dailymotion, Vimeo, Twitter, Reddit, SoundCloud jaise platforms use karein.',
    });
  }

  try {
    const info = await getVideoInfo(url);
    res.json(info);
  } catch (err) {
    ytError(res, err, 'Video info fetch nahi ho saki. URL check karein.');
  }
});

// --- Direct download (video or audio) ---------------------------------------
app.post('/api/download', async (req, res) => {
  const { url, formatId, type } = req.body || {};
  if (!url || !isAllowedUrl(url)) {
    return res.status(400).json({ error: 'Invalid or unsupported URL.' });
  }

  try {
    const file = await downloadVideo(url, formatId, type || 'video');
    await sendFile(res, file);
  } catch (err) {
    ytError(res, err, 'Video download nahi ho saki.');
  }
});

// --- Download + convert (MP3 audio / MP4 video) ------------------------------
app.post('/api/convert', async (req, res) => {
  const { url, to } = req.body || {};
  if (!url || !isAllowedUrl(url)) {
    return res.status(400).json({ error: 'Invalid or unsupported URL.' });
  }
  if (to !== 'mp3' && to !== 'mp4') {
    return res.status(400).json({ error: 'Format sirf mp3 ya mp4 ho sakta hai.' });
  }

  try {
    const file = await convertVideo(url, to);
    await sendFile(res, file);
  } catch (err) {
    ytError(res, err, 'Conversion nahi ho saki. FFmpeg installed check karein.');
  }
});

// --- Upload cookies.txt (self-service fix for YouTube 429) ------------------
app.post('/api/cookies', (req, res) => {
  const { cookies } = req.body || {};
  if (!cookies || typeof cookies !== 'string' || !cookies.trim()) {
    return res.status(400).json({ error: 'cookies.txt content required.' });
  }
  try {
    mkdirSync(dirname(COOKIES_FILE), { recursive: true });
    writeFileSync(COOKIES_FILE, cookies.trim() + '\n');
    res.json({ ok: true, path: COOKIES_FILE });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Cookies save nahi ho saki.' });
  }
});

// --- Clear uploaded cookies -------------------------------------------------
app.delete('/api/cookies', (_req, res) => {
  try {
    if (existsSync(COOKIES_FILE)) unlinkSync(COOKIES_FILE);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Cookies clear nahi hoi.' });
  }
});

// --- JSON parse error handler (returns clean JSON instead of an HTML page) --
app.use((err, _req, res, next) => {
  if (err && err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Request body valid JSON me bhejein.' });
  }
  next(err);
});

app.listen(PORT, () => {
  console.log(`🚀 MiniTools video downloader server running on http://localhost:${PORT}`);
});
