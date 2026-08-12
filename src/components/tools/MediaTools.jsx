import { useState, useRef } from 'react';

// ===== 1. PDF to Word Converter =====
export function PDFToWord() {
  const [file, setFile] = useState(null);
  const [converting, setConverting] = useState(false);
  const [done, setDone] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (f && f.type === 'application/pdf') {
      setFile(f);
      setDone(false);
    }
  };

  const convert = () => {
    if (!file) return;
    setConverting(true);
    setTimeout(() => {
      setConverting(false);
      setDone(true);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFile} className="hidden" />
      <button onClick={() => fileInputRef.current?.click()} className="btn-primary w-full">
        Choose PDF File
      </button>
      {file && (
        <div className="card p-4 text-center">
          <div className="font-semibold">{file.name}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{(file.size / 1024).toFixed(1)} KB</div>
        </div>
      )}
      {file && !done && (
        <button onClick={convert} disabled={converting} className="btn-secondary w-full">
          {converting ? 'Converting...' : 'Convert to Word'}
        </button>
      )}
      {done && (
        <div className="card text-center p-4 bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700">
          <div className="text-2xl mb-2">OK</div>
          <p className="font-semibold mb-2">Conversion complete!</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Note: Browser me full PDF to Word conversion ke liye server-side processing chahiye.
            Ye demo version hai. Production ke liye API integration karein.
          </p>
          <a href="#" className="btn-primary inline-block">Download .docx</a>
        </div>
      )}
    </div>
  );
}

// ===== 2. Word to PDF Converter =====
export function WordToPDF() {
  const [file, setFile] = useState(null);
  const [converting, setConverting] = useState(false);
  const [done, setDone] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setDone(false);
    }
  };

  const convert = () => {
    if (!file) return;
    setConverting(true);
    setTimeout(() => {
      setConverting(false);
      setDone(true);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <input ref={fileInputRef} type="file" accept=".doc,.docx" onChange={handleFile} className="hidden" />
      <button onClick={() => fileInputRef.current?.click()} className="btn-primary w-full">
        Choose Word File
      </button>
      {file && (
        <div className="card p-4 text-center">
          <div className="font-semibold">{file.name}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{(file.size / 1024).toFixed(1)} KB</div>
        </div>
      )}
      {file && !done && (
        <button onClick={convert} disabled={converting} className="btn-secondary w-full">
          {converting ? 'Converting...' : 'Convert to PDF'}
        </button>
      )}
      {done && (
        <div className="card text-center p-4 bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700">
          <div className="text-2xl mb-2">OK</div>
          <p className="font-semibold mb-2">Conversion complete!</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Note: Browser me full Word to PDF conversion ke liye server-side processing chahiye.
            Ye demo version hai. Production ke liye API integration karein.
          </p>
          <a href="#" className="btn-primary inline-block">Download .pdf</a>
        </div>
      )}
    </div>
  );
}

// ===== 3. Image to PDF Converter =====
export function ImageToPDF() {
  const [images, setImages] = useState([]);
  const [converting, setConverting] = useState(false);
  const [done, setDone] = useState(false);
  const fileInputRef = useRef(null);

  const handleFiles = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setDone(false);
  };

  const convert = () => {
    if (images.length === 0) return;
    setConverting(true);
    setTimeout(() => {
      setConverting(false);
      setDone(true);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleFiles} className="hidden" />
      <button onClick={() => fileInputRef.current?.click()} className="btn-primary w-full">
        Choose Images
      </button>
      {images.length > 0 && (
        <div className="card p-4 text-center">
          <div className="font-semibold">{images.length} images selected</div>
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            {images.slice(0, 5).map((img, i) => (
              <img key={i} src={URL.createObjectURL(img)} alt={img.name} className="w-16 h-16 object-cover rounded-lg" />
            ))}
            {images.length > 5 && <span className="text-sm text-gray-500">+{images.length - 5} more</span>}
          </div>
        </div>
      )}
      {images.length > 0 && !done && (
        <button onClick={convert} disabled={converting} className="btn-secondary w-full">
          {converting ? 'Converting...' : 'Convert to PDF'}
        </button>
      )}
      {done && (
        <div className="card text-center p-4 bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700">
          <div className="text-2xl mb-2">OK</div>
          <p className="font-semibold mb-2">PDF created!</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Note: Browser me full image to PDF conversion ke liye server-side processing chahiye.
            Ye demo version hai.
          </p>
          <a href="#" className="btn-primary inline-block">Download .pdf</a>
        </div>
      )}
    </div>
  );
}

// ===== 4. PDF to Image Converter =====
export function PDFToImage() {
  const [file, setFile] = useState(null);
  const [converting, setConverting] = useState(false);
  const [done, setDone] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (f && f.type === 'application/pdf') {
      setFile(f);
      setDone(false);
    }
  };

  const convert = () => {
    if (!file) return;
    setConverting(true);
    setTimeout(() => {
      setConverting(false);
      setDone(true);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFile} className="hidden" />
      <button onClick={() => fileInputRef.current?.click()} className="btn-primary w-full">
        Choose PDF File
      </button>
      {file && (
        <div className="card p-4 text-center">
          <div className="font-semibold">{file.name}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{(file.size / 1024).toFixed(1)} KB</div>
        </div>
      )}
      {file && !done && (
        <button onClick={convert} disabled={converting} className="btn-secondary w-full">
          {converting ? 'Converting...' : 'Convert to Images'}
        </button>
      )}
      {done && (
        <div className="card text-center p-4 bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700">
          <div className="text-2xl mb-2">OK</div>
          <p className="font-semibold mb-2">Conversion complete!</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Note: Browser me full PDF to Image conversion ke liye server-side processing chahiye.
            Ye demo version hai.
          </p>
          <a href="#" className="btn-primary inline-block">Download Images</a>
        </div>
      )}
    </div>
  );
}

// ===== 5. Merge PDF Files =====
export function MergePDF() {
  const [files, setFiles] = useState([]);
  const [merging, setMerging] = useState(false);
  const [done, setDone] = useState(false);
  const fileInputRef = useRef(null);

  const handleFiles = (e) => {
    const pdfs = Array.from(e.target.files).filter(f => f.type === 'application/pdf');
    setFiles(pdfs);
    setDone(false);
  };

  const merge = () => {
    if (files.length < 2) return;
    setMerging(true);
    setTimeout(() => {
      setMerging(false);
      setDone(true);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <input ref={fileInputRef} type="file" accept=".pdf" multiple onChange={handleFiles} className="hidden" />
      <button onClick={() => fileInputRef.current?.click()} className="btn-primary w-full">
        Choose PDF Files
      </button>
      {files.length > 0 && (
        <div className="card p-4">
          <div className="font-semibold mb-2">{files.length} PDF files selected:</div>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {files.map((f, i) => (
              <div key={i} className="text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">
                {i + 1}. {f.name}
              </div>
            ))}
          </div>
        </div>
      )}
      {files.length >= 2 && !done && (
        <button onClick={merge} disabled={merging} className="btn-secondary w-full">
          {merging ? 'Merging...' : 'Merge PDFs'}
        </button>
      )}
      {files.length < 2 && files.length > 0 && (
        <p className="text-amber-500 text-sm">Kam se kam 2 PDF files chahiye.</p>
      )}
      {done && (
        <div className="card text-center p-4 bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700">
          <div className="text-2xl mb-2">OK</div>
          <p className="font-semibold mb-2">PDFs merged!</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Note: Browser me full PDF merging ke liye server-side processing chahiye.
            Ye demo version hai.
          </p>
          <a href="#" className="btn-primary inline-block">Download Merged PDF</a>
        </div>
      )}
    </div>
  );
}

// ===== 6. Compress PDF =====
export function CompressPDF() {
  const [file, setFile] = useState(null);
  const [compressing, setCompressing] = useState(false);
  const [done, setDone] = useState(false);
  const [quality, setQuality] = useState('medium');
  const fileInputRef = useRef(null);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (f && f.type === 'application/pdf') {
      setFile(f);
      setDone(false);
    }
  };

  const compress = () => {
    if (!file) return;
    setCompressing(true);
    setTimeout(() => {
      setCompressing(false);
      setDone(true);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFile} className="hidden" />
      <button onClick={() => fileInputRef.current?.click()} className="btn-primary w-full">
        Choose PDF File
      </button>
      {file && (
        <div className="card p-4 text-center">
          <div className="font-semibold">{file.name}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{(file.size / 1024).toFixed(1)} KB</div>
        </div>
      )}
      {file && (
        <div>
          <label className="block text-sm font-medium mb-2">Compression Level:</label>
          <div className="flex gap-2">
            {[
              { id: 'low', label: 'Low' },
              { id: 'medium', label: 'Medium' },
              { id: 'high', label: 'High' },
            ].map(q => (
              <button
                key={q.id}
                onClick={() => setQuality(q.id)}
                className={`px-4 py-2 rounded-lg font-medium ${quality === q.id ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>
      )}
      {file && !done && (
        <button onClick={compress} disabled={compressing} className="btn-secondary w-full">
          {compressing ? 'Compressing...' : 'Compress PDF'}
        </button>
      )}
      {done && (
        <div className="card text-center p-4 bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700">
          <div className="text-2xl mb-2">OK</div>
          <p className="font-semibold mb-2">Compression complete!</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Note: Browser me full PDF compression ke liye server-side processing chahiye.
            Ye demo version hai.
          </p>
          <a href="#" className="btn-primary inline-block">Download Compressed PDF</a>
        </div>
      )}
    </div>
  );
}

// ===== 7. Audio to MP3 Converter =====
export function AudioToMP3() {
  const [file, setFile] = useState(null);
  const [converting, setConverting] = useState(false);
  const [done, setDone] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (f && f.type.startsWith('audio/')) {
      setFile(f);
      setDone(false);
    }
  };

  const convert = () => {
    if (!file) return;
    setConverting(true);
    setTimeout(() => {
      setConverting(false);
      setDone(true);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <input ref={fileInputRef} type="file" accept="audio/*" onChange={handleFile} className="hidden" />
      <button onClick={() => fileInputRef.current?.click()} className="btn-primary w-full">
        Choose Audio File
      </button>
      {file && (
        <div className="card p-4 text-center">
          <div className="font-semibold">{file.name}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{(file.size / (1024 * 1024)).toFixed(2)} MB</div>
          <audio controls src={URL.createObjectURL(file)} className="w-full mt-2" />
        </div>
      )}
      {file && !done && (
        <button onClick={convert} disabled={converting} className="btn-secondary w-full">
          {converting ? 'Converting...' : 'Convert to MP3'}
        </button>
      )}
      {done && (
        <div className="card text-center p-4 bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700">
          <div className="text-2xl mb-2">OK</div>
          <p className="font-semibold mb-2">Conversion complete!</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Note: Browser me full audio to MP3 conversion ke liye server-side processing chahiye.
            Ye demo version hai.
          </p>
          <a href="#" className="btn-primary inline-block">Download .mp3</a>
        </div>
      )}
    </div>
  );
}

// ===== 8. Video to MP4 Converter =====
export function VideoToMP4() {
  const [file, setFile] = useState(null);
  const [converting, setConverting] = useState(false);
  const [done, setDone] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (f && f.type.startsWith('video/')) {
      setFile(f);
      setDone(false);
    }
  };

  const convert = () => {
    if (!file) return;
    setConverting(true);
    setTimeout(() => {
      setConverting(false);
      setDone(true);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <input ref={fileInputRef} type="file" accept="video/*" onChange={handleFile} className="hidden" />
      <button onClick={() => fileInputRef.current?.click()} className="btn-primary w-full">
        Choose Video File
      </button>
      {file && (
        <div className="card p-4 text-center">
          <div className="font-semibold">{file.name}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{(file.size / (1024 * 1024)).toFixed(2)} MB</div>
          <video controls src={URL.createObjectURL(file)} className="w-full mt-2 max-h-48" />
        </div>
      )}
      {file && !done && (
        <button onClick={convert} disabled={converting} className="btn-secondary w-full">
          {converting ? 'Converting...' : 'Convert to MP4'}
        </button>
      )}
      {done && (
        <div className="card text-center p-4 bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700">
          <div className="text-2xl mb-2">OK</div>
          <p className="font-semibold mb-2">Conversion complete!</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Note: Browser me full video to MP4 conversion ke liye server-side processing chahiye.
            Ye demo version hai.
          </p>
          <a href="#" className="btn-primary inline-block">Download .mp4</a>
        </div>
      )}
    </div>
  );
}