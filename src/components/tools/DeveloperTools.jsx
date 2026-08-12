import { useState } from 'react';
import CopyButton from '../common/CopyButton';

// ===== 1. JSON Formatter =====
export function JSONFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (e) {
      setError('Invalid JSON: ' + e.message);
      setOutput('');
    }
  };

  return (
    <div className="space-y-4">
      <textarea className="input-field min-h-[150px] font-mono text-sm" placeholder='{"key": "value"}' value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={format} className="btn-primary w-full">Format JSON</button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {output && (
        <div className="flex items-start space-x-2">
          <textarea className="input-field min-h-[200px] font-mono text-sm" value={output} readOnly />
          <CopyButton text={output} />
        </div>
      )}
    </div>
  );
}

// ===== 2. JSON to CSV =====
export function JSONToCSV() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const convert = () => {
    try {
      const data = JSON.parse(input);
      const arr = Array.isArray(data) ? data : [data];
      if (arr.length === 0) throw new Error('Empty array');
      const headers = Object.keys(arr[0]);
      const rows = arr.map(obj => headers.map(h => {
        const val = obj[h];
        if (val === null || val === undefined) return '';
        if (typeof val === 'object') return JSON.stringify(val).replace(/"/g, '""');
        return String(val).replace(/"/g, '""');
      }).join(','));
      setOutput([headers.join(','), ...rows].join('\n'));
      setError('');
    } catch (e) {
      setError('Invalid JSON: ' + e.message);
      setOutput('');
    }
  };

  return (
    <div className="space-y-4">
      <textarea className="input-field min-h-[150px] font-mono text-sm" placeholder='[{"name": "John", "age": 30}]' value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={convert} className="btn-primary w-full">Convert to CSV</button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {output && (
        <div className="flex items-start space-x-2">
          <textarea className="input-field min-h-[200px] font-mono text-sm" value={output} readOnly />
          <CopyButton text={output} />
        </div>
      )}
    </div>
  );
}

// ===== 3. Base64 Encoder/Decoder =====
export function Base64Encoder() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('encode');

  const result = mode === 'encode' ? btoa(unescape(encodeURIComponent(input))) : decodeURIComponent(escape(atob(input)));

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setMode('encode')} className={`px-4 py-2 rounded-lg font-medium ${mode === 'encode' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}>Encode</button>
        <button onClick={() => setMode('decode')} className={`px-4 py-2 rounded-lg font-medium ${mode === 'decode' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}>Decode</button>
      </div>
      <textarea className="input-field min-h-[150px] font-mono text-sm" placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'} value={input} onChange={(e) => setInput(e.target.value)} />
      <div className="flex items-start space-x-2">
        <textarea className="input-field min-h-[150px] font-mono text-sm" value={result} readOnly placeholder="Result..." />
        <CopyButton text={result} />
      </div>
    </div>
  );
}

// ===== 4. URL Encoder/Decoder =====
export function URLEncoder() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('encode');

  const result = mode === 'encode' ? encodeURIComponent(input) : decodeURIComponent(input);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setMode('encode')} className={`px-4 py-2 rounded-lg font-medium ${mode === 'encode' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}>Encode</button>
        <button onClick={() => setMode('decode')} className={`px-4 py-2 rounded-lg font-medium ${mode === 'decode' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}>Decode</button>
      </div>
      <textarea className="input-field min-h-[150px] font-mono text-sm" placeholder={mode === 'encode' ? 'Enter URL to encode...' : 'Enter encoded URL to decode...'} value={input} onChange={(e) => setInput(e.target.value)} />
      <div className="flex items-start space-x-2">
        <textarea className="input-field min-h-[150px] font-mono text-sm" value={result} readOnly placeholder="Result..." />
        <CopyButton text={result} />
      </div>
    </div>
  );
}

// ===== 5. HTML Minifier =====
export function HTMLMinifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const minify = () => {
    let result = input
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/>\s+</g, '><')
      .replace(/\s{2,}/g, ' ')
      .trim();
    setOutput(result);
  };

  return (
    <div className="space-y-4">
      <textarea className="input-field min-h-[150px] font-mono text-sm" placeholder="Paste HTML code..." value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={minify} className="btn-primary w-full">Minify HTML</button>
      {output && (
        <div className="flex items-start space-x-2">
          <textarea className="input-field min-h-[150px] font-mono text-sm" value={output} readOnly />
          <CopyButton text={output} />
        </div>
      )}
    </div>
  );
}

// ===== 6. CSS Minifier =====
export function CSSMinifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const minify = () => {
    let result = input
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*([{}:;,>])\s*/g, '$1')
      .replace(/;}/g, '}')
      .trim();
    setOutput(result);
  };

  return (
    <div className="space-y-4">
      <textarea className="input-field min-h-[150px] font-mono text-sm" placeholder="Paste CSS code..." value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={minify} className="btn-primary w-full">Minify CSS</button>
      {output && (
        <div className="flex items-start space-x-2">
          <textarea className="input-field min-h-[150px] font-mono text-sm" value={output} readOnly />
          <CopyButton text={output} />
        </div>
      )}
    </div>
  );
}

// ===== 7. JS Minifier =====
export function JSMinifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const minify = () => {
    let result = input
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/[^\n]*/g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*([{}:;,()=+\-*/<>!&|?])\s*/g, '$1')
      .trim();
    setOutput(result);
  };

  return (
    <div className="space-y-4">
      <textarea className="input-field min-h-[150px] font-mono text-sm" placeholder="Paste JavaScript code..." value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={minify} className="btn-primary w-full">Minify JS</button>
      {output && (
        <div className="flex items-start space-x-2">
          <textarea className="input-field min-h-[150px] font-mono text-sm" value={output} readOnly />
          <CopyButton text={output} />
        </div>
      )}
    </div>
  );
}

// ===== 8. Regex Tester =====
export function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [text, setText] = useState('');
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');

  const test = () => {
    try {
      const regex = new RegExp(pattern, flags);
      const found = [...text.matchAll(regex)].map(m => ({ match: m[0], index: m.index }));
      setMatches(found);
      setError('');
    } catch (e) {
      setError('Invalid regex: ' + e.message);
      setMatches([]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="input-field font-mono" placeholder="Pattern (e.g. \\d+)" value={pattern} onChange={(e) => setPattern(e.target.value)} />
        <input className="input-field font-mono" placeholder="Flags (e.g. gi)" value={flags} onChange={(e) => setFlags(e.target.value)} />
      </div>
      <textarea className="input-field min-h-[150px] font-mono text-sm" placeholder="Test text..." value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={test} className="btn-primary w-full">Test Regex</button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {matches.length > 0 && (
        <div className="card">
          <div className="font-semibold mb-2">{matches.length} matches found:</div>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {matches.map((m, i) => (
              <div key={i} className="text-sm font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                <span className="text-primary-600 dark:text-primary-400">[{m.index}]</span> {m.match}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ===== 9. Password Generator =====
export function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');

  const generate = () => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    let chars = '';
    if (includeUpper) chars += upper;
    if (includeLower) chars += lower;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;
    if (!chars) return;
    let result = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
    setPassword(result);
  };

  const strength = (() => {
    let score = 0;
    if (length >= 12) score++;
    if (length >= 16) score++;
    if (includeUpper && includeLower) score++;
    if (includeNumbers) score++;
    if (includeSymbols) score++;
    if (score <= 2) return { label: 'Weak', color: 'text-red-500', width: '25%' };
    if (score <= 3) return { label: 'Medium', color: 'text-amber-500', width: '50%' };
    if (score <= 4) return { label: 'Strong', color: 'text-green-500', width: '75%' };
    return { label: 'Very Strong', color: 'text-emerald-500', width: '100%' };
  })();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="font-medium">Length:</label>
        <input type="range" min="4" max="64" value={length} onChange={(e) => setLength(parseInt(e.target.value))} className="flex-1" />
        <span className="font-mono font-bold">{length}</span>
      </div>
      <div className="space-y-2">
        {[
          { label: 'Uppercase (A-Z)', value: includeUpper, set: setIncludeUpper },
          { label: 'Lowercase (a-z)', value: includeLower, set: setIncludeLower },
          { label: 'Numbers (0-9)', value: includeNumbers, set: setIncludeNumbers },
          { label: 'Symbols (!@#$)', value: includeSymbols, set: setIncludeSymbols },
        ].map((opt) => (
          <label key={opt.label} className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={opt.value} onChange={(e) => opt.set(e.target.checked)} className="w-4 h-4" />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
      <button onClick={generate} className="btn-primary w-full">Generate Password</button>
      {password && (
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <input className="input-field font-mono" value={password} readOnly />
            <CopyButton text={password} />
          </div>
          <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div className={`h-full ${strength.color.replace('text-', 'bg-')}`} style={{ width: strength.width }} />
          </div>
          <div className={`text-sm font-medium ${strength.color}`}>Strength: {strength.label}</div>
        </div>
      )}
    </div>
  );
}

// ===== 10. UUID Generator =====
export function UUIDGenerator() {
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState([]);

  const generate = () => {
    const newUuids = Array.from({ length: count }, () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    });
    setUuids(newUuids);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="font-medium">Count:</label>
        <input type="number" min="1" max="100" value={count} onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))} className="input-field w-24" />
      </div>
      <button onClick={generate} className="btn-primary w-full">Generate UUIDs</button>
      {uuids.length > 0 && (
        <div className="space-y-2">
          {uuids.map((uuid, i) => (
            <div key={i} className="flex items-center gap-2">
              <input className="input-field font-mono text-sm" value={uuid} readOnly />
              <CopyButton text={uuid} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ===== 11. Hash Generator =====
export function HashGenerator() {
  const [input, setInput] = useState('');
  const [algorithm, setAlgorithm] = useState('SHA-256');
  const [result, setResult] = useState('');

  const handleGenerate = async () => {
    if (!input) return '';
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    setResult(hashArray.map(b => b.toString(16).padStart(2, '0')).join(''));
  };

  return (
    <div className="space-y-4">
      <textarea className="input-field min-h-[100px] font-mono text-sm" placeholder="Enter text to hash..." value={input} onChange={(e) => setInput(e.target.value)} />
      <div className="flex gap-2">
        <select className="input-field" value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
          <option value="SHA-256">SHA-256</option>
          <option value="SHA-1">SHA-1</option>
          <option value="SHA-384">SHA-384</option>
          <option value="SHA-512">SHA-512</option>
        </select>
        <button onClick={handleGenerate} className="btn-primary">Generate Hash</button>
      </div>
      {result && (
        <div className="flex items-start space-x-2">
          <textarea className="input-field min-h-[100px] font-mono text-sm break-all" value={result} readOnly />
          <CopyButton text={result} />
        </div>
      )}
    </div>
  );
}

// ===== 12. QR Code Generator =====
export function QRGenerator() {
  const [text, setText] = useState('');
  const [size, setSize] = useState(200);
  const [qrUrl, setQrUrl] = useState('');

  const generate = () => {
    if (!text) return;
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`);
  };

  return (
    <div className="space-y-4">
      <textarea className="input-field min-h-[100px]" placeholder="Enter text or URL for QR code..." value={text} onChange={(e) => setText(e.target.value)} />
      <div className="flex items-center gap-4">
        <label className="font-medium">Size:</label>
        <input type="range" min="100" max="500" step="50" value={size} onChange={(e) => setSize(parseInt(e.target.value))} className="flex-1" />
        <span className="font-mono">{size}px</span>
      </div>
      <button onClick={generate} className="btn-primary w-full">Generate QR Code</button>
      {qrUrl && (
        <div className="text-center space-y-2">
          <img src={qrUrl} alt="QR Code" className="mx-auto border border-gray-300 dark:border-gray-600 rounded-lg" />
          <a href={qrUrl} download="qrcode.png" className="btn-secondary inline-block">Download QR</a>
        </div>
      )}
    </div>
  );
}