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
    title: 'PDF to Word Converter – Convert PDF to DOCX Free | MiniTools',
    description: 'Convert PDF files to editable, searchable Word documents online — fast and secure. No signup, no watermarks. Get your DOCX in seconds, right in your browser.',
  },
  'word-to-pdf': {
    title: 'Word to PDF Converter – DOCX/DOC to PDF Free | MiniTools',
    description: 'Turn Word documents into PDFs instantly in your browser. Free, no signup, preserves formatting. Convert .docx and .doc to PDF with no limits.',
  },
  'image-to-pdf': {
    title: 'Image to PDF Converter – JPG/PNG to PDF Free | MiniTools',
    description: 'Combine JPG, PNG and other images into a single PDF document. Free, private, no signup. Download your PDF instantly — works on any device.',
  },
  'pdf-to-image': {
    title: 'PDF to Image Converter – Extract Pages as Images | MiniTools',
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
    title: 'Audio to MP3 Converter – WAV/OGG to MP3 Free | MiniTools',
    description: 'Convert audio files (WAV, OGG, M4A and more) to MP3 format. Free, no signup, private. Download your MP3 instantly — works in any browser.',
  },
  'video-to-mp4': {
    title: 'Video to MP4 Converter – MOV/AVI/WebM to MP4 Free | MiniTools',
    description: 'Convert video files to MP4 format quickly and privately. Free, no signup, no watermarks. Download your converted MP4 instantly in the browser.',
  },
  'video-downloader': {
    title: 'Video Downloader – Download Social Videos Online | MiniTools',
    description: 'Download videos from YouTube, Facebook, Instagram, TikTok, Dailymotion, Vimeo and more. Fast, free, and no registration required.',
  },
  'youtube-downloader': {
    title: 'YouTube Downloader – Save Videos as MP4 or MP3 | MiniTools',
    description: 'Download YouTube videos as MP4 or convert them to MP3. Free, no signup, multiple quality options. Process videos quickly with our online tool.',
  },
  'word-counter': {
    title: 'Word Counter – Count Words and Characters Free | MiniTools',
    description: 'Count words, characters, sentences and paragraphs instantly. Free, no signup, live results. Perfect for writers, students and social media.',
  },
  'character-counter': {
    title: 'Character Counter – Character & Word Count Online | MiniTools',
    description: 'Live character count with and without spaces, plus word count. Free, no signup, updates as you type. Ideal for tweets, bios and SEO titles.',
  },
  'case-converter': {
    title: 'Case Converter – Change Text Case Online Free | MiniTools',
    description: 'Convert text to UPPERCASE, lowercase, Title Case and Sentence case. Free, no signup, instant results. Copy and reuse the converted text.',
  },
  'text-reverser': {
    title: 'Text Reverser – Reverse Text, Words & Lines | MiniTools',
    description: 'Reverse text, reverse words, or flip lines instantly. Free, no signup, no installation. Great for fun, decoding and social media tricks.',
  },
  'lorem-ipsum': {
    title: 'Lorem Ipsum Generator – Free Dummy Text Online | MiniTools',
    description: 'Generate placeholder "lorem ipsum" text for designs, mockups and testing. Free, no signup, generates paragraphs or words in seconds.',
  },
  'text-to-slug': {
    title: 'Text to Slug – Convert Text to URL Slugs | MiniTools',
    description: 'Turn any text into a clean, URL-friendly slug. Free, no signup, instant. Perfect for blog posts, links and SEO-friendly URLs.',
  },
  'remove-duplicates': {
    title: 'Remove Duplicate Lines – Clean Up Text Lists | MiniTools',
    description: 'Remove duplicate lines from text instantly. Free, no signup, case-sensitive options. Clean up lists, data and code quickly in your browser.',
  },
  'sort-lines': {
    title: 'Sort Text Lines – Alphabetical A-Z / Z-A Online | MiniTools',
    description: 'Sort lines of text alphabetically A-Z or Z-A in seconds. Free, no signup, case and length options. Great for lists, data and code.',
  },
  'find-replace': {
    title: 'Find & Replace – Search and Replace Text | MiniTools',
    description: 'Find and replace text in any content. Free, no signup, supports regex, case matching and whole-word options. Results update live.',
  },
  'text-to-binary': {
    title: 'Text to Binary Converter – Text & Binary Code | MiniTools',
    description: 'Convert text to binary code, and decode binary back to text. Free, no signup, instant. Perfect for learning, coding and quick conversions.',
  },
  'roman-numerals': {
    title: 'Roman Numerals Converter – Roman to Arabic & Back | MiniTools',
    description: 'Convert between Roman numerals and Arabic numbers instantly. Free, no signup, no limits. Great for maths, history and study.',
  },
  'number-to-words': {
    title: 'Number to Words – Convert Numbers to English Text | MiniTools',
    description: 'Turn numbers into their English word equivalents. Free, no signup, instant. Perfect for cheques, contracts and writing numbers out.',
  },
  'markdown-to-html': {
    title: 'Markdown to HTML Converter – Instant MD to HTML | MiniTools',
    description: 'Convert Markdown text to formatted HTML instantly. Free, no signup, live preview. Perfect for bloggers, developers and writers.',
  },
  'typing-speed': {
    title: 'Typing Speed Test – Measure WPM & Accuracy | MiniTools',
    description: 'Test your typing speed in words per minute (WPM) and measure accuracy. Free, no signup. Compare your score and beat your personal best.',
  },
  'image-to-base64': {
    title: 'Image to Base64 – Encode an Image to a Data URL | MiniTools',
    description: 'Convert images to a Base64 string for embedding in HTML or CSS. Free, no signup, private. Upload and get the Base64 code instantly.',
  },
  'image-resizer': {
    title: 'Image Resizer – Resize JPG/PNG Online Free | MiniTools',
    description: 'Resize images to custom width and height online. Free, no signup, no watermarks. Fast and private — works for JPG, PNG and more.',
  },
  'image-compressor': {
    title: 'Image Compressor – Compress JPG & PNG Online | MiniTools',
    description: 'Compress image file sizes while keeping quality. Free, no signup, no watermarks. Reduce JPG and PNG sizes instantly in your browser.',
  },
  'color-picker': {
    title: 'Color Picker – Pick & Convert HEX, RGB, HSL | MiniTools',
    description: 'Pick colors from a visual palette and get HEX, RGB and HSL values. Free, no signup, instant. Perfect for design and web projects.',
  },
  'color-converter': {
    title: 'Color Converter – Convert HEX, RGB & HSL Online | MiniTools',
    description: 'Convert between HEX, RGB, HSL and HSV color formats instantly. Free, no signup. Copy ready-to-use values for CSS and design tools.',
  },
  'background-remover': {
    title: 'Background Remover – Remove Image Backgrounds | MiniTools',
    description: 'Preview the background remover demo: upload an image to try the current interface. Automatic background removal is planned but not fully implemented yet.',
  },
  'png-to-jpg': {
    title: 'PNG to JPG – Convert PNG to JPG Online Free | MiniTools',
    description: 'Convert PNG images to JPG format instantly. Free, no signup, private. Runs in your browser, adds a clean white background and downloads the JPG.',
  },
  'jpg-to-png': {
    title: 'JPG to PNG – Convert JPG to PNG Online Free | MiniTools',
    description: 'Convert JPG images to PNG format instantly. Free, no signup, private. Runs in your browser with no uploads — download your PNG right away.',
  },
  'image-to-text': {
    title: 'Image to Text OCR – Extract Text from Images | MiniTools',
    description: 'Extract text from images using OCR (tesseract.js). Free, no signup, fully private. Copy extracted text instantly — supports many languages.',
  },
  'base64-to-image': {
    title: 'Base64 to Image – Decode Base64 to an Image | MiniTools',
    description: 'Decode a Base64 string into an image file instantly. Free, no signup, private. Paste your data, preview the image, and download the decoded file.',
  },
  'gradient-generator': {
    title: 'CSS Gradient Generator – Preview & Download CSS | MiniTools',
    description: 'Generate, preview and download CSS gradients. Free, no signup. Pick colors and angle, copy the CSS code, or export the gradient as a PNG image.',
  },
  'basic-calculator': {
    title: 'Basic Calculator – Add, Subtract, Multiply, Divide | MiniTools',
    description: 'A simple online calculator for basic operations. Free, no signup, fast. Add, subtract, multiply and divide quickly in your browser.',
  },
  'percentage-calculator': {
    title: 'Percentage Calculator – Percentages Made Easy | MiniTools',
    description: 'Calculate percentages, increases and decreases fast. Free, no signup. Perfect for finance, maths and everyday discounts.',
  },
  'bmi-calculator': {
    title: 'BMI Calculator – Check Body Mass Index Online | MiniTools',
    description: 'Calculate your Body Mass Index instantly and see the standard category. Free, no signup, private. Enter height and weight to get your BMI result.',
  },
  'age-calculator': {
    title: 'Age Calculator – Calculate Exact Age Online Free | MiniTools',
    description: 'Calculate exact age in years, months and days. Free, no signup. Enter a date of birth and see your precise age instantly in the result boxes.',
  },
  'discount-calculator': {
    title: 'Discount Calculator – Price After Discount | MiniTools',
    description: 'Calculate the discounted price and savings amount. Free, no signup, instant. Enter original price and discount to see your deal.',
  },
  'tip-calculator': {
    title: 'Tip Calculator – Work Out Tip & Total Bill | MiniTools',
    description: 'Calculate tip amount and total bill easily, then split between any number of people. Free, no signup. Perfect for restaurants, deliveries and group dining.',
  },
  'loan-calculator': {
    title: 'Loan Calculator – Estimate Monthly EMI Online | MiniTools',
    description: 'Calculate Equated Monthly Installment (EMI) for loans. Free, no signup. Enter principal, rate and tenure for an instant payment plan.',
  },
  'scientific-calculator': {
    title: 'Scientific Calculator – Trig, Log & More | MiniTools',
    description: 'Advanced calculator with trigonometry, logarithms, exponents and more. Free, no signup. Works in your browser — no app to install.',
  },
  'gpa-calculator': {
    title: 'GPA Calculator – Calculate Your Grade Point Avg | MiniTools',
    description: 'Calculate weighted GPA from grades and credit hours. Free, no signup, instant. Supports letter grades and percentage scales.',
  },
  'compound-interest': {
    title: 'Compound Interest Calculator – Growth Over Time | MiniTools',
    description: 'Calculate compound interest and final investment amount. Free, no signup. Enter principal, rate, time and compounding frequency.',
  },
  'date-difference': {
    title: 'Date Difference Calculator – Days Between Dates | MiniTools',
    description: 'Calculate the number of days, weeks or months between two dates. Free, no signup, instant. Useful for tracking deadlines and events.',
  },
  'length-converter': {
    title: 'Length Converter – m, km, ft, inch & Mile | MiniTools',
    description: 'Convert length units — metres, kilometres, feet, inches, miles and more. Free, no signup, instant results. Accurate and easy to use.',
  },
  'weight-converter': {
    title: 'Weight Converter – kg, lb, oz & Ton Conversions | MiniTools',
    description: 'Convert weight units — kilograms, pounds, ounces, tons and more. Free, no signup, instant. Great for cooking and shipping.',
  },
  'temperature-converter': {
    title: 'Temperature Converter – °C, °F & Kelvin | MiniTools',
    description: 'Convert temperatures between Celsius, Fahrenheit and Kelvin instantly. Free, no signup. Perfect for weather reports, cooking and science work.',
  },
  'currency-converter': {
    title: 'Currency Converter – Live Exchange Rates | MiniTools',
    description: 'Convert between currencies — USD, EUR, PKR, GBP and more. Free, no signup. Live rates make international budgeting easy.',
  },
  'speed-converter': {
    title: 'Speed Converter – km/h, mph & m/s | MiniTools',
    description: 'Convert speed between km/h, mph, m/s and knots instantly. Free, no signup. Perfect for running, driving, sports and travel planning.',
  },
  'area-converter': {
    title: 'Area Converter – m², Acre & Hectare | MiniTools',
    description: 'Convert area between square meters, acres, hectares, square feet and more instantly. Free, no signup. Perfect for real estate, land and construction.',
  },
  'volume-converter': {
    title: 'Volume Converter – Liters, Gallons & More | MiniTools',
    description: 'Convert volume units — litres, millilitres, gallons and more. Free, no signup, instant. Perfect for cooking and chemistry.',
  },
  'time-converter': {
    title: 'Time Converter – Hours, Minutes & Seconds | MiniTools',
    description: 'Convert time units — seconds, minutes, hours, days and more. Free, no signup, instant. Great for scheduling and planning.',
  },
  'data-converter': {
    title: 'Data Storage Converter – KB, MB, GB & TB | MiniTools',
    description: 'Convert data storage units — KB, MB, GB, TB and more. Free, no signup, instant. Perfect for file sizes and storage planning.',
  },
  'number-base-converter': {
    title: 'Number Base Converter – Binary, Hex & More | MiniTools',
    description: 'Convert between Binary, Octal, Decimal and Hexadecimal. Free, no signup, instant. Great for programmers and computer science.',
  },
  'pressure-converter': {
    title: 'Pressure Converter – Pa, kPa, Bar & PSI | MiniTools',
    description: 'Convert pressure between Pa, kPa, bar, psi and more instantly. Free, no signup. Great for engineering, weather, hydraulics and diving.',
  },
  'energy-converter': {
    title: 'Energy Converter – Joules, kcal & BTU | MiniTools',
    description: 'Convert energy between Joules, kilocalories, BTU, kWh and more. Free, no signup, instant. Useful for nutrition, physics and engineering calculations.',
  },
  'time-zone-converter': {
    title: 'Time Zone Converter – Times Across the World | MiniTools',
    description: 'Convert date and time across world time zones. Free, no signup, instant. Perfect for remote work and international calls.',
  },
  'json-formatter': {
    title: 'JSON Formatter – Format & Validate JSON | MiniTools',
    description: 'Format and validate JSON data with syntax highlighting. Free, no signup, private. Pretty-print, minify and explore your JSON instantly.',
  },
  'json-to-csv': {
    title: 'JSON to CSV – Convert JSON to CSV Online Free | MiniTools',
    description: 'Convert JSON data to CSV format instantly. Free, no signup, private. Paste JSON arrays and get clean CSV ready for Excel, spreadsheets and data analysis.',
  },
  'base64-encoder': {
    title: 'Base64 Encoder/Decoder – Encode & Decode | MiniTools',
    description: 'Encode and decode Base64 text and strings instantly. Free, no signup, private. Perfect for moving binary data and embedding bytes in code.',
  },
  'url-encoder': {
    title: 'URL Encoder/Decoder – Encode & Decode URLs | MiniTools',
    description: 'Encode and decode URL strings instantly. Free, no signup, private. Perfect for query parameters, safe links and embedding URLs inside your code.',
  },
  'html-minifier': {
    title: 'HTML Minifier – Minify HTML Code Online Free | MiniTools',
    description: 'Minify HTML code to reduce file size and load faster. Free, no signup, private. Paste HTML and receive clean, compact markup ready to deploy.',
  },
  'css-minifier': {
    title: 'CSS Minifier – Minify CSS Code Online Free | MiniTools',
    description: 'Minify CSS code to reduce file size and improve page speed. Free, no signup, private. Paste your stylesheet and copy compact CSS directly.',
  },
  'js-minifier': {
    title: 'JS Minifier – Minify JavaScript Code Online Free | MiniTools',
    description: 'Minify JavaScript code to reduce file size and speed up load times. Free, no signup, private. Paste your code and download a smaller version instantly.',
  },
  'regex-tester': {
    title: 'Regex Tester – Test Regular Expressions | MiniTools',
    description: 'Test regular expression patterns with live results and explanations. Free, no signup. Great for developers and learning.',
  },
  'password-generator': {
    title: 'Password Generator – Strong Random Passwords | MiniTools',
    description: 'Generate strong, random passwords. Free, no signup, private. Choose length and character types — copied to clipboard instantly.',
  },
  'uuid-generator': {
    title: 'UUID Generator – Generate Random UUID v4 | MiniTools',
    description: 'Generate random UUID v4 identifiers instantly. Free, no signup, private. Perfect for database keys, unique records and IDs — bulk generate in one click.',
  },
  'hash-generator': {
    title: 'Hash Generator – MD5, SHA-1 & SHA-256 | MiniTools',
    description: 'Generate MD5, SHA-1 and SHA-256 hashes from text or files. Free, no signup, private. Runs fully in your browser for integrity checks.',
  },
  'qr-generator': {
    title: 'QR Code Generator – Create QR Codes Online Free | MiniTools',
    description: 'Generate QR codes from text or URLs instantly. Free, no signup. Create downloadable QR codes for links, WiFi, business cards and more.',
  },
  'qr-scanner': {
    title: 'QR Code Scanner – Scan with Your Camera | MiniTools',
    description: 'Scan QR codes using your device camera. Free, no signup, private. Decode text, URLs and more instantly — keep the code in the frame to scan.',
  },
  'html-preview': {
    title: 'HTML Preview & Test – Live HTML Rendering | MiniTools',
    description: 'Preview and render HTML code live in your browser. Free, no signup. Perfect for developers checking markup or beginners learning HTML page structure.',
  },
  'css-tester': {
    title: 'CSS Style Tester – Test Styles Live | MiniTools',
    description: 'Test CSS styles on sample elements instantly in your browser. Free, no signup. Perfect for prototyping buttons, boxes and layouts before adding code to a project.',
  },
  'js-playground': {
    title: 'JavaScript Playground – Run & Test JS Code | MiniTools',
    description: 'Run and test JavaScript online with live console output and errors. Free, no signup, private. Perfect for quick experiments and learning to code.',
  },
  'html-to-jsx': {
    title: 'HTML to JSX Converter – Convert HTML to JSX | MiniTools',
    description: 'Convert HTML to React JSX syntax instantly. Free, no signup. Paste markup and get clean JSX with camelCase attributes, ready for your components.',
  },
  'css-to-scss': {
    title: 'CSS to SCSS Converter – Modern SCSS Output | MiniTools',
    description: 'Convert CSS to SCSS syntax instantly. Free, no signup. Great for adopting Sass variables, nesting and modern styling workflows in your projects.',
  },
  'json-to-yaml': {
    title: 'JSON to YAML – Convert JSON to YAML Online Free | MiniTools',
    description: 'Convert JSON data to YAML format instantly. Free, no signup, private. Great for configuration files, CI pipelines, Kubernetes and other DevOps workflows.',
  },
  'yaml-to-json': {
    title: 'YAML to JSON – Convert YAML to JSON Online Free | MiniTools',
    description: 'Convert YAML data to JSON format instantly. Free, no signup, private. Paste YAML and copy valid JSON for APIs, configuration files and DevOps workflows.',
  },
  'random-number': {
    title: 'Random Number Generator – Pick a Random Number | MiniTools',
    description: 'Generate random numbers within a custom range instantly. Free, no signup. Great for games, contests, apps and picking random winners or choices.',
  },
  'dice-roller': {
    title: 'Dice Roller – Roll Virtual Dice (1-6) Online Free | MiniTools',
    description: 'Roll virtual dice and get results instantly. Free, no signup. Perfect for board games, RPGs and quick decisions, with a simple click.',
  },
  'coin-flip': {
    title: 'Coin Flip – Flip a Virtual Coin Online Free | MiniTools',
    description: 'Flip a virtual coin — Heads or Tails. Free, no signup, instant results. Great for fair decisions, tie-breakers, classroom games and settling small bets.',
  },
  'emoji-translator': {
    title: 'Emoji Translator – Turn Text into Emoji | MiniTools',
    description: 'Turn plain text into emoji-filled messages for fun and social media. Free, no signup, instant. Type simple words and see the emoji translation appear.',
  },
  'ascii-art': {
    title: 'ASCII Art Generator – Text to ASCII Art | MiniTools',
    description: 'Convert text into ASCII art suitable for terminals and creative projects. Free, no signup, instant. Copy the finished art wherever you need it.',
  },
  'palindrome-checker': {
    title: 'Palindrome Checker – Is It a Palindrome? | MiniTools',
    description: 'Check whether any word, phrase or sentence reads the same forwards and backwards. Free, no signup, instant result — great for word games and fun facts.',
  },
  'anagram-generator': {
    title: 'Anagram Generator – Rearrange Words & Letters | MiniTools',
    description: 'Generate anagrams from any word or phrase. Free, no signup, instant. Fun for puzzles, word games and creative writing prompts.',
  },
  'random-quote': {
    title: 'Random Quote Generator – Inspiring Quotes Daily | MiniTools',
    description: 'Get inspirational quotes from a built-in collection. Free, no signup, instant. Refresh for fresh quotes for your day — great for motivation, captions and writing prompts.',
  }
};