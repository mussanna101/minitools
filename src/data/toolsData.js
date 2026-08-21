export const categories = [
  { id: 'pdf', name: 'PDF Tools', icon: '📄', color: 'from-cyan-500 to-blue-600', description: 'Convert, merge, compress, split, and transform PDF documents in your browser.' },
  { id: 'text', name: 'Text Tools', icon: '📝', color: 'from-blue-500 to-indigo-600', description: 'Count, clean, transform, sort, and generate text for writing and everyday work.' },
  { id: 'image', name: 'Image & Color', icon: '🖼️', color: 'from-pink-500 to-rose-600', description: 'Resize, compress, convert, inspect, and create images and color values online.' },
  { id: 'calculator', name: 'Calculators', icon: '🧮', color: 'from-green-500 to-emerald-600', description: 'Work out percentages, BMI, loans, dates, interest, grades, and everyday calculations.' },
  { id: 'converter', name: 'Converters', icon: '🔄', color: 'from-orange-500 to-amber-600', description: 'Convert units, currencies, measurements, data, energy, pressure, and time zones.' },
  { id: 'developer', name: 'Developer Tools', icon: '💻', color: 'from-purple-500 to-violet-600', description: 'Format, validate, encode, test, minify, convert, and generate developer data.' },
  { id: 'media', name: 'Media / Video / Audio', icon: '▶️', color: 'from-red-500 to-pink-600', description: 'Convert local media files and fetch supported social or YouTube videos through the downloader backend.' },
  { id: 'fun', name: 'Fun Tools', icon: '🎲', color: 'from-yellow-500 to-orange-500', description: 'Play with generators, games, text experiments, quotes, and quick interactive utilities.' },
];

export const tools = [
  // ===== PDF & MEDIA TOOLS (8) =====
  { id: 'pdf-to-word', name: 'PDF to Word Converter', category: 'pdf', icon: '📄', description: 'Convert PDF files to editable Word documents' },
  { id: 'word-to-pdf', name: 'Word to PDF Converter', category: 'pdf', icon: '📝', description: 'Convert Word documents to PDF format' },
  { id: 'image-to-pdf', name: 'Image to PDF Converter', category: 'pdf', icon: '🖼️', description: 'Convert images to PDF documents' },
  { id: 'pdf-to-image', name: 'PDF to Image Converter', category: 'pdf', icon: '🖼️', description: 'Convert PDF pages to images' },
  { id: 'merge-pdf', name: 'Merge PDF Files', category: 'pdf', icon: '📚', description: 'Combine multiple PDF files into one' },
  { id: 'compress-pdf', name: 'Compress PDF', category: 'pdf', icon: '🗜️', description: 'Reduce PDF file size' },
  { id: 'audio-to-mp3', name: 'Audio to MP3 Converter', category: 'media', icon: '🎵', description: 'Convert audio files to MP3 format' },
  { id: 'video-to-mp4', name: 'Video to MP4 Converter', category: 'media', icon: '🎬', description: 'Convert video files to MP4 format' },
    { id: 'video-downloader', name: 'Video Downloader (Social)', category: 'media', icon: '🌐', description: 'Download videos from Facebook, Instagram, TikTok, Dailymotion & more' },
  { id: 'pdf-split', name: 'Split PDF', category: 'pdf', icon: '✂️', description: 'Extract specific pages from a PDF file' },
  { id: 'youtube-downloader', name: 'YouTube Downloader', category: 'media', icon: '▶️', description: 'Download YouTube videos as MP4 or convert them to MP3' },

  // ===== TEXT TOOLS (10) =====
  { id: 'word-counter', name: 'Word Counter', category: 'text', icon: '🔢', description: 'Count words, characters, sentences & paragraphs' },
  { id: 'character-counter', name: 'Character Counter', category: 'text', icon: '🔤', description: 'Live character count with/without spaces' },
  { id: 'case-converter', name: 'Case Converter', category: 'text', icon: '🔠', description: 'Convert text to UPPER, lower, Title & Sentence case' },
  { id: 'text-reverser', name: 'Text Reverser', category: 'text', icon: '↔️', description: 'Reverse text, words & lines' },
  { id: 'lorem-ipsum', name: 'Lorem Ipsum Generator', category: 'text', icon: '📄', description: 'Generate dummy text for design & testing' },
  { id: 'text-to-slug', name: 'Text to Slug', category: 'text', icon: '🔗', description: 'Convert text to URL-friendly slug' },
  { id: 'remove-duplicates', name: 'Remove Duplicate Lines', category: 'text', icon: '🧹', description: 'Remove duplicate lines from text' },
  { id: 'sort-lines', name: 'Sort Text Lines', category: 'text', icon: '↕️', description: 'Sort lines alphabetically A-Z or Z-A' },
  { id: 'find-replace', name: 'Find & Replace', category: 'text', icon: '🔍', description: 'Search and replace text in content' },
    { id: 'text-to-binary', name: 'Text to Binary', category: 'text', icon: '💾', description: 'Convert text to binary code & vice versa' },
  { id: 'roman-numerals', name: 'Roman Numerals Converter', category: 'text', icon: '🔢', description: 'Convert between Roman and Arabic numbers' },
  { id: 'number-to-words', name: 'Number to Words', category: 'text', icon: '🔤', description: 'Convert numbers to English words' },
  { id: 'markdown-to-html', name: 'Markdown to HTML', category: 'text', icon: '📝', description: 'Convert Markdown to rendered HTML' },
  { id: 'typing-speed', name: 'Typing Speed Test', category: 'text', icon: '⌨️', description: 'Test your typing speed (WPM) and accuracy' },

  // ===== IMAGE & COLOR TOOLS (5) =====
  { id: 'image-to-base64', name: 'Image to Base64', category: 'image', icon: '🖼️', description: 'Convert image to Base64 string' },
  { id: 'image-resizer', name: 'Image Resizer', category: 'image', icon: '📐', description: 'Resize image dimensions online' },
  { id: 'image-compressor', name: 'Image Compressor', category: 'image', icon: '🗜️', description: 'Compress image file size' },
  { id: 'color-picker', name: 'Color Picker', category: 'image', icon: '🎨', description: 'Pick colors from a visual palette' },
  { id: 'color-converter', name: 'Color Converter', category: 'image', icon: '🌈', description: 'Convert HEX, RGB & HSL color formats' },

  // ===== CALCULATOR TOOLS (8) =====
  { id: 'basic-calculator', name: 'Basic Calculator', category: 'calculator', icon: '🧮', description: 'Simple calculator for basic operations' },
  { id: 'percentage-calculator', name: 'Percentage Calculator', category: 'calculator', icon: '💯', description: 'Calculate percentages, increase & decrease' },
  { id: 'bmi-calculator', name: 'BMI Calculator', category: 'calculator', icon: '⚖️', description: 'Calculate Body Mass Index' },
  { id: 'age-calculator', name: 'Age Calculator', category: 'calculator', icon: '🎂', description: 'Calculate exact age in years, months & days' },
  { id: 'discount-calculator', name: 'Discount Calculator', category: 'calculator', icon: '🏷️', description: 'Calculate price after discount' },
  { id: 'tip-calculator', name: 'Tip Calculator', category: 'calculator', icon: '💵', description: 'Calculate tip amount & total bill' },
  { id: 'loan-calculator', name: 'Loan Calculator', category: 'calculator', icon: '🏦', description: 'Calculate EMI for loans' },
    { id: 'scientific-calculator', name: 'Scientific Calculator', category: 'calculator', icon: '🔬', description: 'Advanced calculator with trig & log functions' },
  { id: 'gpa-calculator', name: 'GPA Calculator', category: 'calculator', icon: '🎓', description: 'Calculate weighted GPA from grades and credits' },
  { id: 'compound-interest', name: 'Compound Interest Calculator', category: 'calculator', icon: '💰', description: 'Calculate compound interest and final invested amount' },
  { id: 'date-difference', name: 'Date Difference Calculator', category: 'calculator', icon: '📅', description: 'Calculate days, weeks & months between two dates' },

  // ===== CONVERTER TOOLS (10) =====
  { id: 'length-converter', name: 'Length Converter', category: 'converter', icon: '📏', description: 'Convert m, km, mile, feet, inch & more' },
  { id: 'weight-converter', name: 'Weight Converter', category: 'converter', icon: '⚖️', description: 'Convert kg, lb, oz, ton & more' },
  { id: 'temperature-converter', name: 'Temperature Converter', category: 'converter', icon: '🌡️', description: 'Convert °C, °F & Kelvin' },
  { id: 'currency-converter', name: 'Currency Converter', category: 'converter', icon: '💱', description: 'Convert USD, EUR, PKR & more' },
  { id: 'speed-converter', name: 'Speed Converter', category: 'converter', icon: '🚀', description: 'Convert km/h, mph, m/s & more' },
  { id: 'area-converter', name: 'Area Converter', category: 'converter', icon: '📐', description: 'Convert m², acre, hectare & more' },
  { id: 'volume-converter', name: 'Volume Converter', category: 'converter', icon: '🧪', description: 'Convert L, mL, gallon & more' },
  { id: 'time-converter', name: 'Time Converter', category: 'converter', icon: '⏰', description: 'Convert sec, min, hour, day & more' },
  { id: 'data-converter', name: 'Data Storage Converter', category: 'converter', icon: '💾', description: 'Convert KB, MB, GB, TB & more' },
    { id: 'number-base-converter', name: 'Number Base Converter', category: 'converter', icon: '🔢', description: 'Convert Binary, Octal, Decimal & Hex' },
  { id: 'pressure-converter', name: 'Pressure Converter', category: 'converter', icon: '🔄', description: 'Convert between pressure units (Pa, kPa, bar, atm, psi...)' },
  { id: 'energy-converter', name: 'Energy Converter', category: 'converter', icon: '⚡', description: 'Convert between energy units (J, kcal, BTU, kWh...)' },
  { id: 'time-zone-converter', name: 'Time Zone Converter', category: 'converter', icon: '🌐', description: 'Convert date & time across world time zones' },

  // ===== CODE TESTING & CONVERSION TOOLS (8) =====
  { id: 'html-preview', name: 'HTML Preview & Test', category: 'developer', icon: '🌐', description: 'Live HTML preview with instant rendering' },
  { id: 'css-tester', name: 'CSS Style Tester', category: 'developer', icon: '🎨', description: 'Test CSS styles on sample elements' },
  { id: 'js-playground', name: 'JavaScript Playground', category: 'developer', icon: '⚡', description: 'Run and test JavaScript code online' },
  { id: 'html-to-jsx', name: 'HTML to JSX Converter', category: 'developer', icon: '🔀', description: 'Convert HTML code to React JSX' },
  { id: 'css-to-scss', name: 'CSS to SCSS Converter', category: 'developer', icon: '💅', description: 'Convert CSS to SCSS syntax' },
  { id: 'json-to-yaml', name: 'JSON to YAML Converter', category: 'developer', icon: '📋', description: 'Convert JSON data to YAML format' },
  { id: 'yaml-to-json', name: 'YAML to JSON Converter', category: 'developer', icon: '📄', description: 'Convert YAML data to JSON format' },
    { id: 'background-remover', name: 'Background Remover', category: 'image', icon: '✂️', description: 'Remove background from images' },
  { id: 'png-to-jpg', name: 'PNG to JPG', category: 'image', icon: '🖼️', description: 'Convert PNG images to JPG format' },
  { id: 'jpg-to-png', name: 'JPG to PNG', category: 'image', icon: '🖼️', description: 'Convert JPG images to PNG format' },
  { id: 'image-to-text', name: 'Image to Text (OCR)', category: 'image', icon: '🔍', description: 'Extract text from images using OCR' },
  { id: 'base64-to-image', name: 'Base64 to Image', category: 'image', icon: '🖼️', description: 'Convert a Base64 string to an image file' },
  { id: 'gradient-generator', name: 'Gradient Generator', category: 'image', icon: '🎨', description: 'Create, preview and download CSS gradients' },

  // ===== DEVELOPER TOOLS (12) =====
  { id: 'json-formatter', name: 'JSON Formatter', category: 'developer', icon: '📋', description: 'Format & validate JSON data' },
  { id: 'json-to-csv', name: 'JSON to CSV', category: 'developer', icon: '📊', description: 'Convert JSON data to CSV format' },
  { id: 'base64-encoder', name: 'Base64 Encoder/Decoder', category: 'developer', icon: '🔐', description: 'Encode & decode Base64 text' },
  { id: 'url-encoder', name: 'URL Encoder/Decoder', category: 'developer', icon: '🔗', description: 'Encode & decode URL strings' },
  { id: 'html-minifier', name: 'HTML Minifier', category: 'developer', icon: '📄', description: 'Minify HTML code to save space' },
  { id: 'css-minifier', name: 'CSS Minifier', category: 'developer', icon: '🎨', description: 'Minify CSS code to save space' },
  { id: 'js-minifier', name: 'JS Minifier', category: 'developer', icon: '⚡', description: 'Minify JavaScript code' },
  { id: 'regex-tester', name: 'Regex Tester', category: 'developer', icon: '🧩', description: 'Test regular expression patterns' },
  { id: 'password-generator', name: 'Password Generator', category: 'developer', icon: '🔑', description: 'Generate strong random passwords' },
  { id: 'uuid-generator', name: 'UUID Generator', category: 'developer', icon: '🆔', description: 'Generate random UUID v4' },
  { id: 'hash-generator', name: 'Hash Generator', category: 'developer', icon: '#️⃣', description: 'Generate MD5, SHA-1 & SHA-256 hashes' },
    { id: 'qr-generator', name: 'QR Code Generator', category: 'developer', icon: '📱', description: 'Generate QR codes from text or URL' },
  { id: 'qr-scanner', name: 'QR Code Scanner', category: 'developer', icon: '📷', description: 'Scan QR codes from your device camera' },

  // ===== FUN TOOLS (8) =====
  { id: 'random-number', name: 'Random Number Generator', category: 'fun', icon: '🎲', description: 'Generate random numbers in a range' },
  { id: 'dice-roller', name: 'Dice Roller', category: 'fun', icon: '🎯', description: 'Roll virtual dice 1-6' },
  { id: 'coin-flip', name: 'Coin Flip', category: 'fun', icon: '🪙', description: 'Flip a virtual coin - Heads or Tails' },
  { id: 'emoji-translator', name: 'Emoji Translator', category: 'fun', icon: '😀', description: 'Translate text to emoji' },
  { id: 'ascii-art', name: 'ASCII Art Generator', category: 'fun', icon: '🎨', description: 'Convert text to ASCII art' },
  { id: 'palindrome-checker', name: 'Palindrome Checker', category: 'fun', icon: '🔄', description: 'Check if text is a palindrome' },
  { id: 'anagram-generator', name: 'Anagram Generator', category: 'fun', icon: '🔀', description: 'Generate anagrams from words' },
  { id: 'random-quote', name: 'Random Quote Generator', category: 'fun', icon: '💬', description: 'Get random inspirational quotes' },
];

export const getToolsByCategory = (categoryId) => tools.filter(t => t.category === categoryId);
export const getToolById = (id) => tools.find(t => t.id === id);