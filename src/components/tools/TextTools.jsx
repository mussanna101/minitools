import { useState } from 'react';
import CopyButton from '../common/CopyButton';

// ===== 1. Word Counter =====
export function WordCounter() {
  const [text, setText] = useState('');
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, '').length;
  const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0;
  const paragraphs = text.trim() ? text.split(/\n+/).filter(p => p.trim()).length : 0;

  return (
    <div className="space-y-4">
      <textarea
        className="input-field min-h-[200px]"
        placeholder="Type or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: 'Words', value: words },
          { label: 'Characters', value: chars },
          { label: 'No Spaces', value: charsNoSpace },
          { label: 'Sentences', value: sentences },
          { label: 'Paragraphs', value: paragraphs },
        ].map((item) => (
          <div key={item.label} className="card text-center p-4">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{item.value}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== 2. Character Counter =====
export function CharacterCounter() {
  const [text, setText] = useState('');
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, '').length;
  const letters = text.replace(/[^a-zA-Z]/g, '').length;
  const numbers = text.replace(/[^0-9]/g, '').length;
  const spaces = text.replace(/[^ ]/g, '').length;

  return (
    <div className="space-y-4">
      <textarea
        className="input-field min-h-[200px]"
        placeholder="Type or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: 'Characters', value: chars },
          { label: 'No Spaces', value: charsNoSpace },
          { label: 'Letters', value: letters },
          { label: 'Numbers', value: numbers },
          { label: 'Spaces', value: spaces },
        ].map((item) => (
          <div key={item.label} className="card text-center p-4">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{item.value}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== 3. Case Converter =====
export function CaseConverter() {
  const [text, setText] = useState('');
  const [caseType, setCaseType] = useState('upper');

  const convert = () => {
    switch (caseType) {
      case 'upper': return text.toUpperCase();
      case 'lower': return text.toLowerCase();
      case 'title': return text.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase());
      case 'sentence': return text.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase());
      default: return text;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'upper', label: 'UPPERCASE' },
          { id: 'lower', label: 'lowercase' },
          { id: 'title', label: 'Title Case' },
          { id: 'sentence', label: 'Sentence case' },
        ].map((c) => (
          <button
            key={c.id}
            onClick={() => setCaseType(c.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              caseType === c.id
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
      <textarea
        className="input-field min-h-[150px]"
        placeholder="Enter text to convert..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex items-start space-x-2">
        <textarea
          className="input-field min-h-[150px]"
          value={convert()}
          readOnly
          placeholder="Converted text appears here..."
        />
        <CopyButton text={convert()} />
      </div>
    </div>
  );
}

// ===== 4. Text Reverser =====
export function TextReverser() {
  const [text, setText] = useState('');
  const [mode, setMode] = useState('characters');

  const reverse = () => {
    if (mode === 'characters') return text.split('').reverse().join('');
    if (mode === 'words') return text.split(/\s+/).reverse().join(' ');
    if (mode === 'lines') return text.split('\n').reverse().join('\n');
    return text;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'characters', label: 'Reverse Characters' },
          { id: 'words', label: 'Reverse Words' },
          { id: 'lines', label: 'Reverse Lines' },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              mode === m.id
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
      <textarea
        className="input-field min-h-[150px]"
        placeholder="Enter text to reverse..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex items-start space-x-2">
        <textarea
          className="input-field min-h-[150px]"
          value={reverse()}
          readOnly
          placeholder="Reversed text appears here..."
        />
        <CopyButton text={reverse()} />
      </div>
    </div>
  );
}

// ===== 5. Lorem Ipsum Generator =====
export function LoremIpsum() {
  const [paragraphs, setParagraphs] = useState(3);
  const loremText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

  const generate = () => {
    return Array.from({ length: paragraphs }, () => loremText).join('\n\n');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="font-medium">Paragraphs:</label>
        <input
          type="number"
          min="1"
          max="20"
          value={paragraphs}
          onChange={(e) => setParagraphs(Math.min(20, Math.max(1, parseInt(e.target.value) || 1)))}
          className="input-field w-24"
        />
      </div>
      <div className="flex items-start space-x-2">
        <textarea
          className="input-field min-h-[200px]"
          value={generate()}
          readOnly
        />
        <CopyButton text={generate()} />
      </div>
    </div>
  );
}

// ===== 6. Text to Slug =====
export function TextToSlug() {
  const [text, setText] = useState('');

  const slugify = (str) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  return (
    <div className="space-y-4">
      <textarea
        className="input-field min-h-[150px]"
        placeholder="Enter text to convert to slug..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex items-start space-x-2">
        <input
          className="input-field"
          value={slugify(text)}
          readOnly
          placeholder="Slug appears here..."
        />
        <CopyButton text={slugify(text)} />
      </div>
    </div>
  );
}

// ===== 7. Remove Duplicate Lines =====
export function RemoveDuplicates() {
  const [text, setText] = useState('');

  const removeDupes = () => {
    return [...new Set(text.split('\n'))].join('\n');
  };

  return (
    <div className="space-y-4">
      <textarea
        className="input-field min-h-[150px]"
        placeholder="Paste text with duplicate lines..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex items-start space-x-2">
        <textarea
          className="input-field min-h-[150px]"
          value={removeDupes()}
          readOnly
          placeholder="Unique lines appear here..."
        />
        <CopyButton text={removeDupes()} />
      </div>
    </div>
  );
}

// ===== 8. Sort Text Lines =====
export function SortLines() {
  const [text, setText] = useState('');
  const [order, setOrder] = useState('asc');

  const sortLines = () => {
    const lines = text.split('\n').filter(l => l.trim());
    return order === 'asc' ? lines.sort() : lines.sort().reverse();
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setOrder('asc')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            order === 'asc' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          A → Z
        </button>
        <button
          onClick={() => setOrder('desc')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            order === 'desc' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          Z → A
        </button>
      </div>
      <textarea
        className="input-field min-h-[150px]"
        placeholder="Enter lines to sort..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex items-start space-x-2">
        <textarea
          className="input-field min-h-[150px]"
          value={sortLines().join('\n')}
          readOnly
          placeholder="Sorted lines appear here..."
        />
        <CopyButton text={sortLines().join('\n')} />
      </div>
    </div>
  );
}

// ===== 9. Find & Replace =====
export function FindReplace() {
  const [text, setText] = useState('');
  const [find, setFind] = useState('');
  const [replace, setReplace] = useState('');

  const result = find ? text.split(find).join(replace) : text;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className="input-field"
          placeholder="Find..."
          value={find}
          onChange={(e) => setFind(e.target.value)}
        />
        <input
          className="input-field"
          placeholder="Replace with..."
          value={replace}
          onChange={(e) => setReplace(e.target.value)}
        />
      </div>
      <textarea
        className="input-field min-h-[150px]"
        placeholder="Enter your text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex items-start space-x-2">
        <textarea
          className="input-field min-h-[150px]"
          value={result}
          readOnly
          placeholder="Result appears here..."
        />
        <CopyButton text={result} />
      </div>
    </div>
  );
}

// ===== 10. Text to Binary =====
export function TextToBinary() {
  const [text, setText] = useState('');
  const [mode, setMode] = useState('encode');

  const toBinary = (str) => {
    return str.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
  };

  const fromBinary = (bin) => {
    return bin.trim().split(' ').map(b => String.fromCharCode(parseInt(b, 2))).join('');
  };

  const result = mode === 'encode' ? toBinary(text) : fromBinary(text);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setMode('encode')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            mode === 'encode' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          Text → Binary
        </button>
        <button
          onClick={() => setMode('decode')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            mode === 'decode' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          Binary → Text
        </button>
      </div>
      <textarea
        className="input-field min-h-[150px]"
        placeholder={mode === 'encode' ? 'Enter text to convert to binary...' : 'Enter binary code to convert to text...'}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex items-start space-x-2">
        <textarea
          className="input-field min-h-[150px]"
          value={result}
          readOnly
          placeholder="Result appears here..."
        />
        <CopyButton text={result} />
      </div>
    </div>
  );
}