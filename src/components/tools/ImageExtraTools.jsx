import { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';

function downloadDataUrl(dataUrl, filename) {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

function toDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function imageFromUrl(src, cb) {
  const img = new Image();
  img.onload = () => cb(img);
  img.onerror = () => cb(null);
  img.crossOrigin = 'Anonymous';
  img.src = src;
}

// ---------- Image Format Converter (powers PNG↔JPG) ----------
const FORMATS = [
  { value: 'image/png', label: 'PNG', ext: 'png' },
  { value: 'image/jpeg', label: 'JPG', ext: 'jpg' },
  { value: 'image/webp', label: 'WebP', ext: 'webp' },
];

export function ImageFormatConverter() {
  const [file, setFile] = useState(null);
  const [outMime, setOutMime] = useState('image/jpeg');
  const [preview, setPreview] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const convert = async () => {
    if (!file) return;
    setBusy(true); setError(''); setPreview(null);
    try {
      const url = await toDataURL(file);
      imageFromUrl(url, (img) => {
        if (!img) { setError('Image load fail.'); setBusy(false); return; }
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        // fill white for JPEG transparency
        if (outMime === 'image/jpeg') {
          ctx.fillStyle = '#fff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          const dl = URL.createObjectURL(blob);
          setPreview(dl);
          downloadBlob(blob, `converted.${FORMATS.find((f) => f.value === outMime)?.ext || 'img'}`);
          setBusy(false);
        }, outMime, 0.92);
      });
    } catch (e) {
      setError('Convert fail: ' + (e?.message || e));
      setBusy(false);
    }
  };

  const inputRef = useRef(null);
  return (
    <div className="space-y-4">
      <input ref={inputRef} type="file" accept="image/*" onChange={(e) => { const f = e.target.files[0]; f && setFile(f); setPreview(null); setError(''); }} className="hidden" />
      <button onClick={() => inputRef.current?.click()} className="btn-primary w-full">{file ? 'Change Image' : 'Choose Image'}</button>
      {file && (
        <div className="card p-3 text-center text-sm break-all">{file.name} · {(file.size / 1024).toFixed(1)} KB</div>
      )}
      {file && (
        <div className="flex gap-2 items-center">
          <label className="text-sm">Output format:</label>
          <select value={outMime} onChange={(e) => setOutMime(e.target.value)} className="input-field">
            {FORMATS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>
        </div>
      )}
      {file && (
        <button onClick={convert} disabled={busy} className="btn-secondary w-full">{busy ? 'Converting...' : 'Convert & Download'}</button>
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {preview && <img src={preview} alt="preview" className="rounded-lg border max-h-64 object-contain mx-auto" />}
    </div>
  );
}

// ---------- Base64 to Image ----------
export function Base64ToImage() {
  const [b64, setB64] = useState('');
  const [mime, setMime] = useState('image/png');
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');

  const buildDataUrl = () => {
    let value = b64.trim();
    if (!value) return '';
    if (value.startsWith('data:')) return value;
    return `data:${mime};base64,${value}`;
  };

  const run = () => {
    const url = buildDataUrl();
    if (!url || (url.length < 20)) { setError('Please enter a Base64 string.'); return; }
    setPreview(url); setError('');
  };

  const download = () => {
    const url = buildDataUrl();
    if (!url) return;
    const ext = mime.replace('image/', '');
    // real download via fetch → blob
    fetch(url).then((r) => r.blob()).then((b) => downloadBlob(b, `decoded.${ext}`));
  };

  return (
    <div className="space-y-4">
      <textarea
        value={b64}
        onChange={(e) => setB64(e.target.value)}
        placeholder="Paste base64 string here..."
        className="input-field w-full h-32 font-mono text-xs"
      />
      <div className="flex gap-2 items-center">
        <label className="text-sm">Image type:</label>
        <select value={mime} onChange={(e) => setMime(e.target.value)} className="input-field">
          <option value="image/png">PNG</option>
          <option value="image/jpeg">JPEG</option>
          <option value="image/webp">WebP</option>
        </select>
      </div>
      <button onClick={run} className="btn-primary w-full">Decode Image</button>
      {preview && (
        <div className="space-y-2">
          <img src={preview} alt="decoded" className="rounded-lg border max-h-64 object-contain mx-auto" />
          <button onClick={download} className="btn-secondary w-full">Download as file</button>
        </div>
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
// ---------- Gradient Generator ----------
export function GradientGenerator() {
  const [type, setType] = useState('linear');
  const [angle, setAngle] = useState(45);
  const [stops, setStops] = useState([
    { color: '#06b6d4', pos: 0 },
    { color: '#2563eb', pos: 50 },
    { color: '#7c3aed', pos: 100 },
  ]);

  const addStop = () => setStops([...stops, { color: '#000', pos: 100 }]);
  const updateStop = (i, field, value) => {
    const s = [...stops];
    s[i] = { ...s[i], [field]: field === 'pos' ? Number(value) : value };
    setStops(s);
  };
  const removeStop = (i) => setStops(stops.filter((_, j) => j !== i));

  const ordered = [...stops].sort((a, b) => a.pos - b.pos);
  const css =
    type === 'linear'
      ? `linear-gradient(${angle}deg, ${ordered.map((s) => `${s.color} ${s.pos}%`).join(', ')})`
      : `radial-gradient(circle, ${ordered.map((s) => `${s.color} ${s.pos}%`).join(', ')})`;

  const exportPng = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 360;
    const ctx = canvas.getContext('2d');
    const grad = type === 'linear'
      ? ctx.createLinearGradient(0, 0, 640, 360)
      : ctx.createRadialGradient(320, 180, 0, 320, 180, 320);
    ordered.forEach((s) => grad.addColorStop(s.pos / 100, s.color));
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 640, 360);
    canvas.toBlob((b) => downloadBlob(b, 'gradient.png'), 'image/png');
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center flex-wrap">
        <label className="text-sm">Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)} className="input-field">
          <option value="linear">Linear</option>
          <option value="radial">Radial</option>
        </select>
        {type === 'linear' && (
          <>
            <label className="text-sm">Angle: {angle}°</label>
            <input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(Number(e.target.value))} />
          </>
        )}
      </div>
      <div className="space-y-2">
        {stops.map((s, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input type="color" value={s.color} onChange={(e) => updateStop(i, 'color', e.target.value)} />
            <input type="range" min="0" max="100" value={s.pos} onChange={(e) => updateStop(i, 'pos', e.target.value)} />
            <span className="text-xs w-10">{s.pos}%</span>
            {stops.length > 2 && <button onClick={() => removeStop(i)} className="text-red-500 text-xs">✕</button>}
          </div>
        ))}
        <button onClick={addStop} className="btn-secondary text-sm">Add Stop</button>
      </div>
      <div style={{ background: css }} className="rounded-lg h-40 w-full border flex items-center justify-center text-white font-bold">
        Gradient Preview
      </div>
      <textarea readOnly value={css} className="input-field w-full font-mono text-xs h-20" />
      <div className="flex gap-2">
        <button onClick={() => navigator.clipboard.writeText(css)} className="btn-secondary flex-1">Copy CSS</button>
        <button onClick={exportPng} className="btn-primary flex-1">Download PNG</button>
      </div>
    </div>
  );
}
// ---------- Image to Text (OCR) via tesseract.js ----------
export function ImageToText() {
  const [file, setFile] = useState(null);
  const [lang, setLang] = useState('eng');
  const [text, setText] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const runOcr = async () => {
    if (!file) return;
    setBusy(true); setError(''); setStatus(''); setText('');
    let worker;
    try {
      const { createWorker } = Tesseract;
      worker = createWorker({
        logger: (m) => setStatus(m?.status ? `${m.status} ${m.progress ? Math.round(m.progress * 100) + '%' : ''}` : ''),
      });
      await worker.load();
      await worker.loadLanguage(lang);
      await worker.initialize(lang);
      const { data } = await worker.recognize(file);
      setText(data?.text || '(no text detected)');
      setStatus('Done ✅');
    } catch (e) {
      setError('OCR fail: ' + (e?.message || e));
    } finally {
      try { if (worker) await worker.terminate(); } catch (e) {}
      setBusy(false);
    }
  };

  const downloadTxt = () => downloadBlob(new Blob([text], { type: 'text/plain' }), 'ocr-text.txt');
  const inputRef = useRef(null);

  return (
    <div className="space-y-4">
      <input ref={inputRef} type="file" accept="image/*" onChange={(e) => { const f = e.target.files[0]; f && setFile(f); setText(''); setError(''); setStatus(''); }} className="hidden" />
      <button onClick={() => inputRef.current?.click()} className="btn-primary w-full">{file ? 'Change Image' : 'Choose Image'}</button>
      {file && (
        <div className="flex gap-2 items-center">
          <label className="text-sm">Language:</label>
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="input-field">
            <option value="eng">English</option>
            <option value="spa">Spanish</option>
            <option value="fra">French</option>
            <option value="deu">German</option>
            <option value="chi_sim">Chinese (Simplified)</option>
          </select>
        </div>
      )}
      {file && !text && (
        <button onClick={runOcr} disabled={busy} className="btn-secondary w-full">{busy ? 'Scanning...' : 'Extract Text (OCR)'}</button>
      )}
      {status && <p className="text-sm text-gray-600 dark:text-gray-400">{status}</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {text && (
        <div className="space-y-2">
          <textarea readOnly value={text} className="input-field w-full font-mono text-xs h-40" />
          <button onClick={downloadTxt} className="btn-secondary w-full">Download as TXT</button>
        </div>
      )}
    </div>
  );
}
// __IMG_APPEND_LAST__