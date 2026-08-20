// src/data/toolMeta.js
// Data-driven, PER-TOOL SEO metadata.
//
// Each entry provides a UNIQUE, natural-language title and meta description so
// that no two tool pages share a templated description. This is the single
// source of truth consumed by:
//   - src/utils/seo/meta.js        (runtime <ToolHelmet> via react-helmet-async)
//   - scripts/prerender-static.mjs (static pre-rendered <head>)
// Both code paths call buildToolTitle / buildToolDescription, so the static
// HTML Google sees is byte-identical to what Helmet emits at runtime — React
// then reuses the tags via the `data-rh` markers instead of duplicating them.
//
// Adding a new tool? Add the tool to src/data/toolsData.js AND give it one
// entry here with a real, unique title + description. Never fall back to a
// single generic template — that is exactly what this file exists to prevent.
export const toolMeta = {
  'pdf-to-word': {
    title: 'PDF to Word Converter – Convert PDF to DOCX Online Free | MiniTools',
    description: 'Convert PDF files to editable, searchable Word documents online — fast and secure. No signup, no watermarks. Get your DOCX in seconds, right in your browser.',
  },
  'word-to-pdf': {
    title: 'Word to PDF Converter – Convert DOCX/DOC to PDF Online Free | MiniTools',
    description: 'Turn Word documents into PDFs instantly in your browser. Free, no signup, preserves formatting. Convert .docx and .doc to PDF with no limits.',
  },
  'image-to-pdf': {
    title: 'Image to PDF Converter – Convert JPG/PNG to PDF Online Free | MiniTools',
    description: 'Combine JPG, PNG and other images into a single PDF document. Free, private, no signup. Download your PDF instantly — works on any device.',
  },
  'pdf-to-image': {
    title: 'PDF to Image Converter – Extract PDF Pages as PNG/JPG Online Free | MiniTools',
    description: 'Extract PDF pages and save them as high-quality PNG or JPG images. Free, no signup, fully private. Download each page as an image in seconds.',
  },
  'merge-pdf': {
    title: 'Merge PDF – Combine PDF Files into One Online Free | MiniTools',
    description: 'Combine multiple PDF files into a single document. Drag to reorder, merge instantly — no signup, no watermarks. Fully private in your browser.',
  },
  'compress-pdf': {
    title: 'Compress PDF – Reduce PDF File Size Online Free | MiniTools',
    description: 'Shrink PDF file sizes while keeping text and images clear. Free, no signup, no watermarks. Compress PDFs instantly — your files stay private.',
  },
  'pdf-split': {
    title: 'Split PDF – Extract Pages from a PDF Online Free | MiniTools',
    description: 'Extract specific pages or split a PDF into separate files. Free, no signup, runs in your browser. Select page ranges and download instantly.',
  },
  'audio-to-mp3': {
    title: 'Audio to MP3 Converter – Convert WAV/OGG to MP3 Online Free | MiniTools',
    description: 'Convert audio files (WAV, OGG, M4A and more) to MP3 format. Free, no signup, private. Download your MP3 instantly — works in any browser.',
  },
  'video-to-mp4': {
    title: 'Video to MP4 Converter – Convert MOV/AVI/WebM to MP4 Online Free | MiniTools',
    description: 'Convert video files to MP4 format quickly and privately. Free, no signup, no watermarks. Download your converted MP4 instantly in the browser.',
  },
  'video-downloader': {
    title: 'Video Downloader – Download Social Media Videos Online Free | MiniTools',
    description: 'Download videos from YouTube, Facebook, Instagram, TikTok, Dailymotion, Vimeo and more. Fast, free, and no registration required.',
  },
  'youtube-downloader': {
    title: 'YouTube Downloader – Download YouTube Videos & MP3 Online Free | MiniTools',
    description: 'Download YouTube videos as MP4 or convert them to MP3. Free, no signup, multiple quality options. Process videos quickly with our online tool.',
  },
  'word-counter': {
    title: 'Word Counter – Count Words, Characters & Sentences Online Free | MiniTools',
    description: 'Count words, characters, sentences and paragraphs instantly. Free, no signup, live results. Perfect for writers, students and social media.',
  },
  'character-counter': {
    title: 'Character Counter – Count Characters With/Without Spaces Online | MiniTools',
    description: 'Live character count with and without spaces, plus word count. Free, no signup, updates as you type. Ideal for tweets, bios and SEO titles.',
  },
  'case-converter': {
    title: 'Case Converter – Change Text Case Online Free | MiniTools',
    description: 'Convert text to UPPERCASE, lowercase, Title Case and Sentence case. Free, no signup, instant results. Copy and reuse the converted text.',
  },
  'text-reverser': {
    title: 'Text Reverser – Reverse Text, Words & Lines Online Free | MiniTools',
    description: 'Reverse text, reverse words, or flip lines instantly. Free, no signup, no installation. Great for fun, decoding and social media tricks.',
  },
  'lorem-ipsum': {
    title: 'Lorem Ipsum Generator – Generate Dummy Text Online Free | MiniTools',
    description: 'Generate placeholder "lorem ipsum" text for designs, mockups and testing. Free, no signup, generates paragraphs or words in seconds.',
  },
  'text-to-slug': {
    title: 'Text to Slug – Convert Text to URL-Friendly Slug Online | MiniTools',
    description: 'Turn any text into a clean, URL-friendly slug. Free, no signup, instant. Perfect for blog posts, links and SEO-friendly URLs.',
  },
  'remove-duplicates': {
    title: 'Remove Duplicate Lines – Clean Up Repeated Text Online Free | MiniTools',
    description: 'Remove duplicate lines from text instantly. Free, no signup, case-sensitive options. Clean up lists, data and code quickly in your browser.',
  },
  'sort-lines': {
    title: 'Sort Text Lines – Sort Alphabetically A-Z or Z-A Online Free | MiniTools',
    description: 'Sort lines of text alphabetically A-Z or Z-A in seconds. Free, no signup, case and length options. Great for lists, data and code.',
  },
  'find-replace': {
    title: 'Find & Replace – Search and Replace Text Online Free | MiniTools',
    description: 'Find and replace text in any content. Free, no signup, supports regex, case matching and whole-word options. Results update live.',
  },
  'text-to-binary': {
    title: 'Text to Binary – Convert Text to Binary Code Online Free | MiniTools',
    description: 'Convert text to binary code, and decode binary back to text. Free, no signup, instant. Perfect for learning, coding and quick conversions.',
  },
  'roman-numerals': {
    title: 'Roman Numerals Converter – Roman to Arabic & Back Online Free | MiniTools',
    description: 'Convert between Roman numerals and Arabic numbers instantly. Free, no signup, no limits. Great for maths, history and study.',
  },
  'number-to-words': {
    title: 'Number to Words – Convert Numbers to English Words Online Free | MiniTools',
    description: 'Turn numbers into their English word equivalents. Free, no signup, instant. Perfect for cheques, contracts and writing numbers out.',
  },
  'markdown-to-html': {
    title: 'Markdown to HTML – Convert Markdown to HTML Online Free | MiniTools',
    description: 'Convert Markdown text to formatted HTML instantly. Free, no signup, live preview. Perfect for bloggers, developers and writers.',
  },
  'typing-speed': {
    title: 'Typing Speed Test – Measure WPM & Accuracy Online Free | MiniTools',
    description: 'Test your typing speed in words per minute (WPM) and measure accuracy. Free, no signup. Compare your score and beat your personal best.',
  },
  'image-to-base64': {
    title: 'Image to Base64 – Convert Image to Base64 String Online Free | MiniTools',
    description: 'Convert images to a Base64 string for embedding in HTML or CSS. Free, no signup, private. Upload and get the Base64 code instantly.',
  },
  'image-resizer': {
    title: 'Image Resizer – Resize Image Dimensions Online Free | MiniTools',
    description: 'Resize images to custom width and height online. Free, no signup, no watermarks. Fast and private — works for JPG, PNG and more.',
  },
  'image-compressor': {
    title: 'Image Compressor – Compress JPG/PNG Images Online Free | MiniTools',
    description: 'Compress image file sizes while keeping quality. Free, no signup, no watermarks. Reduce JPG and PNG sizes instantly in your browser.',
  },
  'color-picker': {
    title: 'Color Picker – Pick Colors from a Visual Palette Online Free | MiniTools',
    description: 'Pick colors from a visual palette and get HEX, RGB and HSL values. Free, no signup, instant. Perfect for design and web projects.',
  },
  'color-converter': {
    title: 'Color Converter – Convert HEX, RGB & HSL Online Free | MiniTools',
    description: 'Convert between HEX, RGB, HSL and HSV color formats. Free, no signup, instant. Copy exact values for design and CSS.',
  },
  'background-remover': {
    title: 'Background Remover – Remove Image Background Online Free | MiniTools',
    description: 'Remove backgrounds from images automatically. Free, no signup, private. Download transparent PNG results in seconds.',
  },
  'png-to-jpg': {
    title: 'PNG to JPG – Convert PNG to JPG Online Free | MiniTools',
    description: 'Convert PNG images to JPG format quickly. Free, no signup, private. Batch convert and download high-quality JPG images.',
  },
  'jpg-to-png': {
    title: 'JPG to PNG – Convert JPG to PNG Online Free | MiniTools',
    description: 'Convert JPG images to PNG format with transparency support. Free, no signup, private. Convert and download instantly.',
  },
  'image-to-text': {
    title: 'Image to Text OCR – Extract Text from Images Online Free | MiniTools',
    description: 'Extract text from images using OCR (tesseract.js). Free, no signup, fully private. Copy extracted text instantly — supports many languages.',
  },
  'base64-to-image': {
    title: 'Base64 to Image – Decode Base64 to an Image Online Free | MiniTools',
    description: 'Decode a Base64 string into an image file. Free, no signup, private. Paste, preview and download the image instantly.',
  },
  'gradient-generator': {
    title: 'CSS Gradient Generator – Create & Download Gradients Online Free | MiniTools',
    description: 'Generate, preview and download CSS gradients. Free, no signup. Pick colors, angle and export CSS or PNG.',
  },
  'basic-calculator': {
    title: 'Basic Calculator – Add, Subtract, Multiply, Divide Online | MiniTools',
    description: 'A simple online calculator for basic operations. Free, no signup, fast. Add, subtract, multiply and divide quickly in your browser.',
  },
  'percentage-calculator': {
    title: 'Percentage Calculator – Calculate Percentages Online Free | MiniTools',
    description: 'Calculate percentages, increases and decreases fast. Free, no signup. Perfect for finance, maths and everyday discounts.',
  },
  'bmi-calculator': {
    title: 'BMI Calculator – Calculate Body Mass Index Online Free | MiniTools',
    description: 'Calculate your Body Mass Index (BMI) instantly. Free, no signup. Enter weight and height for a quick health check.',
  },
  'age-calculator': {
    title: 'Age Calculator – Calculate Exact Age Online Free | MiniTools',
    description: 'Calculate exact age in years, months and days. Free, no signup. Enter a date of birth for an accurate result.',
  },
  'discount-calculator': {
    title: 'Discount Calculator – Calculate Price After Discount Online | MiniTools',
    description: 'Calculate the discounted price and savings amount. Free, no signup, instant. Enter original price and discount to see your deal.',
  },
  'tip-calculator': {
    title: 'Tip Calculator – Calculate Tip & Total Bill Online Free | MiniTools',
    description: 'Calculate tip amount and total bill. Free, no signup. Split bills between any number of people easily.',
  },
  'loan-calculator': {
    title: 'Loan Calculator – Calculate EMI for Loans Online Free | MiniTools',
    description: 'Calculate Equated Monthly Installment (EMI) for loans. Free, no signup. Enter principal, rate and tenure for an instant payment plan.',
  },
  'scientific-calculator': {
    title: 'Scientific Calculator – Advanced Calculator with Trig & Log Online | MiniTools',
    description: 'Advanced calculator with trigonometry, logarithms, exponents and more. Free, no signup. Works in your browser — no app to install.',
  },
  'gpa-calculator': {
    title: 'GPA Calculator – Calculate Weighted GPA Online Free | MiniTools',
    description: 'Calculate weighted GPA from grades and credit hours. Free, no signup, instant. Supports letter grades and percentage scales.',
  },
  'compound-interest': {
    title: 'Compound Interest Calculator – Calculate Investment Growth Online | MiniTools',
    description: 'Calculate compound interest and final investment amount. Free, no signup. Enter principal, rate, time and compounding frequency.',
  },
  'date-difference': {
    title: 'Date Difference Calculator – Days Between Dates Online Free | MiniTools',
    description: 'Calculate the number of days, weeks or months between two dates. Free, no signup, instant. Useful for tracking deadlines and events.',
  },
  'length-converter': {
    title: 'Length Converter – Convert m, km, ft, inch, mile Online Free | MiniTools',
    description: 'Convert length units — metres, kilometres, feet, inches, miles and more. Free, no signup, instant results. Accurate and easy to use.',
  },
  'weight-converter': {
    title: 'Weight Converter – Convert kg, lb, oz, ton Online Free | MiniTools',
    description: 'Convert weight units — kilograms, pounds, ounces, tons and more. Free, no signup, instant. Great for cooking and shipping.',
  },
  'temperature-converter': {
    title: 'Temperature Converter – Convert °C, °F & Kelvin Online Free | MiniTools',
    description: 'Convert between Celsius, Fahrenheit and Kelvin. Free, no signup, instant. Perfect for cooking, weather and science.',
  },
  'currency-converter': {
    title: 'Currency Converter – Convert USD, EUR & More Online Free | MiniTools',
    description: 'Convert between currencies — USD, EUR, PKR, GBP and more. Free, no signup. Live rates make international budgeting easy.',
  },
  'speed-converter': {
    title: 'Speed Converter – Convert km/h, mph, m/s Online Free | MiniTools',
    description: 'Convert speed units — km/h, mph, m/s and more. Free, no signup, instant. Ideal for driving, sports and physics.',
  },
  'area-converter': {
    title: 'Area Converter – Convert m², acre, hectare Online Free | MiniTools',
    description: 'Convert area units — square metres, acres, hectares and more. Free, no signup, instant. Great for land and property.',
  },
  'volume-converter': {
    title: 'Volume Converter – Convert L, mL, gallon Online Free | MiniTools',
    description: 'Convert volume units — litres, millilitres, gallons and more. Free, no signup, instant. Perfect for cooking and chemistry.',
  },
  'time-converter': {
    title: 'Time Converter – Convert Hours, Minutes, Seconds Online Free | MiniTools',
    description: 'Convert time units — seconds, minutes, hours, days and more. Free, no signup, instant. Great for scheduling and planning.',
  },
  'data-converter': {
    title: 'Data Storage Converter – Convert KB, MB, GB, TB Online Free | MiniTools',
    description: 'Convert data storage units — KB, MB, GB, TB and more. Free, no signup, instant. Perfect for file sizes and storage planning.',
  },
  'number-base-converter': {
    title: 'Number Base Converter – Binary, Octal, Decimal, Hex Online Free | MiniTools',
    description: 'Convert between Binary, Octal, Decimal and Hexadecimal. Free, no signup, instant. Great for programmers and computer science.',
  },
  'pressure-converter': {
    title: 'Pressure Converter – Convert Pa, kPa, bar, psi Online Free | MiniTools',
    description: 'Convert pressure units — Pascals, kPa, bar, atm and psi. Free, no signup, instant. Ideal for engineering and science.',
  },
  'energy-converter': {
    title: 'Energy Converter – Convert Joules, kcal, BTU Online Free | MiniTools',
    description: 'Convert energy units — Joules, calories, BTU and kWh. Free, no signup, instant. Perfect for physics and nutrition.',
  },
  'time-zone-converter': {
    title: 'Time Zone Converter – Convert Date & Time Across Zones Online | MiniTools',
    description: 'Convert date and time across world time zones. Free, no signup, instant. Perfect for remote work and international calls.',
  },
  'json-formatter': {
    title: 'JSON Formatter – Format & Validate JSON Online Free | MiniTools',
    description: 'Format and validate JSON data with syntax highlighting. Free, no signup, private. Pretty-print, minify and explore your JSON instantly.',
  },
  'json-to-csv': {
    title: 'JSON to CSV – Convert JSON to CSV Online Free | MiniTools',
    description: 'Convert JSON data to CSV format. Free, no signup, instant. Great for spreadsheets and data exports.',
  },
  'base64-encoder': {
    title: 'Base64 Encoder/Decoder – Encode & Decode Base64 Online Free | MiniTools',
    description: 'Encode text to Base64 or decode Base64 back to text. Free, no signup, private. Instant, no data leaves your browser.',
  },
  'url-encoder': {
    title: 'URL Encoder/Decoder – Encode & Decode URLs Online Free | MiniTools',
    description: 'Encode and decode URL strings safely. Free, no signup, instant. Perfect for APIs, links and form data.',
  },
  'html-minifier': {
    title: 'HTML Minifier – Minify HTML Code Online Free | MiniTools',
    description: 'Minify HTML code to reduce file size. Free, no signup, private. Compress HTML instantly in your browser.',
  },
  'css-minifier': {
    title: 'CSS Minifier – Minify CSS Code Online Free | MiniTools',
    description: 'Minify CSS code to save bandwidth. Free, no signup, instant. Clean, compressed stylesheets in seconds.',
  },
  'js-minifier': {
    title: 'JS Minifier – Minify JavaScript Code Online Free | MiniTools',
    description: 'Minify JavaScript code to reduce file size. Free, no signup, private. Compress and tidy your JS instantly.',
  },
  'regex-tester': {
    title: 'Regex Tester – Test Regular Expressions Online Free | MiniTools',
    description: 'Test regular expression patterns with live results and explanations. Free, no signup. Great for developers and learning.',
  },
  'password-generator': {
    title: 'Password Generator – Generate Strong Random Passwords Free | MiniTools',
    description: 'Generate strong, random passwords. Free, no signup, private. Choose length and character types — copied to clipboard instantly.',
  },
  'uuid-generator': {
    title: 'UUID Generator – Generate Random UUID v4 Online Free | MiniTools',
    description: 'Generate random UUID v4 strings. Free, no signup, instant. Great for development, databases and testing.',
  },
  'hash-generator': {
    title: 'Hash Generator – Generate MD5, SHA-1 & SHA-256 Online Free | MiniTools',
    description: 'Generate MD5, SHA-1 and SHA-256 hashes from text. Free, no signup, private. Perfect for checksums and data integrity.',
  },
  'qr-generator': {
    title: 'QR Code Generator – Create QR Codes Online Free | MiniTools',
    description: 'Generate QR codes from text or URLs. Free, no signup, private. Download PNG QR codes instantly — no watermarks.',
  },
  'qr-scanner': {
    title: 'QR Code Scanner – Scan QR Codes with Your Camera Online Free | MiniTools',
    description: 'Scan QR codes using your device camera. Free, no signup, private. Decode text, URLs and more instantly in the browser.',
  },
  'html-preview': {
    title: 'HTML Preview & Test – Live HTML Preview Online Free | MiniTools',
    description: 'Preview and test HTML code live. Free, no signup, instant rendering. Perfect for developers and learning.',
  },
  'css-tester': {
    title: 'CSS Style Tester – Test CSS Styles on Sample Elements Online | MiniTools',
    description: 'Test CSS styles on sample elements instantly. Free, no signup. Great for prototyping and debugging.',
  },
  'js-playground': {
    title: 'JavaScript Playground – Run & Test JavaScript Online Free | MiniTools',
    description: 'Run and test JavaScript code online. Free, no signup, private. See console output instantly in your browser.',
  },
  'html-to-jsx': {
    title: 'HTML to JSX Converter – Convert HTML to React JSX Online Free | MiniTools',
    description: 'Convert HTML code to React JSX syntax. Free, no signup, instant. Great for React developers.',
  },
  'css-to-scss': {
    title: 'CSS to SCSS Converter – Convert CSS to SCSS Online Free | MiniTools',
    description: 'Convert CSS to SCSS syntax. Free, no signup, instant. Perfect for Sass and modern styling workflows.',
  },
  'json-to-yaml': {
    title: 'JSON to YAML – Convert JSON to YAML Online Free | MiniTools',
    description: 'Convert JSON data to YAML format. Free, no signup, instant. Great for configuration files and DevOps.',
  },
  'yaml-to-json': {
    title: 'YAML to JSON – Convert YAML to JSON Online Free | MiniTools',
    description: 'Convert YAML data to JSON format. Free, no signup, instant. Perfect for APIs and configuration.',
  },
  'random-number': {
    title: 'Random Number Generator – Generate Random Numbers in a Range Free | MiniTools',
    description: 'Generate random numbers within a custom range. Free, no signup, instant. Great for games, apps and random selection.',
  },
  'dice-roller': {
    title: 'Dice Roller – Roll Virtual Dice (1-6) Online Free | MiniTools',
    description: 'Roll virtual dice online — results from 1 to 6. Free, no signup, instant. Perfect for board games and decision making.',
  },
  'coin-flip': {
    title: 'Coin Flip – Flip a Virtual Coin Online Free | MiniTools',
    description: 'Flip a virtual coin — Heads or Tails. Free, no signup, instant. Great for random decisions and games.',
  },
  'emoji-translator': {
    title: 'Emoji Translator – Translate Text to Emoji Online Free | MiniTools',
    description: 'Translate text into emoji. Free, no signup, instant. Fun for social media messages and creative writing.',
  },
  'ascii-art': {
    title: 'ASCII Art Generator – Convert Text to ASCII Art Online Free | MiniTools',
    description: 'Convert text into ASCII art. Free, no signup, instant. Perfect for terminal output and creative projects.',
  },
  'palindrome-checker': {
    title: 'Palindrome Checker – Check if Text is a Palindrome Online Free | MiniTools',
    description: 'Check whether text is a palindrome. Free, no signup, instant. Great for word games and learning.',
  },
  'anagram-generator': {
    title: 'Anagram Generator – Generate Anagrams from Words Online Free | MiniTools',
    description: 'Generate anagrams from any word or phrase. Free, no signup, instant. Fun for puzzles and creative writing.',
  },
  'random-quote': {
    title: 'Random Quote Generator – Inspirational Quotes Online Free | MiniTools',
    description: 'Get random inspirational quotes. Free, no signup, instant. Refresh for fresh motivation daily.',
  }
};