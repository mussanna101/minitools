import { useState } from 'react';
import { getBackendUrl, setBackendUrl } from '../../config';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

// Trigger a browser download from a Blob.
function saveBlob(blob, name) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

// Extract a filename from a Content-Disposition header, if present.
function filenameFromHeaders(headers, fallback) {
  const cd = headers && headers.get('content-disposition');
  if (cd) {
    const match = /filename\*?=(?:UTF-8''|")?([^";]+)/i.exec(cd);
    if (match && match[1]) {
      return decodeURIComponent(match[1].replace(/["]/g, '').trim()) || fallback;
    }
  }
  return fallback;
}

function formatDuration(sec) {
  if (!sec || sec <= 0) return '';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

// Friendly, human-readable message for the user from a fetch/network error.
function describeError(err, backendUrl) {
  const msg = (err && err.message) || '';
  if (/Failed to fetch|NetworkError|ERR_CONNECTION_REFUSED|ERR_NETWORK/i.test(msg)) {
    return `Backend is offline or unreachable. Is the Railway service running? Or set the URL in the "Backend URL" field below. (Current: ${backendUrl})`;
  }
  if (msg) return msg;
  return `Something went wrong. Please try again. (Current backend: ${backendUrl})`;
}

// ---------------------------------------------------------------------------
// Reusable Video Downloader core (used by both tools)
// ---------------------------------------------------------------------------
function VideoDownloaderCore({ placeholder, exampleUrl }) {
  const [url, setUrl] = useState('');
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState('');
  const [error, setError] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');

  // Backend URL state + settings UI (persisted via config/localStorage)
  const [backendUrl, setBackendUrlState] = useState(getBackendUrl);
  const [showSettings, setShowSettings] = useState(false);
  const [backendDraft, setBackendDraft] = useState(getBackendUrl);
  const [testing, setTesting] = useState(false);
  const [testMsg, setTestMsg] = useState(null);

  const saveAndApplyBackend = () => {
    const v = backendDraft.trim();
    if (!v) {
      setTestMsg({ ok: false, text: 'Backend URL cannot be empty.' });
      return;
    }
    setBackendUrl(v); // persist
    setBackendUrlState(v); // use for next requests
    setTestMsg({ ok: true, text: 'Backend URL saved. Now try "Get Video".' });
  };

  const testConnection = async () => {
    const v = backendDraft.trim() || getBackendUrl();
    setTesting(true);
    setTestMsg(null);
    try {
      const resp = await fetch(`${v}/`, { method: 'GET' });
      if (resp.ok) {
        const data = await resp.json().catch(() => ({}));
        setTestMsg({ ok: true, text: `Connection OK ✅ — ${data.service || 'backend reachable'}` });
      } else {
        setTestMsg({ ok: false, text: `Backend ne reply diya: HTTP ${resp.status}` });
      }
    } catch (e) {
      setTestMsg({ ok: false, text: describeError(e, v) });
    }
    setTesting(false);
  };

  const fetchInfo = async () => {
    setError('');
    setInfo(null);
    if (!url.trim()) {
      setError('Please paste the video URL first.');
      return;
    }
    setLoading(true);
    try {
      const resp = await fetch(`${backendUrl}/api/info`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await resp.json();
      if (!resp.ok) {
        throw new Error(data.error || `Server error (HTTP ${resp.status})`);
      }
      setInfo(data);
      setSelectedFormat(data.formats?.video?.[0]?.format_id || '');
    } catch (e) {
      setError(describeError(e, backendUrl));
    }
    setLoading(false);
  };

  // Generic blob download (direct video file OR converted mp3/mp4).
  const runDownload = async (endpoint, payload, extLabel) => {
    setDownloading(endpoint);
    setError('');
    try {
      const resp = await fetch(`${backendUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!resp.ok) {
        let msg = 'Download nakaam raha.';
        try {
          const d = await resp.json();
          msg = d.error || msg;
        } catch {
          /* ignore */
        }
        throw new Error(msg);
      }
      const blob = await resp.blob();
      const safeTitle = (info?.title || 'video')
        .replace(/[\\/:*?"<>|]/g, '')
        .slice(0, 80);
      saveBlob(
        blob,
        filenameFromHeaders(resp.headers, `${safeTitle}.${extLabel}`)
      );
    } catch (e) {
      setError(describeError(e, backendUrl));
    }
    setDownloading('');
  };

  const handleDownload = () => {
    if (!url.trim()) return;
    const payload = selectedFormat
      ? { url: url.trim(), formatId: selectedFormat, type: 'video' }
      : { url: url.trim(), type: 'video' };
    runDownload('/api/download', payload, 'mp4');
  };

  const handleConvert = (to) => {
    if (!url.trim()) return;
    runDownload('/api/convert', { url: url.trim(), to }, to);
  };

  const videoFormats = info?.formats?.video || [];

  return (
    <div className="space-y-4">
      {/* Backend URL settings panel */}
      <div className="card p-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-700 dark:text-gray-300">Backend URL</span>
          <button
            type="button"
            onClick={() => setShowSettings((s) => !s)}
            className="text-primary-600 dark:text-primary-400 hover:underline text-xs"
          >
            {showSettings ? 'Hide' : '⚙️ Change'}
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 break-all">{backendUrl}</p>
        {showSettings && (
          <div className="mt-3 space-y-2">
            <input
              type="text"
              className="input-field"
              value={backendDraft}
              onChange={(e) => setBackendDraft(e.target.value)}
              placeholder="https://your-backend.up.railway.app"
            />
            <div className="flex gap-2">
              <button type="button" onClick={saveAndApplyBackend} className="btn-secondary">
                Save URL
              </button>
              <button
                type="button"
                onClick={testConnection}
                disabled={testing}
                className="btn-secondary"
              >
                {testing ? 'Testing...' : '🔌 Test Connection'}
              </button>
            </div>
            {testMsg && (
              <p
                className={`text-xs ${
                  testMsg.ok
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-500'
                }`}
              >
                {testMsg.text}
              </p>
            )}
          </div>
        )}
      </div>

      <div>
        <input
          type="text"
          className="input-field"
          placeholder={placeholder}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchInfo()}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Example: {exampleUrl}
        </p>
      </div>

      <button onClick={fetchInfo} disabled={loading} className="btn-primary w-full">
        {loading ? 'Analyzing video...' : '🔍 Get Video'}
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {info && (
        <div className="card p-4 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {info.thumbnail && (
              <img
                src={info.thumbnail}
                alt={info.title}
                className="w-full sm:w-48 rounded-lg object-cover border border-gray-300 dark:border-gray-600"
              />
            )}
            <div className="flex-1 space-y-1">
              <h3 className="font-semibold leading-snug">{info.title}</h3>
              {info.uploader && (
                <p className="text-sm text-gray-600 dark:text-gray-400">{info.uploader}</p>
              )}
              {info.duration > 0 && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  ⏱ {formatDuration(info.duration)}
                </p>
              )}
            </div>
          </div>

          {videoFormats.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Video Quality / Format
              </label>
              <select
                className="input-field"
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
              >
                {videoFormats.map((f) => (
                  <option key={f.format_id} value={f.format_id}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button onClick={handleDownload} disabled={downloading !== ''} className="btn-primary">
              {downloading === '/api/download' ? 'Downloading...' : '⬇ Download Video'}
            </button>
            <button onClick={() => handleConvert('mp4')} disabled={downloading !== ''} className="btn-secondary">
              {downloading === '/api/convert' ? 'Converting...' : '🎞 Convert to MP4'}
            </button>
            <button onClick={() => handleConvert('mp3')} disabled={downloading !== ''} className="btn-secondary">
              {downloading === '/api/convert' ? 'Converting...' : '🎵 Download MP3'}
            </button>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            💡 MP4/MP3 conversion is done on the backend via ffmpeg. Only
            download your own content or public videos.
          </p>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// 1. YouTube Downloader (MP4 / MP3 with conversion)
// ---------------------------------------------------------------------------
export function YouTubeDownloader() {
  return (
    <VideoDownloaderCore
      placeholder="Paste YouTube video link (e.g. https://youtube.com/watch?v=...) to download"
      exampleUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    />
  );
}

// ---------------------------------------------------------------------------
// 2. Universal Video Downloader (Facebook, Instagram, TikTok, Dailymotion...)
// ---------------------------------------------------------------------------
export function UniversalVideoDownloader() {
  return (
    <VideoDownloaderCore
      placeholder="Paste video link (Facebook, Instagram, TikTok, Dailymotion, Vimeo...)"
      exampleUrl="https://www.tiktok.com/@user/video/..."
    />
  );
}

