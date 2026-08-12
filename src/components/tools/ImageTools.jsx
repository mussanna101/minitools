import { useState, useRef } from 'react';
import CopyButton from '../common/CopyButton';

// ===== 1. Image to Base64 =====
export function ImageToBase64() {
  const [base64, setBase64] = useState('');
  const [preview, setPreview] = useState('');
  const fileInputRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setBase64(reader.result);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
      <button onClick={() => fileInputRef.current?.click()} className="btn-primary w-full">
        📁 Choose Image
      </button>
      {preview && (
        <img src={preview} alt="Preview" className="max-h-40 rounded-lg mx-auto" />
      )}
      {base64 && (
        <div className="flex items-start space-x-2">
          <textarea
            className="input-field min-h-[200px] font-mono text-xs break-all"
            value={base64}
            readOnly
            placeholder="Base64 string appears here..."
          />
          <CopyButton text={base64} />
        </div>
      )}
    </div>
  );
}

// ===== 2. Image Resizer =====
export function ImageResizer() {
  const [image, setImage] = useState(null);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);
  const [result, setResult] = useState('');
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        setImage(img);
        setWidth(img.width);
        setHeight(img.height);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const resize = () => {
    if (!image) return;
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, width, height);
    setResult(canvas.toDataURL('image/png'));
  };

  return (
    <div className="space-y-4">
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      <button onClick={() => fileInputRef.current?.click()} className="btn-primary w-full">
        📁 Upload Image
      </button>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Width (px)</label>
          <input type="number" value={width} onChange={(e) => setWidth(parseInt(e.target.value) || 0)} className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Height (px)</label>
          <input type="number" value={height} onChange={(e) => setHeight(parseInt(e.target.value) || 0)} className="input-field" />
        </div>
      </div>
      {image && <button onClick={resize} className="btn-secondary w-full">✂️ Resize Image</button>}
      {result && (
        <div className="space-y-2">
          <img src={result} alt="Resized" className="max-h-64 rounded-lg mx-auto border border-gray-300 dark:border-gray-600" />
          <a href={result} download="resized-image.png" className="btn-primary w-full text-center block">💾 Download</a>
        </div>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}

// ===== 3. Image Compressor =====
export function ImageCompressor() {
  const [image, setImage] = useState(null);
  const [quality, setQuality] = useState(0.7);
  const [result, setResult] = useState('');
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const fileInputRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setOriginalSize(file.size);
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => setImage(img);
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const compress = () => {
    if (!image) return;
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg', quality);
    setResult(dataUrl);
    setCompressedSize(Math.round((dataUrl.length - 'data:image/jpeg;base64,'.length) * 3 / 4));
  };

  const formatSize = (bytes) => {
    if (!bytes) return '0 B';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-4">
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      <button onClick={() => fileInputRef.current?.click()} className="btn-primary w-full">
        📁 Upload Image
      </button>
      <div>
        <label className="block text-sm font-medium mb-1">Quality: {Math.round(quality * 100)}%</label>
        <input type="range" min="0.1" max="1" step="0.05" value={quality} onChange={(e) => setQuality(parseFloat(e.target.value))} className="w-full" />
      </div>
      {image && <button onClick={compress} className="btn-secondary w-full">🗜️ Compress Image</button>}
      {originalSize > 0 && (
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="card p-4">
            <div className="text-2xl font-bold text-red-500">{formatSize(originalSize)}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Original</div>
          </div>
          <div className="card p-4">
            <div className="text-2xl font-bold text-green-500">{formatSize(compressedSize)}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Compressed</div>
            {compressedSize > 0 && (
              <div className="text-xs text-primary-600 dark:text-primary-400">
                {Math.round((1 - compressedSize / originalSize) * 100)}% smaller
              </div>
            )}
          </div>
        </div>
      )}
      {result && (
        <div className="space-y-2">
          <img src={result} alt="Compressed" className="max-h-64 rounded-lg mx-auto border border-gray-300 dark:border-gray-600" />
          <a href={result} download="compressed-image.jpg" className="btn-primary w-full text-center block">💾 Download</a>
        </div>
      )}
    </div>
  );
}

// ===== 4. Color Picker =====
export function ColorPicker() {
  const [color, setColor] = useState('#3b82f6');
  const [name, setName] = useState('');

  const presetColors = [
    '#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3',
    '#ff1493', '#00ffff', '#ffd700', '#ff6347', '#7cfc00', '#00ced1', '#8b4513',
    '#2f4f4f', '#d2691e', '#ffc0cb', '#48d1cc', '#f0e68c', '#b0e0e6',
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-20 h-12 rounded-lg cursor-pointer border border-gray-300 dark:border-gray-600" />
        <input className="input-field font-mono" value={color} onChange={(e) => setColor(e.target.value)} />
      </div>
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
        {presetColors.map((preset) => (
          <button
            key={preset}
            onClick={() => setColor(preset)}
            className="w-10 h-10 rounded-lg transition-transform hover:scale-110"
            style={{ backgroundColor: preset }}
            aria-label={`Select ${preset}`}
          />
        ))}
      </div>
      <div className="card p-6 text-center" style={{ backgroundColor: color }}>
        <p className="font-mono font-bold text-white mix-blend-difference text-2xl">{color}</p>
        <div className="flex justify-center gap-4 mt-4">
          <CopyButton text={color} />
          <button
            onClick={() => {
              const r = parseInt(color.slice(1, 3), 16);
              const g = parseInt(color.slice(3, 5), 16);
              const b = parseInt(color.slice(5, 7), 16);
              setName(`rgb(${r}, ${g}, ${b})`);
            }}
            className="btn-secondary text-sm"
          >
            🎨 RGB
          </button>
        </div>
      </div>
      {name && <CopyButton text={name} className="w-full" />}
      <div className="grid grid-cols-3 gap-3 text-center text-sm">
        {['HEX', 'RGB', 'HSL'].map((format) => {
          const r = parseInt(color.slice(1, 3), 16);
          const g = parseInt(color.slice(3, 5), 16);
          const b = parseInt(color.slice(5, 7), 16);
          const hsl = (() => {
            const rn = r / 255, gn = g / 255, bn = b / 255;
            const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
            let h = 0, s = 0, l = (max + min) / 2;
            if (max !== min) {
              const d = max - min;
              s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
              if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
              else if (max === gn) h = ((bn - rn) / d + 2) / 6;
              else h = ((rn - gn) / d + 4) / 6;
            }
            return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
          })();
          const value = format === 'HEX' ? color : format === 'RGB' ? `rgb(${r}, ${g}, ${b})` : hsl;
          return (
            <div key={format} className="card p-2">
              <div className="font-mono text-xs break-all">{value}</div>
              <CopyButton text={value} className="mt-1 w-full !text-xs !py-1" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ===== 5. Color Converter =====
export function ColorConverter() {
  const [hex, setHex] = useState('#3b82f6');
  const [rgb, setRgb] = useState('rgb(59, 130, 246)');
  const [hsl, setHsl] = useState('hsl(217, 91%, 60%)');
  const [error, setError] = useState('');

  const hexToRgb = (h) => {
    const clean = h.replace('#', '');
    if (!/^[0-9a-fA-F]{6}$/.test(clean)) return null;
    return {
      r: parseInt(clean.slice(0, 2), 16),
      g: parseInt(clean.slice(2, 4), 16),
      b: parseInt(clean.slice(4, 6), 16),
    };
  };

  const rgbToHsl = (r, g, b) => {
    const rn = r / 255, gn = g / 255, bn = b / 255;
    const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
      else if (max === gn) h = ((bn - rn) / d + 2) / 6;
      else h = ((rn - gn) / d + 4) / 6;
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  const updateFromHex = (value) => {
    setHex(value);
    setError('');
    const rgbVal = hexToRgb(value);
    if (!rgbVal) {
      setError('Invalid HEX color');
      return;
    }
    setRgb(`rgb(${rgbVal.r}, ${rgbVal.g}, ${rgbVal.b})`);
    setHsl(rgbToHsl(rgbVal.r, rgbVal.g, rgbVal.b));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">HEX</label>
        <div className="flex gap-2">
          <input className="input-field font-mono" value={hex} onChange={(e) => updateFromHex(e.target.value)} placeholder="#3b82f6" />
          <CopyButton text={hex} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">RGB</label>
        <div className="flex gap-2">
          <input className="input-field font-mono" value={rgb} onChange={(e) => setRgb(e.target.value)} />
          <CopyButton text={rgb} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">HSL</label>
        <div className="flex gap-2">
          <input className="input-field font-mono" value={hsl} onChange={(e) => setHsl(e.target.value)} />
          <CopyButton text={hsl} />
        </div>
      </div>
      <div className="h-24 rounded-xl border border-gray-300 dark:border-gray-600" style={{ backgroundColor: /^#[0-9a-fA-F]{6}$/.test(hex) ? hex : '#cccccc' }} />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}