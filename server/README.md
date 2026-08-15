# MiniTools Video Downloader — Backend

Self-hosted download/conversion service that powers the **YouTube Downloader**
and **Universal Video Downloader** tools in the frontend.

It wraps the `yt-dlp` CLI (plus `ffmpeg` for conversion) so a single backend
supports YouTube, Facebook, Instagram, TikTok, Dailymotion, Vimeo, Twitter/X,
Reddit, SoundCloud and many more — the exact same sites the frontend needs.

## Why a backend is needed

Video sites (especially YouTube) cannot be downloaded from a static/browser-only
app: they block cross-origin requests (CORS) and YouTube obfuscates its video
URLs with signature deciphering. `yt-dlp` handles all of that on the server.

## Requirements

- Node.js 18+
- `yt-dlp` on PATH → https://github.com/yt-dlp/yt-dlp
- `ffmpeg` on PATH → https://ffmpeg.org

Install (Windows):
```powershell
winget install yt-dlp.yt-dlp
winget install Gyan.FFmpeg
```

## Run locally

```bash
cd server
npm install
npm start          # -> http://localhost:4000
```

## Environment variables

| Var          | Default                | Description                                   |
|--------------|------------------------|-----------------------------------------------|
| `PORT`       | `4000`                 | Listening port                                |
| `CORS_ORIGIN`| `*`                    | Allowed frontend origin (set to your domain)  |
| `YTDLP_BIN`  | `yt-dlp`               | Custom yt-dlp binary path                     |
| `FFMPEG_BIN` | `ffmpeg`               | Custom ffmpeg binary path                     |
| `YTDLP_JS_RUNTIMES` | `node:<running node path>` | JS runtime yt-dlp uses (e.g. `deno`, `node:/path`) |
| `YTDLP_PROXY` | *(empty)*             | Proxy URL passed to yt-dlp (`--proxy`) — helps bypass 429/IP block |
| `YTDLP_COOKIES` | *(empty)*           | Path to a cookies.txt file (`--cookies`) — optional admin auth |
| `YTDLP_EXTRACTOR_ARGS` | *(empty)*     | e.g. `youtube:player_client=web,android,tv` (`--extractor-args`) |
| `POT_SERVER_BIN` | `/opt/pot-provider/server/build/main.js` | BgUtils POT provider entry point (spawned at boot) |
| `POT_SERVER_PORT` | `4416`            | Port the POT provider listens on              |
| `YTDLP_MAX_CONCURRENT` | `1`         | Max simultaneous yt-dlp processes (spaces out requests to avoid YouTube 429 bursts) |

The Dockerfile builds the [BgUtils POT provider](https://github.com/Brainicism/bgutil-ytdlp-pot-provider)
into the image. On boot, `index.js` starts it on `127.0.0.1:4416` and yt-dlp
uses it to generate **Proof-of-Origin tokens** automatically — this is what
lets the backend work from a cloud/datacenter IP without requiring users to
upload cookies.

Set `YTDLP_PROXY`, `YTDLP_COOKIES` and friends in `server/.env` locally, or in the
Railway Variables tab. The cookie file must be reachable inside the container
(e.g. via a mounted volume or copied into the image).

Create a `server/.env` file (not committed) with your production origin.

## Deploy backend on Railway (recommended)

The frontend stays on Vercel; only this `server/` folder is deployed to Railway.
A `Dockerfile` is included so Railway installs `ffmpeg` + `yt-dlp` automatically.

1. On Railway: **New Project → Deploy from GitHub repo** → select your `mini-tools` repo.
2. On the new web service's **Settings**:
   - **Root Directory**: `server`
3. Set **Variables**:
   - `CORS_ORIGIN` = `https://minitools-silk.vercel.app` (your Vercel domain)
4. Railway auto-detects the `Dockerfile` in `server/` (no build/start command needed).
5. Deploy → make a note of the generated URL, e.g. `https://your-backend.up.railway.app`.

Then connect the frontend:
- Vercel → Project Settings → Environment Variables:
  `VITE_BACKEND_URL = https://your-backend.up.railway.app`
- Redeploy the Vercel frontend.

> Pushing to the same repo on GitHub triggers BOTH: Vercel builds the frontend
> from the repo root, and Railway rebuilds the backend from `server/`.

## Railway troubleshooting

- If download fails with a "yt-dlp not found" error, the service did not build
  from the Dockerfile — confirm **Root Directory = `server`** and redeploy.
- If you get **HTTP 429 / Too Many Requests** from YouTube, the Railway IP is
  being rate-limited. The server auto-refreshes its yt-dlp binary and generates
  Proof-of-Origin tokens, so a minute-long pause + retry usually resolves it.
  As a last resort you can set `YTDLP_PROXY` (a working proxy) or mount a
  cookies file via `YTDLP_COOKIES`.
- If yt-dlp still reports no JS runtime, the code points it at `node:<path>`
  automatically (it cannot be missing because the API itself runs on Node). If
  you override `YTDLP_JS_RUNTIMES`, make sure the runtime actually exists.
- Keep the backend URL up to date in the Vercel env var whenever the Railway
  URL changes.


## API

### `GET /api/status`
Diagnostics: `{ potServer, potPluginInstalled, ytdlpVersion, infoCacheEntries }`.
Use this to verify the POT provider is actually running after a deploy.

### `POST /api/info`
Body: `{ "url": "https://..." }`
Returns `{ id, title, thumbnail, duration, uploader, webpage_url, formats: { video: [...], audio: [...] } }`.

### `POST /api/download`
Body: `{ "url": "...", "formatId": "137", "type": "video" }`
Streams the file back as an attachment (MP4).

### `POST /api/convert`
Body: `{ "url": "...", "to": "mp3" }`   (`to`: `mp3` or `mp4`)
Downloads + converts via ffmpeg, streams the file back as an attachment.

> Note: `yt-dlp` now runs with
> `--extractor-args youtube:player_client=web,web_safari,web_embedded,mweb,android,tv`
> by default and uses the BgUtils POT provider for token generation. Override
> with `YTDLP_EXTRACTOR_ARGS`.

## Security / legal notes

- Only an allowlisted set of hostnames is accepted (see `ALLOWED_HOSTS` in `ytdlp.js`)
  to prevent SSRF and arbitrary scraping.
- Add rate-limiting / auth in front of the server before public deployment.
- Use only your own content or videos you have permission to download;
  copyrighted material may violate the source site's terms of service.
