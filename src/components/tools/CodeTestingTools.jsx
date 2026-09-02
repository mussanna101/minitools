import { useState, useRef } from 'react';
import CopyButton from '../common/CopyButton';

export function HTMLPreview() {
  const [html, setHtml] = useState('<h1>Hello</h1>');
  return (
    <div className="space-y-4">
      <textarea className="input-field min-h-[200px] font-mono" value={html} onChange={(e) => setHtml(e.target.value)} />
      <div className="border rounded-lg p-4 bg-white">
        <iframe title="preview" srcDoc={html} className="w-full min-h-[200px] border-0" sandbox="allow-scripts" />
      </div>
    </div>
  );
}

export function CSSTester() {
  const [css, setCss] = useState('.box { background: blue; color: white; padding: 20px; }');
  return (
    <div className="space-y-4">
      <textarea className="input-field min-h-[200px] font-mono" value={css} onChange={(e) => setCss(e.target.value)} />
      <div className="border rounded-lg p-4">
        <style>{css}</style>
        <div className="box">Styled Box</div>
      </div>
      <CopyButton text={css} />
    </div>
  );
}

export function JSPlayground() {
  const [code, setCode] = useState('console.log("Hello World!");');
  const [output, setOutput] = useState('');
  const run = () => {
    const logs = [];
    const orig = console.log;
    console.log = (...a) => logs.push(a.join(' '));
    try { new Function(code)(); setOutput(logs.join('\n')); } catch (e) { setOutput('Error: ' + e.message); }
    console.log = orig;
  };
  return (
    <div className="space-y-4">
      <textarea className="input-field min-h-[200px] font-mono" value={code} onChange={(e) => setCode(e.target.value)} />
      <button onClick={run} className="btn-primary">Run</button>
      <pre className="bg-gray-900 text-green-400 p-4 rounded min-h-[100px]">{output}</pre>
    </div>
  );
}

export function HTMLToJSX() {
  const [html, setHtml] = useState('<div class="container">\n  <h1>Hello World</h1>\n  <p class="text-lead">Welcome to React!</p>\n</div>');
  const [jsx, setJsx] = useState('');

  const convert = () => {
    let r = html
      .replace(/\bclass=/g, 'className=')
      .replace(/\bfor=/g, 'htmlFor=')
      .replace(/\bonclick=/g, 'onClick=')
      .replace(/\bonchange=/g, 'onChange=')
      .replace(/\bonsubmit=/g, 'onSubmit=')
      .replace(/\bonload=/g, 'onLoad=')
      .replace(/\bonfocus=/g, 'onFocus=')
      .replace(/\bonblur=/g, 'onBlur=')
      .replace(/\bonkeydown=/g, 'onKeyDown=')
      .replace(/\bonkeyup=/g, 'onKeyUp=')
      .replace(/\bonmouseover=/g, 'onMouseOver=')
      .replace(/\bonmouseout=/g, 'onMouseOut=')
      .replace(/<img([^>]*)\/?>/g, '<img$1 />')
      .replace(/<input([^>]*)\/?>/g, '<input$1 />')
      .replace(/<br([^>]*)\/?>/g, '<br$1 />')
      .replace(/<hr([^>]*)\/?>/g, '<hr$1 />')
      .replace(/\btabindex=/g, 'tabIndex=')
      .replace(/\bmaxlength=/g, 'maxLength=')
      .replace(/\breadonly/g, 'readOnly')
      .replace(/\bautofocus/g, 'autoFocus')
      .replace(/\bautocomplete=/g, 'autoComplete=')
      .replace(/\bspellcheck=/g, 'spellCheck=')
      .replace(/\bcontenteditable=/g, 'contentEditable=')
      .replace(/\bsrcdoc=/g, 'srcDoc=')
      .replace(/\bframeborder=/g, 'frameBorder=')
      .replace(/\ballowfullscreen/g, 'allowFullScreen')
      .replace(/\bcellpadding=/g, 'cellPadding=')
      .replace(/\bcellspacing=/g, 'cellSpacing=')
      .replace(/\bcolspan=/g, 'colSpan=')
      .replace(/\browspan=/g, 'rowSpan=')
      .replace(/\bstroke-width=/g, 'strokeWidth=')
      .replace(/\bfill-opacity=/g, 'fillOpacity=')
      .replace(/\bstroke-opacity=/g, 'strokeOpacity=')
      .replace(/\bstroke-linecap=/g, 'strokeLinecap=')
      .replace(/\bstroke-linejoin=/g, 'strokeLinejoin=')
      .replace(/\bstroke-dasharray=/g, 'strokeDasharray=')
      .replace(/\bstroke-dashoffset=/g, 'strokeDashoffset=')
      .replace(/\bclip-path=/g, 'clipPath=')
      .replace(/\bclip-rule=/g, 'clipRule=')
      .replace(/\bfill-rule=/g, 'fillRule=')
      .replace(/\bstop-color=/g, 'stopColor=')
      .replace(/\bstop-opacity=/g, 'stopOpacity=')
      .replace(/\bxlink:href=/g, 'xlinkHref=')
      .replace(/\bxml:space=/g, 'xmlSpace=')
      .replace(/\bxml:lang=/g, 'xmlLang=')
      .replace(/\bxml:base=/g, 'xmlBase=')
      .replace(/style="([^"]*)"/g, (m, s) => {
        const obj = s.split(';').filter(x => x.trim()).map(x => {
          const [p, v] = x.split(':').map(y => y.trim());
          return `${p.replace(/-([a-z])/g, (g) => g[1].toUpperCase())}: '${v}'`;
        }).join(', ');
        return `style={{ ${obj} }}`;
      });
    setJsx(r);
  };

  return (
    <div className="space-y-4">
      <textarea className="input-field min-h-[200px] font-mono" value={html} onChange={(e) => setHtml(e.target.value)} />
      <button onClick={convert} className="btn-primary">Convert to JSX</button>
      <textarea className="input-field min-h-[200px] font-mono" value={jsx} readOnly placeholder="JSX output..." />
      <CopyButton text={jsx} />
    </div>
  );
}

export function CSSToSCSS() {
  const [css, setCss] = useState('.container {\n  display: flex;\n  padding: 20px;\n}\n\n.container .title {\n  font-size: 24px;\n}');
  const [scss, setScss] = useState('');

  const convert = () => {
    const lines = css.split('\n');
    const result = [];
    const stack = [];
    lines.forEach(line => {
      const t = line.trim();
      if (!t) return;
      if (t.includes('}')) { stack.pop(); return; }
      if (t.includes('{')) {
        const sel = t.replace('{', '').trim();
        const parent = stack[stack.length - 1];
        result.push('  '.repeat(stack.length) + (parent ? sel.replace(parent + ' ', '') : sel));
        stack.push(sel);
      } else {
        result.push('  '.repeat(stack.length) + t);
      }
    });
    setScss(result.join('\n'));
  };

  return (
    <div className="space-y-4">
      <textarea className="input-field min-h-[200px] font-mono" value={css} onChange={(e) => setCss(e.target.value)} />
      <button onClick={convert} className="btn-primary">Convert to SCSS</button>
      <textarea className="input-field min-h-[200px] font-mono" value={scss} readOnly placeholder="SCSS output..." />
      <CopyButton text={scss} />
    </div>
  );
}

export function JSONToYAML() {
  const [json, setJson] = useState('{"name": "John", "age": 30, "hobbies": ["reading", "coding"]}');
  const [yaml, setYaml] = useState('');

  const convert = () => {
    try {
      const data = JSON.parse(json);
      const toYaml = (obj, indent = 0) => {
        const pad = '  '.repeat(indent);
        let r = '';
        for (const [k, v] of Object.entries(obj)) {
          if (v === null) r += `${pad}${k}: null\n`;
          else if (typeof v === 'object' && !Array.isArray(v)) r += `${pad}${k}:\n${toYaml(v, indent + 1)}`;
          else if (Array.isArray(v)) {
            r += `${pad}${k}:\n`;
            v.forEach(i => { if (typeof i === 'object') r += `${pad}  - \n${toYaml(i, indent + 2)}`; else r += `${pad}  - ${i}\n`; });
          }
          else if (typeof v === 'string') r += `${pad}${k}: "${v}"\n`;
          else r += `${pad}${k}: ${v}\n`;
        }
        return r;
      };
      setYaml(toYaml(data));
    } catch (e) { setYaml('Invalid JSON: ' + e.message); }
  };

  return (
    <div className="space-y-4">
      <textarea className="input-field min-h-[200px] font-mono" value={json} onChange={(e) => setJson(e.target.value)} />
      <button onClick={convert} className="btn-primary">Convert to YAML</button>
      <textarea className="input-field min-h-[200px] font-mono" value={yaml} readOnly placeholder="YAML output..." />
      <CopyButton text={yaml} />
    </div>
  );
}

export function YAMLToJSON() {
  const [yaml, setYaml] = useState('name: "John"\nage: 30\nhobbies:\n  - "reading"\n  - "coding"');
  const [json, setJson] = useState('');

  const convert = () => {
    try {
      const lines = yaml.split('\n');
      const result = {};
      const stack = [{ indent: -1, obj: result }];
      lines.forEach(line => {
        if (!line.trim() || line.trim().startsWith('#')) return;
        const indent = line.match(/^\s*/)[0].length;
        const content = line.trim();
        const isArr = content.startsWith('- ');
        const clean = isArr ? content.slice(2) : content;
        const [key, ...rest] = clean.split(':');
        const val = rest.join(':').trim();
        while (stack.length > 1 && indent <= stack[stack.length - 1].indent) stack.pop();
        const cur = stack[stack.length - 1].obj;
        const pv = (v) => {
          if (v === 'null') return null;
          if (v === 'true') return true;
          if (v === 'false') return false;
          if (!isNaN(v) && v !== '') return Number(v);
          return v.replace(/^"|"$/g, '');
        };
        if (isArr) {
          if (!cur._a) cur._a = [];
          if (val) cur._a.push(pv(val));
          else { const o = {}; cur._a.push(o); stack.push({ indent, obj: o }); }
        } else {
          if (val) cur[key.trim()] = pv(val);
          else { const o = {}; cur[key.trim()] = o; stack.push({ indent, obj: o }); }
        }
      });
      const cleanObj = (o) => {
        if (Array.isArray(o)) return o.map(cleanObj);
        if (o && typeof o === 'object') {
          const { _a, ...rest } = o;
          const c = {};
          for (const [k, v] of Object.entries(rest)) c[k] = cleanObj(v);
          if (_a) return c._a || c;
          return c;
        }
        return o;
      };
      setJson(JSON.stringify(cleanObj(result), null, 2));
    } catch (e) { setJson('Invalid YAML: ' + e.message); }
  };

  return (
    <div className="space-y-4">
      <textarea className="input-field min-h-[200px] font-mono" value={yaml} onChange={(e) => setYaml(e.target.value)} />
      <button onClick={convert} className="btn-primary">Convert to JSON</button>
      <textarea className="input-field min-h-[200px] font-mono" value={json} readOnly placeholder="JSON output..." />
      <CopyButton text={json} />
    </div>
  );
}

export function BackgroundRemover() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [processedUrl, setProcessedUrl] = useState('');
  const [processing, setProcessing] = useState(false);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [tolerance, setTolerance] = useState(30);
  const fileInputRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(file);
      setPreview(reader.result);
      setProcessedUrl('');
    };
    reader.readAsDataURL(file);
  };

  const hexToRgb = (hex) => {
    const clean = hex.replace('#', '');
    const num = parseInt(clean, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  };

  const removeBg = () => {
    if (!preview) return;
    setProcessing(true);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      const target = hexToRgb(bgColor);
      const tol = Number(tolerance);

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const diff = Math.sqrt(
          (r - target.r) ** 2 +
          (g - target.g) ** 2 +
          (b - target.b) ** 2
        );

        if (diff <= tol * 2.5) {
          data[i + 3] = 0; // Set alpha totransparent
        }
      }

      ctx.putImageData(imgData, 0, 0);
      canvas.toBlob((blob) => {
        if (processedUrl) URL.revokeObjectURL(processedUrl);
        const url = URL.createObjectURL(blob);
        setProcessedUrl(url);
        setProcessing(false);
      }, 'image/png');
    };
    img.src = preview;
  };

  const downloadImage = () => {
    if (!processedUrl) return;
    const a = document.createElement('a');
    a.href = processedUrl;
    a.download = (image?.name.replace(/\.[^.]+$/, '') || 'image') + '-no-bg.png';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="space-y-4">
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      <button onClick={() => fileInputRef.current?.click()} className="btn-primary w-full">Choose Image</button>

      {preview && (
        <div className="space-y-4">
          <div className="card p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Background Color to Remove:</label>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-10 h-10 rounded border cursor-pointer"
                />
              </div>
              <div className="flex items-center gap-2 flex-1 max-w-xs">
                <label className="text-sm font-medium">Tolerance ({tolerance}%):</label>
                <input
                  type="range"
                  min="5"
                  max="80"
                  value={tolerance}
                  onChange={(e) => setTolerance(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
            <button onClick={removeBg} disabled={processing} className="btn-secondary w-full">
              {processing ? 'Processing...' : 'Remove Background Color'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center">
              <label className="block text-sm font-medium mb-2">Original</label>
              <img src={preview} alt="Original" className="max-h-64 mx-auto rounded-lg border object-contain" />
            </div>
            <div className="text-center">
              <label className="block text-sm font-medium mb-2">Processed (Transparent PNG)</label>
              <div className="max-h-64 mx-auto rounded-lg border bg-[repeating-conic-gradient(#ccc_0%_25%,#fff_0%_50%)] bg-[length:20px_20px] flex items-center justify-center min-h-[200px] p-2">
                {processedUrl ? (
                  <img src={processedUrl} alt="Processed" className="max-h-60 object-contain" />
                ) : (
                  <span className="text-gray-400 text-sm">Click "Remove Background Color" to process</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {processedUrl && (
        <div className="card text-center p-4 bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700">
          <p className="font-semibold mb-3 text-green-800 dark:text-green-200">✅ Background Removed Successfully!</p>
          <button onClick={downloadImage} className="btn-primary inline-block">
            ⬇ Download Transparent PNG
          </button>
        </div>
      )}
    </div>
  );
}
