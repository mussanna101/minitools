// src/data/toolContentData.js
// Editorial copy for tool content blocks:
// about    -> natural 1-2 paragraph description
// formats  -> plain string (e.g. "PNG, JPG, WebP")
// limits   -> array of limit strings (e.g. ["Max file size: 50MB", ...])

export const toolContentData = {
  'pdf-to-word': {
    about: 'The PDF to Word Converter extracts text content from your PDF file using pdf.js and compiles it into an editable Word document (.docx). Paragraph structure and layout are preserved where possible.',
    formats: 'Input: PDF. Output: DOCX.',
    limits: ['Processes files up to browser memory limits.', 'Scanned images without text layers require OCR.'],
  },
  'word-to-pdf': {
    about: 'The Word to PDF Converter converts .docx and text files into a clean PDF document. It parses the document XML in your browser and rebuilds the text into a downloadable PDF.',
    formats: 'Input: DOCX, TXT. Output: PDF.',
    limits: ['Best suited for text and standard paragraphs.', 'Complex custom layouts may be simplified.'],
  },
  'image-to-pdf': {
    about: 'The Image to PDF Converter lets you select multiple image files (JPG, PNG) and combine them into a single, multi-page PDF document. Each image becomes a separate page in the final PDF.',
    formats: 'Input: JPG, PNG, WebP. Output: PDF.',
    limits: ['Images are embedded at their native resolution.'],
  },
  'pdf-to-image': {
    about: 'The PDF to Image Converter extracts each page of a PDF document and converts it into a high-resolution PNG image. The resulting images are packaged into a downloadable ZIP archive.',
    formats: 'Input: PDF. Output: PNG (inside a ZIP file).',
    limits: ['Large PDFs with many pages may take a few seconds to render.'],
  },
  'merge-pdf': {
    about: 'Merge PDF Files allows you to select multiple PDF files and combine them into a single, unified document in your preferred page order.',
    formats: 'Input: Multiple PDFs. Output: Merged PDF.',
    limits: ['Encrypted or password-protected PDFs must be unlocked before merging.'],
  },
  'compress-pdf': {
    about: 'Compress PDF optimizes PDF documents by rebuilding the object structure and compressing data streams. This reduces file size while keeping text and graphics intact.',
    formats: 'Input: PDF. Output: Compressed PDF.',
    limits: ['Size reduction varies based on original PDF compression level.'],
  },
  'pdf-split': {
    about: 'Split PDF enables you to extract specific pages or page ranges from a PDF file into a new document.',
    formats: 'Input: PDF. Output: PDF containing selected pages.',
    limits: ['Requires valid page numbers or ranges within total page count.'],
  },
  'audio-to-mp3': {
    about: 'Audio to MP3 Converter decodes local audio files and re-encodes them into MP3 format using lamejs inside your browser.',
    formats: 'Input: WAV, OGG, AAC, FLAC, M4A. Output: MP3.',
    limits: ['Encoding speed depends on CPU performance and audio duration.'],
  },
  'video-to-mp4': {
    about: 'Video to MP4 Converter re-encodes video files in your browser using MediaRecorder. Supports MP4 output on compatible browsers.',
    formats: 'Input: MOV, AVI, WEBM, MKV. Output: MP4 or WebM.',
    limits: ['Max resolution capped at 960x540 for fast browser performance.'],
  },
  'video-downloader': {
    about: 'The Universal Video Downloader lets you download videos from social platforms such as Facebook, Instagram, TikTok, Dailymotion, and Vimeo.',
    formats: 'Input: Video URL. Output: MP4, MP3.',
    limits: ['Only download content you own or have permission to download.', 'Requires active backend service connection.'],
  },
  'youtube-downloader': {
    about: 'YouTube Downloader allows downloading YouTube videos in available MP4 resolutions or extracting the audio track as an MP3 file.',
    formats: 'Input: YouTube URL. Output: MP4, MP3.',
    limits: ['Subject to YouTube rate limits and terms of service.', 'Only download public videos or content you own.'],
  },
  'word-counter': {
    about: 'Word Counter counts words, characters (with and without spaces), sentences, and paragraphs in real time as you type or paste text.',
    formats: 'Input: Plain text.',
    limits: ['No length limit; handles large text blocks easily.'],
  },
  'character-counter': {
    about: 'Character Counter provides live character counts for tweets, messages, social posts, and meta descriptions.',
    formats: 'Input: Plain text.',
    limits: ['Instant live processing.'],
  },
  'case-converter': {
    about: 'Case Converter transforms text between UPPERCASE, lowercase, Title Case, and Sentence case instantly.',
    formats: 'Input: Plain text.',
    limits: ['Instant client-side conversion.'],
  },
  'text-reverser': {
    about: 'Text Reverser flips text by character, word, or line order.',
    formats: 'Input: Plain text.',
    limits: ['Instant live processing.'],
  },
  'lorem-ipsum': {
    about: 'Lorem Ipsum Generator creates customizable placeholder text for design, layout, and testing purposes.',
    formats: 'Output: Plain text paragraphs.',
    limits: ['Generate up to 50 paragraphs at a time.'],
  },
  'text-to-slug': {
    about: 'Text to Slug converts text strings into URL-friendly slugs by lowercasing, removing special characters, and replacing spaces with hyphens.',
    formats: 'Input: Plain text. Output: URL slug.',
    limits: ['Supports standard international characters.'],
  },
  'remove-duplicates': {
    about: 'Remove Duplicate Lines cleans up text by eliminating duplicate lines while retaining unique content.',
    formats: 'Input: Multi-line plain text.',
    limits: ['Instant line processing.'],
  },
  'sort-lines': {
    about: 'Sort Text Lines sorts multi-line text alphabetically in ascending (A-Z) or descending (Z-A) order.',
    formats: 'Input: Multi-line plain text.',
    limits: ['Supports case-sensitive and case-insensitive sorting.'],
  },
  'find-replace': {
    about: 'Find & Replace searches for text patterns within content and replaces them with specified replacement strings.',
    formats: 'Input: Plain text.',
    limits: ['Supports optional regex match patterns.'],
  },
  'text-to-binary': {
    about: 'Text to Binary converts ASCII or UTF-8 text to binary digits (0s and 1s) and translates binary code back into readable text.',
    formats: 'Input: Text or Binary. Output: Binary or Text.',
    limits: ['Binary input must be space-separated 8-bit bytes.'],
  },
  'roman-numerals': {
    about: 'Roman Numerals Converter converts Arabic numbers (1-3999) into Roman numerals and vice versa.',
    formats: 'Input: Integer (1-3999) or Roman numeral string.',
    limits: ['Standard Roman numeral range: 1 to 3999.'],
  },
  'number-to-words': {
    about: 'Number to Words converts numeric figures into spoken English words.',
    formats: 'Input: Numeric value. Output: English words.',
    limits: ['Supports numbers up to trillions.'],
  },
  'markdown-to-html': {
    about: 'Markdown to HTML parses Markdown formatting and renders formatted HTML with a live preview.',
    formats: 'Input: Markdown. Output: HTML markup.',
    limits: ['Uses standard Marked parser.'],
  },
  'typing-speed': {
    about: 'Typing Speed Test calculates your typing speed in words per minute (WPM), characters per minute (CPM), and accuracy score.',
    formats: 'Input: Typed text.',
    limits: ['Calculates stats upon test completion.'],
  },
  'image-to-base64': {
    about: 'Image to Base64 encodes uploaded image files into Base64 Data URL strings suitable for embedding directly in HTML or CSS.',
    formats: 'Input: JPG, PNG, WebP, GIF, SVG. Output: Base64 string.',
    limits: ['Large images generate long Base64 text strings.'],
  },
  'image-resizer': {
    about: 'Image Resizer adjusts image dimensions to target pixel width and height while preserving quality.',
    formats: 'Input: JPG, PNG, WebP. Output: Resized image file.',
    limits: ['Processing done entirely in client canvas.'],
  },
  'image-compressor': {
    about: 'Image Compressor reduces image file size by re-compressing image data with adjustable quality settings.',
    formats: 'Input: JPG, PNG, WebP. Output: Compressed image.',
    limits: ['Compression efficiency depends on target quality slider.'],
  },
  'color-picker': {
    about: 'Color Picker allows visual selection of colors and outputs exact codes in HEX, RGB, and HSL formats.',
    formats: 'Input/Output: HEX, RGB, HSL.',
    limits: ['Instant visual preview.'],
  },
  'color-converter': {
    about: 'Color Converter translates color values across HEX, RGB, and HSL representations.',
    formats: 'Input: HEX, RGB, HSL. Output: Converted color codes.',
    limits: ['Standard color format support.'],
  },
  'png-to-jpg': {
    about: 'PNG to JPG converts PNG images to JPG format, replacing transparency with a clean background.',
    formats: 'Input: PNG. Output: JPG.',
    limits: ['Fills transparent pixels with white.'],
  },
  'jpg-to-png': {
    about: 'JPG to PNG converts JPG graphics to lossless PNG images.',
    formats: 'Input: JPG. Output: PNG.',
    limits: ['Instant client conversion.'],
  },
  'image-to-text': {
    about: 'Image to Text (OCR) extracts printable text from photos, scans, and screenshots using Tesseract.js directly in your browser.',
    formats: 'Input: JPG, PNG, WebP. Output: Extracted text.',
    limits: ['Requires clear, high-contrast text for best OCR accuracy.'],
  },
  'base64-to-image': {
    about: 'Base64 to Image decodes Base64 image strings back into viewable and downloadable image files.',
    formats: 'Input: Base64 string. Output: PNG, JPG, WebP file.',
    limits: ['Base64 string must be valid data URI or encoded string.'],
  },
  'gradient-generator': {
    about: 'Gradient Generator creates linear and radial CSS gradients with multiple color stops and exports them as CSS code or PNG graphics.',
    formats: 'Output: CSS code, PNG image.',
    limits: ['Supports linear and radial gradient types.'],
  },
  'basic-calculator': {
    about: 'Basic Calculator performs standard arithmetic operations including addition, subtraction, multiplication, and division.',
    formats: 'Input: Numbers and operators.',
    limits: ['Standard arithmetic limits.'],
  },
  'percentage-calculator': {
    about: 'Percentage Calculator solves percentage increase, percentage decrease, and relative percentage values.',
    formats: 'Input: Numeric values.',
    limits: ['Instant calculation.'],
  },
  'bmi-calculator': {
    about: 'BMI Calculator calculates Body Mass Index based on height and weight inputs in metric or imperial units.',
    formats: 'Input: Height and weight values.',
    limits: ['Provides standard WHO BMI categorization.'],
  },
  'age-calculator': {
    about: 'Age Calculator determines exact age down to years, months, and days from a date of birth.',
    formats: 'Input: Date of Birth.',
    limits: ['Accurate date calculation.'],
  },
  'discount-calculator': {
    about: 'Discount Calculator determines final price and total savings based on original price and discount percentage.',
    formats: 'Input: Price and discount rate.',
    limits: ['Instant financial calculation.'],
  },
  'tip-calculator': {
    about: 'Tip Calculator computes tip amount and total bill per person for group meals.',
    formats: 'Input: Bill total, tip %, split count.',
    limits: ['Instant calculations.'],
  },
  'loan-calculator': {
    about: 'Loan Calculator computes monthly EMI repayments, total interest payable, and total loan cost.',
    formats: 'Input: Principal, interest rate %, tenure.',
    limits: ['Standard amortization math.'],
  },
  'scientific-calculator': {
    about: 'Scientific Calculator performs trigonometric, logarithmic, exponential, and power math operations.',
    formats: 'Input: Mathematical expressions.',
    limits: ['Supports standard scientific functions.'],
  },
  'gpa-calculator': {
    about: 'GPA Calculator computes weighted Grade Point Average from subject grades and course credits.',
    formats: 'Input: Grades and credits list.',
    limits: ['Supports standard 4.0 grading scale.'],
  },
  'compound-interest': {
    about: 'Compound Interest Calculator computes future investment growth across principal, interest rate, frequency, and duration.',
    formats: 'Input: Principal, rate, compounding frequency, years.',
    limits: ['Standard compound interest formulas.'],
  },
  'date-difference': {
    about: 'Date Difference Calculator counts total days, weeks, and months elapsed between two selected dates.',
    formats: 'Input: Start date, end date.',
    limits: ['Includes leap year calculations.'],
  },
  'length-converter': {
    about: 'Length Converter converts measurements between meters, kilometers, miles, feet, inches, yards, and centimeters.',
    formats: 'Input/Output: Length units.',
    limits: ['Instant unit conversion.'],
  },
  'weight-converter': {
    about: 'Weight Converter translates mass between kilograms, grams, pounds, ounces, and tons.',
    formats: 'Input/Output: Weight units.',
    limits: ['Instant unit conversion.'],
  },
  'temperature-converter': {
    about: 'Temperature Converter converts degrees Celsius, Fahrenheit, and Kelvin.',
    formats: 'Input/Output: °C, °F, K.',
    limits: ['Exact temperature formulas.'],
  },
  'currency-converter': {
    about: 'Currency Converter calculates approximate conversion values across major international currencies.',
    formats: 'Input/Output: Currency codes.',
    limits: ['Uses standard daily conversion exchange benchmarks.'],
  },
  'speed-converter': {
    about: 'Speed Converter converts velocity values across km/h, mph, m/s, and knots.',
    formats: 'Input/Output: Speed units.',
    limits: ['Instant velocity conversion.'],
  },
  'area-converter': {
    about: 'Area Converter translates area measurements between square meters, square feet, acres, and hectares.',
    formats: 'Input/Output: Area units.',
    limits: ['Instant area conversion.'],
  },
  'volume-converter': {
    about: 'Volume Converter converts liquid and spatial volume across liters, milliliters, gallons, and cubic meters.',
    formats: 'Input/Output: Volume units.',
    limits: ['Instant volume conversion.'],
  },
  'time-converter': {
    about: 'Time Converter converts time units between seconds, minutes, hours, days, and weeks.',
    formats: 'Input/Output: Time units.',
    limits: ['Instant unit conversion.'],
  },
  'data-converter': {
    about: 'Data Storage Converter converts digital data values between Bytes, KB, MB, GB, and TB.',
    formats: 'Input/Output: Storage units (1024 base).',
    limits: ['Binary data storage math.'],
  },
  'number-base-converter': {
    about: 'Number Base Converter translates numbers between Decimal, Binary, Octal, and Hexadecimal representations.',
    formats: 'Input/Output: Base 2, 8, 10, 16.',
    limits: ['Supports standard integer conversions.'],
  },
  'pressure-converter': {
    about: 'Pressure Converter converts pressure units across Pascals, kPa, bar, atmospheres, and PSI.',
    formats: 'Input/Output: Pressure units.',
    limits: ['Instant pressure unit math.'],
  },
  'energy-converter': {
    about: 'Energy Converter converts energy values across Joules, kilocalories, BTU, and kilowatt-hours.',
    formats: 'Input/Output: Energy units.',
    limits: ['Instant energy unit math.'],
  },
  'time-zone-converter': {
    about: 'Time Zone Converter calculates equivalent time and date values across world time zones.',
    formats: 'Input/Output: Date & time with time zones.',
    limits: ['Uses browser Intl time zone formatting.'],
  },
  'html-preview': {
    about: 'HTML Preview renders live HTML, CSS, and JS code snippets inside an isolated sandbox iframe.',
    formats: 'Input: HTML markup. Output: Visual preview.',
    limits: ['Sandboxed execution.'],
  },
  'css-tester': {
    about: 'CSS Style Tester tests custom CSS rules against target HTML preview elements.',
    formats: 'Input: CSS syntax. Output: Live styled element.',
    limits: ['Scoped inline styling.'],
  },
  'js-playground': {
    about: 'JavaScript Playground runs JavaScript code snippets in your browser and displays console output.',
    formats: 'Input: JS code. Output: Execution log.',
    limits: ['Runs within local browser JS engine.'],
  },
  'html-to-jsx': {
    about: 'HTML to JSX Converter translates standard HTML elements and attributes into React JSX syntax.',
    formats: 'Input: HTML code. Output: JSX React code.',
    limits: ['Converts attributes like class->className and inline styles.'],
  },
  'css-to-scss': {
    about: 'CSS to SCSS Converter formats CSS selectors into nested SCSS syntax structure.',
    formats: 'Input: CSS code. Output: SCSS code.',
    limits: ['Converts standard CSS rulesets.'],
  },
  'json-to-yaml': {
    about: 'JSON to YAML Converter transforms formatted JSON data structures into clean YAML format.',
    formats: 'Input: JSON. Output: YAML.',
    limits: ['Validates JSON input structure.'],
  },
  'yaml-to-json': {
    about: 'YAML to JSON Converter parses YAML data structures and outputs formatted JSON.',
    formats: 'Input: YAML. Output: JSON.',
    limits: ['Parses standard key-value and list structures.'],
  },
  'background-remover': {
    about: 'Background Remover uses client-side canvas color thresholding to detect and remove solid or background colors from uploaded images, creating a transparent PNG image.',
    formats: 'Input: Image file (JPG, PNG, WebP). Output: Transparent PNG file.',
    limits: ['Works best on images with high-contrast background colors.', 'User can adjust target color and color tolerance.'],
  },
  'json-formatter': {
    about: 'JSON Formatter validates, indents, and formats raw JSON data for easy readability.',
    formats: 'Input: Raw JSON string. Output: Formatted JSON.',
    limits: ['Validates JSON syntax before formatting.'],
  },
  'json-to-csv': {
    about: 'JSON to CSV converts JSON arrays of objects into CSV tabular format.',
    formats: 'Input: JSON array. Output: CSV text.',
    limits: ['Input must be an array of flat or semi-flat objects.'],
  },
  'base64-encoder': {
    about: 'Base64 Encoder/Decoder converts plain text to Base64 encoding and decodes Base64 strings back to text.',
    formats: 'Input/Output: Text string or Base64.',
    limits: ['UTF-8 text encoding.'],
  },
  'url-encoder': {
    about: 'URL Encoder/Decoder escapes and unescapes URL component strings.',
    formats: 'Input/Output: URL text.',
    limits: ['Standard percent-encoding rules.'],
  },
  'html-minifier': {
    about: 'HTML Minifier compresses HTML code by stripping unnecessary whitespace, line breaks, and comments.',
    formats: 'Input: HTML code. Output: Minified HTML.',
    limits: ['Preserves essential HTML code structure.'],
  },
  'css-minifier': {
    about: 'CSS Minifier shrinks CSS code size by stripping extra spacing, comments, and redundant formatting.',
    formats: 'Input: CSS code. Output: Minified CSS.',
    limits: ['Preserves CSS rule validity.'],
  },
  'js-minifier': {
    about: 'JS Minifier reduces JavaScript file size by stripping whitespace and comments.',
    formats: 'Input: JS code. Output: Minified JS.',
    limits: ['Safe basic whitespace minification.'],
  },
  'regex-tester': {
    about: 'Regex Tester validates regular expression patterns and highlights matches within test strings.',
    formats: 'Input: Regex pattern, flags, test text. Output: Highlighted match list.',
    limits: ['Uses native browser RegExp execution.'],
  },
  'password-generator': {
    about: 'Password Generator creates secure, high-entropy random passwords with configurable length and character sets.',
    formats: 'Output: Plain text password.',
    limits: ['Generates up to 64 character secure passwords.'],
  },
  'uuid-generator': {
    about: 'UUID Generator creates cryptographically strong UUID v4 unique identifiers.',
    formats: 'Output: UUID string.',
    limits: ['Generates RFC 4122 compliant v4 UUIDs.'],
  },
  'hash-generator': {
    about: 'Hash Generator computes cryptographic MD5, SHA-1, and SHA-256 hash digests from text input.',
    formats: 'Input: Text string. Output: Hex hash string.',
    limits: ['Calculated in browser via SubtleCrypto API.'],
  },
  'qr-generator': {
    about: 'QR Code Generator generates downloadable QR code images from URLs or text.',
    formats: 'Input: Text or URL. Output: PNG QR code image.',
    limits: ['Standard QR code data encoding.'],
  },
  'qr-scanner': {
    about: 'QR Code Scanner reads QR codes from your device camera stream or image upload using jsQR.',
    formats: 'Input: Camera video or uploaded image. Output: Decoded text URL.',
    limits: ['Requires camera permission for live camera scan.'],
  },
  'random-number': {
    about: 'Random Number Generator produces random integers within a custom minimum and maximum range.',
    formats: 'Input: Min and Max numbers. Output: Random number.',
    limits: ['Integer numbers.'],
  },
  'dice-roller': {
    about: 'Dice Roller simulates rolling 6-sided virtual dice with random outcomes.',
    formats: 'Output: Dice roll results.',
    limits: ['Simulates 1 to 6 dice.'],
  },
  'coin-flip': {
    about: 'Coin Flip flips a virtual coin to produce a random Heads or Tails outcome.',
    formats: 'Output: Heads or Tails.',
    limits: ['50/50 probability.'],
  },
  'emoji-translator': {
    about: 'Emoji Translator replaces common keywords in text with relevant emoji icons.',
    formats: 'Input: Text. Output: Emoji-enhanced text.',
    limits: ['Replaces recognized key terms.'],
  },
  'ascii-art': {
    about: 'ASCII Art Generator converts text characters into stylized banner font art.',
    formats: 'Input: Text. Output: Monospace ASCII text.',
    limits: ['Best for short text headers.'],
  },
  'palindrome-checker': {
    about: 'Palindrome Checker tests if a word or phrase reads the same backward as forward, ignoring punctuation.',
    formats: 'Input: Text phrase. Output: Boolean result.',
    limits: ['Ignores spaces and punctuation.'],
  },
  'anagram-generator': {
    about: 'Anagram Generator reshuffles input letters to generate word anagram permutations.',
    formats: 'Input: Word. Output: Anagram list.',
    limits: ['Best for short words.'],
  },
  'random-quote': {
    about: 'Random Quote Generator displays inspirational quotes from famous authors.',
    formats: 'Output: Quote and author.',
    limits: ['Preloaded curated quote list.'],
  },
};
