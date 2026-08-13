import { useState, useRef, useEffect } from 'react';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import JSZip from 'jszip';
import lamejs from '@breezystack/lamejs';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

// ---- Shared helpers --------------------------------------------------------
function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

function escXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Build a real, valid .docx (OPC zip) containing the given text paragraphs.
async function buildDocx(text) {
  const paras = String(text)
    .split(/\r?\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  const body = paras
    .map(
      (p) =>
        `<w:p><w:r><w:t xml:space="preserve">${escXml(p)}</w:t></w:r></w:p>`
    )
    .join('');
  const contentTypes =
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
    '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
    '<Default Extension="xml" ContentType="application/xml"/>' +
    '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>' +
    '</Types>';
  const rels =
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
    '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>' +
    '</Relationships>';
  const documentXml =
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">' +
    '<w:body>' +
    body +
    '<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/></w:sectPr>' +
    '</w:body></w:document>';

  const zip = new JSZip();
  zip.file('[Content_Types].xml', contentTypes);
  zip.file('_rels/.rels', rels);
  zip.file('word/document.xml', documentXml);
  return await zip.generateAsync({ type: 'blob' });
}

// Generic "choose file, show it, run async job" UI.
function MediaShell({ file, accept, onPick, onRun, busy, busyLabel, done, error, children }) {
  const inputRef = useRef(null);
  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={(e) => e.target.files.length && onPick(e.target.files[0])}
        className="hidden"
      />
      <button onClick={() => inputRef.current?.click()} className="btn-primary w-full">
        {file ? 'Change File' : 'Choose File'}
      </button>
      {file && (
        <div className="card p-4 text-center">
          <div className="font-semibold break-all">{file.name}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {(file.size / 1024).toFixed(1)} KB
          </div>
        </div>
      )}
      {children}
      {file && !done && (
        <button onClick={onRun} disabled={busy} className="btn-secondary w-full">
          {busy ? busyLabel : 'Convert'}
        </button>
      )}
            {error && <p className="text-red-500 text-sm">{error}</p>}
      {done && (
        <div className="card text-center p-4 bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700">
          <div className="text-2xl mb-2">✅</div>
          <p className="font-semibold">Done! Download start ho gaya.</p>
        </div>
      )}
    </div>
  );
}

// 1. PDF to Word (real: extract text via pdfjs-dist, emit valid .docx zip)
export function PDFToWord() {
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const convert = async () => {
    if (!file) return;
    setBusy(true); setError(''); setDone(false);
    try {
      const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
      let full = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const tc = await page.getTextContent();
        full += tc.items.map((it) => it.str).join(' ') + '\n';
      }
      const blob = await buildDocx(full);
      saveBlob(blob, (file.name.replace(/\.pdf$/i, '') || 'document') + '.docx');
      setDone(true);
    } catch (e) {
      setError('PDF to Word fail: ' + (e?.message || e));
    }
    setBusy(false);
  };

  return (
    <MediaShell
      accept="application/pdf"
      file={file}
      onPick={setFile}
      onRun={convert}
      busy={busy}
      busyLabel="Extracting text..."
      done={done}
      error={error}
    />
  );
}

// 2. Word to PDF (real: parse .docx with JSZip, rebuild searchable PDF via pdf-lib)
export function WordToPDF() {
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const convert = async () => {
    if (!file) return;
    setBusy(true); setError(''); setDone(false);
    try {
      const zip = await JSZip.loadAsync(await file.arrayBuffer());
      let text = '';
      const matches = zip.file(/word\/document\.xml$/);
      const docEntry = Array.isArray(matches) ? matches[0] : matches;
      if (docEntry) {
        const xml = await docEntry.async('string');
        const paras = xml.match(/<w:p\b[^>]*>[\s\S]*?<\/w:p>/g) || [];
        text = paras
          .map((p) =>
            (p.match(/<w:t[^>]*>([\s\S]*?)<\/w:t>/g) || [])
              .map((s) => s.replace(/<[^>]*>/g, ''))
              .join('')
          )
          .join('\n');
      } else {
        text = await file.text();
      }
      const pdf = await PDFDocument.create();
      const page = pdf.addPage([595, 842]); // A4
      const font = await pdf.embedFont(StandardFonts.Helvetica);
      let y = 800;
      text.split('\n').forEach((line) => {
        if (y < 50) return;
        page.drawText(line || ' ', { x: 50, y, size: 11, font });
        y -= 14;
      });
      const out = await pdf.save();
      saveBlob(new Blob([out], { type: 'application/pdf' }), 'output.pdf');
      setDone(true);
    } catch (e) {
      setError('Word to PDF fail: ' + (e?.message || e));
    }
    setBusy(false);
  };

  return (
    <MediaShell
      accept=".doc,.docx,.txt,text/plain"
      file={file}
      onPick={setFile}
      onRun={convert}
      busy={busy}
      busyLabel="Converting Word..."
      done={done}
      error={error}
    />
  );
}

// 3. Image to PDF (real: each image becomes a page via pdf-lib)
export function ImageToPDF() {
  const [files, setFiles] = useState([]);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const ref = useRef(null);

  const pick = (e) => {
    const list = Array.from(e.target.files || []).filter((f) => f.type.startsWith('image/'));
    if (list.length) {
      setFiles(list); setDone(false); setError('');
    }
  };

  const convert = async () => {
    if (!files.length) return;
    setBusy(true); setError(''); setDone(false);
    try {
      const pdf = await PDFDocument.create();
      for (const f of files) {
        const data = await f.arrayBuffer();
        const img = f.type === 'image/png' ? await pdf.embedPng(data) : await pdf.embedJpg(data);
        const page = pdf.addPage([img.width, img.height]);
        page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
      }
      const out = await pdf.save();
      saveBlob(new Blob([out], { type: 'application/pdf' }), 'images.pdf');
      setDone(true);
    } catch (e) {
      setError('Image to PDF fail: ' + (e?.message || e));
    }
    setBusy(false);
  };

  return (
    <div className="space-y-4">
      <input ref={ref} type="file" accept="image/*" multiple onChange={pick} className="hidden" />
      <button onClick={() => ref.current?.click()} className="btn-primary w-full">
        {files.length ? `Change Images (${files.length})` : 'Choose Images'}
      </button>
      {files.map((f) => (
        <div key={f.name} className="card p-3 text-center text-sm break-all">
          {f.name} · {(f.size / 1024).toFixed(1)} KB
        </div>
      ))}
      {files.length > 0 && !done && (
        <button onClick={convert} disabled={busy} className="btn-secondary w-full">
          {busy ? 'Converting...' : 'Convert to PDF'}
        </button>
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
            {done && <p className="text-green-600 font-semibold">✅ Done! Download start ho gaya.</p>}
    </div>
  );
}

// 4. PDF to Image (real: render each page with pdfjs-dist → bundle PNGs in a zip)
export function PDFToImage() {
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const convert = async () => {
    if (!file) return;
    setBusy(true); setError(''); setDone(false);
    try {
      const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
      const zip = new JSZip();
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
        const blob = await new Promise((r) => canvas.toBlob(r, 'image/png'));
        zip.file(`page-${i}.png`, blob);
      }
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      saveBlob(zipBlob, (file.name.replace(/\.pdf$/i, '') || 'pages') + '.zip');
      setDone(true);
    } catch (e) {
      setError('PDF to Image fail: ' + (e?.message || e));
    }
    setBusy(false);
  };

  return (
    <MediaShell
      accept="application/pdf"
      file={file}
      onPick={setFile}
      onRun={convert}
      busy={busy}
      busyLabel="Rendering pages..."
      done={done}
      error={error}
    />
  );
}
// __MEDIA_APPEND_LAST__
// 5. Merge PDF (real: pdf-lib copies pages from every uploaded PDF)
export function MergePDF() {
  const [files, setFiles] = useState([]);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const ref = useRef(null);

  const pick = (e) => {
    const list = Array.from(e.target.files || []).filter((f) => f.type === 'application/pdf');
    if (list.length) { setFiles(list); setDone(false); setError(''); }
  };

  const merge = async () => {
    if (!files.length) return;
    setBusy(true); setError(''); setDone(false);
    try {
      const pdf = await PDFDocument.create();
      for (const f of files) {
        const src = await PDFDocument.load(await f.arrayBuffer());
        const copied = await pdf.copyPages(src, src.getPageIndices());
        copied.forEach((p) => pdf.addPage(p));
      }
      const out = await pdf.save();
      saveBlob(new Blob([out], { type: 'application/pdf' }), 'merged.pdf');
      setDone(true);
    } catch (e) {
      setError('Merge fail: ' + (e?.message || e));
    }
    setBusy(false);
  };

  return (
    <div className="space-y-4">
      <input ref={ref} type="file" accept="application/pdf" multiple onChange={pick} className="hidden" />
      <button onClick={() => ref.current?.click()} className="btn-primary w-full">
        {files.length ? `Change PDFs (${files.length})` : 'Choose PDF Files'}
      </button>
      {files.map((f) => (
        <div key={f.name} className="card p-3 text-center text-sm break-all">
          {f.name} · {(f.size / 1024).toFixed(1)} KB
        </div>
      ))}
      {files.length > 0 && !done && (
        <button onClick={merge} disabled={busy} className="btn-secondary w-full">
          {busy ? 'Merging...' : 'Merge PDF'}
        </button>
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {done && <p className="text-green-600 font-semibold">✅ Merged! Download start ho gaya.</p>}
    </div>
  );
}

// 6. Compress PDF (real: re-pack through pdf-lib with object streams + Flate)
export function CompressPDF() {
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(null);

  const compress = async () => {
    if (!file) return;
    setBusy(true); setError(''); setDone(false); setSaved(null);
    try {
      const src = await PDFDocument.load(await file.arrayBuffer());
      const out = await src.save({ useObjectStreams: true });
      setSaved({ before: file.size, after: out.byteLength });
      saveBlob(new Blob([out], { type: 'application/pdf' }), 'compressed.pdf');
      setDone(true);
    } catch (e) {
      setError('Compress fail: ' + (e?.message || e));
    }
    setBusy(false);
  };

  return (
    <MediaShell
      accept="application/pdf"
      file={file}
      onPick={setFile}
      onRun={compress}
      busy={busy}
      busyLabel="Compressing..."
      done={done}
      error={error}
    >
      {saved && (
        <p className="text-xs text-gray-600 dark:text-gray-400">
          {(saved.before / saved.after).toFixed(2)}x smaller
          ({(saved.before / 1024).toFixed(0)} KB &rarr; {(saved.after / 1024).toFixed(0)} KB)
        </p>
      )}
      {!saved && (
        <p className="text-xs text-gray-600 dark:text-gray-400">
          PDF ko phir se pack kiya jata hai (object streams + Flate compression).
          Heavy/image PDFs mein size kam hota hai; text-based PDFs mein thoda hi.
        </p>
      )}
    </MediaShell>
  );
}

// 7. PDF Split (real: extract page ranges with pdf-lib)
export function PDFSplit() {
  const [file, setFile] = useState(null);
  const [ranges, setRanges] = useState('1');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const parseRanges = (s, max) => {
    const pages = new Set();
    s.split(',').forEach((part) => {
      part = part.trim();
      if (!part) return;
      if (part.includes('-')) {
        const [a, b] = part.split('-').map((n) => parseInt(n, 10));
        let lo = a, hi = b;
        if (a > b) [lo, hi] = [b, a];
        for (let i = lo; i <= (hi || max); i++) if (i >= 1 && i <= max) pages.add(i);
      } else {
        const n = parseInt(part, 10);
        if (n >= 1 && n <= max) pages.add(n);
      }
    });
    return [...pages].sort((x, y) => x - y);
  };

  const split = async () => {
    if (!file) return;
    setBusy(true); setError(''); setDone(false);
    try {
      const src = await PDFDocument.load(await file.arrayBuffer());
      const max = src.getPageIndices().length;
      const pages = parseRanges(ranges, max);
      if (!pages.length) {
        setError('Range invalid ya out of bounds (total pages: ' + max + ')');
        setBusy(false);
        return;
      }
      const out = await PDFDocument.create();
      const copied = await out.copyPages(src, pages.map((p) => p - 1));
      copied.forEach((p) => out.addPage(p));
      saveBlob(new Blob([await out.save()], { type: 'application/pdf' }), 'split.pdf');
      setDone(true);
    } catch (e) {
      setError('Split fail: ' + (e?.message || e));
    }
    setBusy(false);
  };

  return (
    <MediaShell
      accept="application/pdf"
      file={file}
      onPick={(f) => { setFile(f); setRanges('1'); setDone(false); setError(''); }}
      onRun={split}
      busy={busy}
      busyLabel="Splitting..."
      done={done}
      error={error}
    >
      <div>
        <label className="block text-sm font-medium mb-1">Page(s) to extract (e.g. 1-3,5)</label>
        <input
          value={ranges}
          onChange={(e) => setRanges(e.target.value)}
          placeholder="1-3,5"
          className="input-field"
        />
      </div>
    </MediaShell>
  );
}
// __MEDIA_APPEND_LAST__
// 8. Audio to MP3 (real: decode with Web Audio, encode to MP3 with @breezystack/lamejs)
export function AudioToMP3() {
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const downsampleMono = (buffer, outSampleRate) => {
    const ch0 = buffer.getChannelData(0);
    let data = ch0;
    if (buffer.numberOfChannels > 1) {
      const ch1 = buffer.getChannelData(1);
      const mix = new Float32Array(buffer.length);
      for (let i = 0; i < buffer.length; i++) mix[i] = (ch0[i] + ch1[i]) / 2;
      data = mix;
    }
    if (buffer.sampleRate === outSampleRate) return data;
    const ratio = buffer.sampleRate / outSampleRate;
    const outLen = Math.ceil(data.length / ratio);
    const out = new Float32Array(outLen);
    let offset = 0;
    for (let i = 0; i < outLen; i++) {
      const start = offset | 0;
      const fraction = offset - start;
      const a = data[start] || 0;
      const b = (data[start + 1] || 0) - a;
      out[i] = a + b * fraction;
      offset += ratio;
    }
    return out;
  };

  const convert = async () => {
    if (!file) return;
    setBusy(true); setError(''); setDone(false);
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const decoded = await ctx.decodeAudioData(await file.arrayBuffer());
      const samples = downsampleMono(decoded, 44100);
      const enc = new lamejs.Mp3Encoder(1, 44100, 128);
      const blockSize = 1152;
      const out = [];
      for (let i = 0; i < samples.length; i += blockSize) {
        const chunk = samples.subarray(i, i + blockSize);
        const int16 = new Int16Array(chunk.length);
        for (let j = 0; j < chunk.length; j++) {
          let s = Math.max(-1, Math.min(1, chunk[j]));
          int16[j] = s < 0 ? s * 0x8000 : s * 0x7fff;
        }
        const res = enc.encodeBuffer(int16);
        if (res && res.length) out.push(res);
      }
      const tail = enc.flush();
      if (tail && tail.length) out.push(tail);
      const blob = new Blob(out, { type: 'audio/mpeg' });
      saveBlob(blob, (file.name.replace(/\.[^.]+$/, '') || 'audio') + '.mp3');
      setDone(true);
    } catch (e) {
      setError('Audio to MP3 fail: ' + (e?.message || e));
    }
    setBusy(false);
  };

  return (
    <MediaShell
      accept="audio/*"
      file={file}
      onPick={setFile}
      onRun={convert}
      busy={busy}
      busyLabel="Encoding MP3..."
      done={done}
      error={error}
    />
  );
}

// 9. Video to MP4 (real: re-encode via offscreen canvas + MediaRecorder;
//    uses H.264 MP4 where supported, else webm fallback).
export function VideoToMP4() {
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [outExt, setOutExt] = useState('');

  const convert = async () => {
    if (!file) return;
    setBusy(true); setError(''); setDone(false); setOutExt('');
    let video;
    try {
      video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      video.muted = true;
      video.playsInline = true;
      video.crossOrigin = 'anonymous';
      await new Promise((res, rej) => {
        video.addEventListener('loadedmetadata', res);
        video.addEventListener('error', rej);
      });
      await video.play().catch(() => {});

      const w = Math.round(Math.min(video.videoWidth, 960));
      const h = Math.round(Math.min(video.videoHeight, 540) || 1);
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      const stream = canvas.captureStream(15);
      const supported =
        MediaRecorder.isTypeSupported('video/mp4')
          ? 'video/mp4'
          : MediaRecorder.isTypeSupported('video/webm; codecs=vp9')
          ? 'video/webm; codecs=vp9'
          : 'video/webm';
      const rec = new MediaRecorder(stream, { mimeType: supported });
      const chunks = [];
      rec.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };
      rec.start();

      const draw = () => {
        if (video.ended || video.paused) return;
        ctx.drawImage(video, 0, 0, w, h);
        requestAnimationFrame(draw);
      };
      draw();

      await new Promise((res) => {
        video.addEventListener('ended', res);
        setTimeout(res, (video.duration || 0) * 1000 + 2000);
      });
      rec.stop();
      await new Promise((r) => rec.addEventListener('stop', r));
      const blob = new Blob(chunks, { type: supported });
      const ext = supported === 'video/mp4' ? 'mp4' : 'webm';
      setOutExt(ext);
      saveBlob(blob, (file.name.replace(/\.[^.]+$/, '') || 'video') + '.' + ext);
      setDone(true);
    } catch (e) {
      setError('Video convert fail: ' + (e?.message || e));
    } finally {
      setBusy(false);
      if (video) URL.revokeObjectURL(video.src);
    }
  };

  return (
    <MediaShell
      accept="video/*"
      file={file}
      onPick={setFile}
      onRun={convert}
      busy={busy}
      busyLabel="Re-encoding video..."
      done={done}
      error={error}
    >
      {outExt && (
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Output: .{outExt}
          ({outExt === 'mp4' ? 'H.264 MP4' : 'WebM — your browser ne MP4 record nahi support kiya'})
        </p>
      )}
    </MediaShell>
  );
}