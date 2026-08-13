import { useState, useRef, useEffect } from 'react';
import { marked } from 'marked';

// ---- Roman Numerals ----
const R_MAP = [
  ['M', 1000], ['CM', 900], ['D', 500], ['CD', 400],
  ['C', 100], ['XC', 90], ['L', 50], ['XL', 40],
  ['X', 10], ['IX', 9], ['V', 5], ['IV', 4], ['I', 1],
];
function toRoman(n) {
  let num = Math.floor(Number(n) || 0);
  if (num <= 0 || num > 3999) return '';
  let r = '';
  for (const [letter, v] of R_MAP) while (num >= v) { r += letter; num -= v; }
  return r;
}
function fromRoman(s) {
  const str = String(s).toUpperCase().trim();
  const val = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0, prev = 0;
  for (let i = str.length - 1; i >= 0; i--) {
    const cur = val[str[i]] || 0;
    if (cur === 0) return NaN;
    if (cur < prev) total -= cur; else { total += cur; prev = cur; }
  }
  return total;
}

export function RomanNumeralsConverter() {
  const [num, setNum] = useState('');
  const [roman, setRoman] = useState('');
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <label className="text-sm">Number</label>
        <input type="number" min="1" max="3999" value={num}
          onChange={(e) => { const v = e.target.value; setNum(v); setRoman(v ? toRoman(v) : ''); }}
          className="input-field" placeholder="e.g. 2024" />
        <p className="text-sm text-gray-500 mt-1">Roman: <span className="font-bold">{roman || '—'}</span></p>
      </div>
      <div>
        <label className="text-sm">Roman Numeral</label>
        <input value={roman} onChange={(e) => { const v = e.target.value; setRoman(v); const n = fromRoman(v); setNum(v && !isNaN(n) ? String(n) : ''); }}
          className="input-field font-mono" placeholder="e.g. MMXXIV" />
        <p className="text-sm text-gray-500 mt-1">Number: <span className="font-bold">{num || '—'}</span></p>
      </div>
    </div>
  );
}

// ---- Number to Words ----
const ONES = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
const TEENS = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
const SCALARS = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];

function numberToWords(n) {
  const num = Math.floor(Number(n) || 0);
  if (num === 0) return 'Zero';
  if (num < 0) return 'Minus ' + numberToWords(-num);
  const three = (n3) => {
    let s = '';
    const h = Math.floor(n3 / 100);
    const rest = n3 % 100;
    if (h) s += ONES[h] + ' Hundred';
    if (rest) {
      if (s) s += ' ';
      if (rest < 10) s += ONES[rest];
      else if (rest < 20) s += TEENS[rest - 10];
      else { s += TENS[Math.floor(rest / 10)] + (rest % 10 ? ' ' + ONES[rest % 10] : ''); }
    }
    return s;
  };
  let out = '';
  let chunk = num;
  let i = 0;
  const parts = [];
  while (chunk > 0) {
    const n3 = chunk % 1000;
    if (n3) parts.push(three(n3) + (SCALARS[i] ? ' ' + SCALARS[i] : ''));
    chunk = Math.floor(chunk / 1000);
    i++;
  }
  return parts.reverse().join(', ');
}

export function NumberToWordsConverter() {
  const [num, setNum] = useState('');
  return (
    <div className="space-y-4">
      <input type="number" value={num} onChange={(e) => setNum(e.target.value)} className="input-field" placeholder="Enter a number (up to trillions)" />
      <div className="card p-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">Result (English)</p>
        <p className="text-xl font-semibold break-words">{num === '' ? '—' : numberToWords(num)}</p>
      </div>
    </div>
  );
}
// ---- Markdown to HTML ----
export function MarkdownToHTMLConverter() {
  const [md, setMd] = useState('# Hello World\n\nType **markdown** on the left and see the rendered HTML on the right.\n\n- Lists\n- Are\n- Supported\n\n```js\nconsole.log("hi");\n```');
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <textarea value={md} onChange={(e) => setMd(e.target.value)} className="input-field font-mono h-52" placeholder="Enter markdown..." />
      <div className="border rounded-lg p-4 overflow-auto bg-white dark:bg-gray-800" dangerouslySetInnerHTML={{ __html: marked.parse(md) }} />
    </div>
  );
}

// ---- Typing Speed Test ----
const SAMPLE = 'The quick brown fox jumps over the lazy dog. Around the world in eighty days, she said, was worth a single moment of glory. Patience is the key to joy, and a gentle answer turns away wrath. The early bird catches the worm, but the second mouse gets the cheese.';

export function TypingSpeedTest() {
  const [input, setInput] = useState('');
  const [done, setDone] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [cpm, setCpm] = useState(0);
  const [started, setStarted] = useState(false);
  const [showSample, setShowSample] = useState(true);
  const inputRef = useRef(null);

  const start = () => { setStarted(true); setDone(false); setInput(''); setElapsed(0); setWpm(0); setCpm(0); setShowSample(false); };
  const reset = () => { setStarted(false); setDone(false); setInput(''); setElapsed(0); setWpm(0); setCpm(0); setShowSample(true); };

  useEffect(() => {
    if (!started) return undefined;
    const t0 = Date.now();
    const id = setInterval(() => setElapsed((Date.now() - t0) / 1000), 10);
    return () => clearInterval(id);
  }, [started]);

  const onType = (e) => {
    if (!started) start();
    setInput(e.target.value);
    const finished = e.target.value.length >= SAMPLE.length;
    if (finished || e.target.value === SAMPLE) {
      setDone(true);
      const correct = e.target.value.split('').filter((c, i) => c === SAMPLE[i]).length;
      const mins = elapsed || 0.1;
      setWpm(Math.round((correct / 5) / (mins / 60)));
      setCpm(Math.round(correct / mins));
    }
  };

  return (
    <div className="space-y-4">
      {!started && (
        <p className="text-sm whitespace-pre-wrap text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg break-words">{SAMPLE}</p>
      )}
      <textarea
        ref={inputRef}
        value={input}
        onChange={onType}
                onPaste={(e) => e.preventDefault()}
        onClick={() => { if (!started) start(); inputRef.current?.focus(); }}
        placeholder="Click to start typing..."
        className="input-field font-mono w-full h-28 resize-y"
        disabled={done}
      />
      <div className="flex gap-2">
        <button onClick={start} className="btn-primary">Start Over</button>
        <button onClick={reset} className="btn-secondary">Reset</button>
      </div>
      {started && (
        <div className="card p-4 grid grid-cols-3 gap-2 text-center">
          <div><span className="text-2xl font-bold">{elapsed.toFixed(1)}</span><span className="text-xs text-gray-500">s</span></div>
          <div><span className="text-2xl font-bold">{wpm}</span><span className="text-xs text-gray-500">WPM</span></div>
          <div><span className="text-2xl font-bold">{cpm}</span><span className="text-xs text-gray-500">CPM</span></div>
        </div>
      )}
      {done && (
        <div className="card text-center p-4 bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700">
          <div className="text-2xl mb-1">🎉</div>
          <p className="font-semibold">Test complete! Your speed: <span className="font-bold">{wpm} WPM</span></p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Accuracy: {Math.round((input.split('').filter((c, i) => c === SAMPLE[i]).length / SAMPLE.length) * 100)}%</p>
        </div>
      )}
    </div>
  );
}
// __TEXT_APPEND_LAST__

