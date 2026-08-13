import { useState } from 'react';
import { BACKEND_URL } from '../../config';

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

// ---------------------------------------------------------------------------
// Reusable Video Downloader core (used by both tools)
// ---------------------------------------------------------------------------
function VideoDownloaderCore({ placeholder, exampleUrl }) {
  const [url, setUrl] = useState('');
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(''); // '' | 'video' | 'mp3' | 'mp4'
  const [error, setError] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');

  const fetchInfo = async () => {
    setError('');
    setInfo(null);
    if (!url.trim()) {
      setError('Pehle video ka URL paste karein.');
      return;
    }
    setLoading(true);
    try {
      const resp = await fetch(`${BACKEND_URL}/api/info`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await resp.json();
      if (!resp.ok) {
        throw new Error(data.error || 'Info fetch nahi ho saki.');
      }
      setInfo(data);
      setSelectedFormat(data.formats?.video?.[0]?.format_id || '');
    } catch (e) {
      setError(
        e.message ||
          'Backend se connect nahi ho paya. Check karein ke server chal raha hai (npm start in /server).'
      );
    }
    setLoading(false);
  };
  // Generic blob download (direct video file OR converted mp3/mp4).
  const runDownload = async (endpoint, payload, extLabel) => {
    setDownloading(endpoint);
    setError('');
    try {
      const resp = await fetch(`${BACKEND_URL}${endpoint}`, {
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
      setError(e.message || 'Download nakaam raha. Dobara try karein.');
    }
    setDownloading('');
  };

  const handleDownload = () => {
    if (!url.trim()) return;
    if (selectedFormat) {
      runDownload('/api/download', { url: url.trim(), formatId: selectedFormat, type: 'video' }, 'mp4');
    } else {
      // No specific format: let backend pick best.
      runDownload('/api/download', { url: url.trim(), type: 'video' }, 'mp4');
    }
  };

  const handleConvert = (to) => {
    if (!url.trim()) return;
    runDownload('/api/convert', { url: url.trim(), to }, to);
  };

  const videoFormats = info?.formats?.video || [];


  return (
    <div className="space-y-4">
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
        {loading ? 'Video analyse ho raha hai...' : '🔍 Get Video'}
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {!info && !loading && !error && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Backend URL:{' '}
          <code className="text-gray-700 dark:text-gray-200">{BACKEND_URL}</code>
        </p>
      )}

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
            💡 MP4/MP3 conversion us backend par ffmpeg se hota hai. Bas apne
            content ya public videos hi download karein.
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
      placeholder="Paste YouTube video link (e.g. https://youtube.com/watch?v=...) aur download karein"
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

