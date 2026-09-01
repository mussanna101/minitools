// src/data/toolFAQs.js
// Per-tool frequently-asked questions consumed by src/utils/seo/schema.js
// (buildFAQs) to render each tool's FAQPage JSON-LD and the runtime FAQ
// <details>. Every entry is a genuine, tool-specific question, so the content
// and structured data always match.
export const toolFAQs = {
  'pdf-to-word': [
    { q: 'How does PDF to Word conversion work?', a: 'The PDF is opened in the browser with pdf.js, its text layer is extracted in reading order and written into a genuine .docx (Office Open XML) file that Word, Google Docs and LibreOffice can open and edit — all locally.' },
    { q: 'What about scanned PDFs?', a: 'Scanned PDFs contain no text layer, so little can be extracted. Run OCR on the scan first, then convert the text-searchable PDF.' },
  ],
  'word-to-pdf': [
    { q: 'How is the Word document turned into PDF?', a: 'DOCX is a zip of XML; the converter unpacks it in the browser, rebuilds paragraphs and saves a searchable PDF with pdf-lib — nothing is uploaded to a server.' },
    { q: 'Can I convert old .doc files?', a: '.doc binary files are not reliably parsed. Save the document as .docx in Word first, then convert that file.' },
  ],
  'image-to-pdf': [
    { q: 'How do I arrange multiple images?', a: 'Upload images in the order you want them to appear. Each image becomes one full PDF page in that sequence.' },
    { q: 'Which image formats are supported?', a: 'JPG and PNG are supported directly. To use WebP, GIF or BMP, convert them to JPG or PNG first.' },
  ],
  'pdf-to-image': [
    { q: 'What format do the converted pages come in?', a: 'Each page is rendered to a PNG image at screen resolution and bundled into a ZIP archive so you can download all pages at once.' },
    { q: 'Are the images editable?', a: 'No — pages are rasterised into flat images, so text in them is not searchable and cannot be edited as text.' },
  ],
  'merge-pdf': [
    { q: 'How many PDFs can I merge at once?', a: 'There is no hard limit. Add as many files as you need in the order you want; they are concatenated page-by-page with pdf-lib, entirely in the browser.' },
    { q: 'Can I merge password-protected PDFs?', a: 'No. Encrypted files cannot be read by the merger, so unlock the PDF with its password in a PDF reader first, then merge the unlocked copy.' },
  ],
  'compress-pdf': [
    { q: 'How much can I shrink my PDF?', a: 'It depends on how the PDF was produced. Files with redundant objects often shrink noticeably; already-optimised image-heavy PDFs may barely change.' },
    { q: 'Does compression reduce quality?', a: 'No. The tool rebuilds the file structure with object streams but does not alter image data or text, so the content stays identical — lossless tidy-up only.' },
  ],
  'pdf-split': [
    { q: 'How do I write the page selection?', a: 'Use comma-separated numbers and ranges, e.g. 1, 3, 5-8 keeps page 1, page 3 and pages 5 through 8 into a new PDF.' },
    { q: 'Can I split into single-page files?', a: 'Not in one run — the selected pages are combined into one new PDF. Run the tool again with one page number at a time to split them out.' },
  ],
  'audio-to-mp3': [
    { q: 'Which audio formats can I convert from?', a: 'Anything your browser can decode — typically WAV, OGG, M4A and MP3 itself. The audio is decoded locally and re-encoded to MP3 with lamejs, all inside the tab.' },
    { q: 'How long does conversion take?', a: 'Encoding runs faster than real time, so a 10-minute recording usually converts in well under a minute. Longer files take proportionally more time.' },
  ],
  'video-to-mp4': [
    { q: 'Why does conversion take as long as the video?', a: 'The video is re-recorded through a canvas in real time using the browser MediaRecorder, so a 3-minute clip takes about 3 minutes. Keep the tab in the foreground while it runs.' },
    { q: 'Do I get an MP4 or a WebM file?', a: 'It depends on your browser: Chromium-based browsers typically record MP4-compatible output, while Firefox usually produces WebM.' },
  ],
  'video-downloader': [
    { q: 'Which websites are supported?', a: 'Facebook, Instagram, TikTok, Dailymotion, Vimeo and other sites handled by the yt-dlp/ffmpeg backend. Paste a public link and the tool lists the formats that genuinely exist for that URL.' },
    { q: 'Is it legal to download videos?', a: 'Only download videos you own or have explicit permission to download. Downloading copyrighted content without permission violates platform Terms of Service and copyright law. This tool is intended exclusively for your own uploads and content you have the right to save.' },
    { q: 'What are the legal risks?', a: 'Downloading without permission is copyright infringement. Respect platform terms: YouTube, TikTok, Instagram and Facebook all prohibit automated downloads of their content. Always verify you have rights before downloading.' },
  ],
  'youtube-downloader': [
    { q: 'Why do some YouTube videos fail to download?', a: 'Availability depends on what YouTube actually serves: age-restricted, private, region-locked or DRM-protected videos cannot be fetched.' },
    { q: 'Can I extract just the audio as MP3?', a: 'Yes — when the video has an audio-only stream, choose the MP3 conversion option. Conversion is handled by the backend\'s ffmpeg pipeline.' },
    { q: 'Is downloading YouTube videos legal?', a: 'No — YouTube\'s Terms of Service prohibit automated downloading, even of content you created. Download only for legitimate backup purposes if you own the content outright. Downloading others\' videos for redistribution is copyright infringement.' },
  ],
  // ===== TEXT =====
  'word-counter': [
    { q: 'How are words counted?', a: 'By whitespace: any run of characters separated by spaces, tabs or line breaks counts as one word. Hyphenated compounds count as a single word.' },
    { q: 'Does the counter open document files?', a: 'It analyses text you paste — it does not open files such as PDF or DOCX. Paste the text content into the box to count it.' },
  ],
  'character-counter': [
    { q: 'Are spaces counted?', a: 'Both totals are shown side by side — one includes spaces and line breaks, the other counts only characters. Use the count matching your limit.' },
    { q: 'Is there a text-size limit?', a: 'Practically none — paste as much as you like and counts update live as you type or paste.' },
  ],
  'case-converter': [
    { q: 'Which case styles are supported?', a: 'UPPERCASE, lowercase, Title Case and Sentence case. Each button converts the whole text in place and you can switch freely.' },
    { q: 'Will it fix acronyms correctly?', a: 'Not always — Title Case capitalises every word mechanically and Sentence case may lower acronyms mid-sentence.' },
  ],
  'text-reverser': [
    { q: 'What do the reverse modes do?', a: 'Character mode mirrors text letter-by-letter, word mode reverses the order of words, and line mode flips the order of lines — pick the level you need.' },
    { q: 'Why do my emoji break in character mode?', a: 'Emoji are stored as multi-byte sequences; character-level reversal splits them apart. Use word or line mode when your text contains emoji.' },
  ],
  'lorem-ipsum': [
    { q: 'What is lorem ipsum for?', a: 'Placeholder copy for wireframes, mock-ups and CMS testing — it looks like reading text so you can judge layout and typography before the actual content exists.' },
    { q: 'Can I control the length?', a: 'Yes — set the number of paragraphs and copy the result. Sentence length within each paragraph is fixed.' },
  ],
  'text-to-slug': [
    { q: 'What makes a good URL slug?', a: 'Short, lowercase, hyphen-separated words with no special characters or stop-word padding — exactly what this tool produces.' },
    { q: 'How are accents handled?', a: 'Accented Latin letters are transliterated (e to e). Scripts without Latin equivalents like Chinese or Arabic are dropped; review slugs for those languages.' },
  ],
  'remove-duplicates': [
    { q: 'Does it keep the original order?', a: 'Yes — the first occurrence of each line stays in place and later duplicates are removed. The tool does not sort the output.' },
    { q: 'Is matching case-sensitive?', a: 'Yes — differences in capitalisation, spacing or punctuation count as different lines. Normalise first if you need case-insensitive de-duplication.' },
  ],
  'sort-lines': [
    { q: 'Can it sort numbers by value?', a: 'No — sorting is alphabetical character order, so 10 sorts before 9. Pad numbers to equal width first for numeric ordering.' },
    { q: 'Is sorting case-sensitive?', a: 'Yes, under ASCII ordering capitals group before lowercase ones. Normalise the case first if you want a mixed list interleaved.' },
  ],
  'find-replace': [
    { q: 'Can I use regular expressions?', a: 'No — this tool does plain-text matching, ideal for quick word swaps and separator fixes. Use a code editor with regex for pattern-based editing.' },
    { q: 'Can I replace only the first occurrence?', a: 'Not currently — every occurrence of the search text is replaced in one pass.' },
  ],
  'text-to-binary': [
    { q: 'How is each character encoded?', a: 'Every character maps to its 8-bit binary byte value, separated for readability. Pasting those groups back converts binary to text again.' },
    { q: 'Why does my binary decode incorrectly?', a: 'Decoding expects groups of 8 bits per character. If groups differ in size or are not cleanly separated, the output will be wrong.' },
  ],
  'roman-numerals': [
    { q: 'What is the largest number I can convert?', a: 'Standard notation (I, V, X, L, C, D, M) handles numbers into the thousands. Classical Roman numerals have no zero and no negative numbers.' },
    { q: 'Why does my input show as invalid?', a: 'The tool validates Roman numeral form — letters like IL or VX are not valid, and lowercase or foreign characters are rejected.' },
  ],
  'number-to-words': [
    { q: 'How large a number can it spell out?', a: 'It supports integers up to the trillions — enough for cheques, invoices and legal documents.' },
    { q: 'Can it spell decimal amounts?', a: 'Yes — the integer part is spelled normally and digits after the point are spelled one by one. Currency phrasing is not added automatically.' },
  ],
  'markdown-to-html': [
    { q: 'Which Markdown features are supported?', a: 'Headings, bold and italic emphasis, links, lists, code blocks and inline code — the CommonMark-style core.' },
    { q: 'Is the output a full page?', a: 'No — it is an HTML fragment ready to drop into an existing page, CMS field or email builder.' },
  ],
    'typing-speed': [
    { q: 'How is WPM calculated?', a: 'Words per minute uses the five-characters-per-word convention, adjusted by accuracy, measured from the moment you start typing.' },
    { q: 'Is my history saved?', a: 'No — each session is independent and nothing is stored. Reload any time to start fresh.' },
  ],
  // ===== CALCULATORS =====
  'basic-calculator': [
    { q: 'Does it support more than the four operations?', a: 'No — this calculator is intentionally simple: addition, subtraction, multiplication and division. For trigonometry and powers, use the scientific calculator tool.' },
    { q: 'Do I need to install anything?', a: 'No. It runs entirely in your browser with no app, extension and no signup — open the page and calculate.' },
  ],
  'percentage-calculator': [
    { q: 'Which questions does it answer?', a: 'Three: what is X% of Y, what percentage A is of B, and percentage increase or decrease between two values. Pick the mode and enter two numbers.' },
    { q: 'Why does a decrease show a minus sign?', a: 'Change is signed: a fall from 200 to 150 is −25%, while the same rise is +25%. The sign shows the direction of the change.' },
  ],
  'bmi-calculator': [
    { q: 'Which units can I use?', a: 'Either metric (cm/kg) or imperial (in/lbs). Enter height and weight and the BMI is computed instantly.' },
    { q: 'Is BMI accurate for athletes?', a: 'Not always. BMI does not distinguish muscle from fat, so muscular people can score as overweight. Treat it as a rough screening number.' },
  ],
  'age-calculator': [
    { q: 'Can I calculate age at a future date?', a: 'Yes — set the reference date to answer “how old will I be on 1 January 2030?” as easily as today’s age.' },
    { q: 'Why does the result include days?', a: 'Months have different lengths, so the tool adds the exact remainder in days for a precise answer.' },
  ],
  'discount-calculator': [
    { q: 'Does it handle stacked discounts?', a: 'Not in one step. For “20% off then 10% off”, run the tool twice: apply the first discount, then the second on the reduced price.' },
    { q: 'Does it include sales tax?', a: 'No — results are pure discount maths on the price you enter. Add tax separately if you need the final price.' },
  ],
  'tip-calculator': [
    { q: 'What tip percentage should I use?', a: 'That depends on local custom and service quality — 10–20% is common in restaurants. Pick any percentage and the tip and total appear instantly.' },
    { q: 'Can it split the bill between friends?', a: 'Not directly — it calculates the tip and total for the whole bill. Divide the totals by the number of people yourself.' },
  ],
  'loan-calculator': [
    { q: 'How is the monthly payment calculated?', a: 'With the standard amortisation formula: equal monthly payments over the term at the rate you enter, combining principal repayment and interest.' },
    { q: 'Does it include fees, insurance or taxes?', a: 'No — it models a clean fixed-rate loan. Lenders often add costs that raise the real payment, so treat the result as an estimate.' },
  ],
  'scientific-calculator': [
    { q: 'Which functions are included?', a: 'Trigonometric functions, logarithms, powers, roots and constants — the set for school and university coursework.' },
    { q: 'Why might my trig result look wrong?', a: 'Check the angle mode first: input is read as degrees or radians depending on the selected mode, and mixing them up is the most common cause of surprising results.' },
  ],
  'gpa-calculator': [
    { q: 'Which GPA scale does it use?', a: 'The standard 4.0 scale — each course’s grade maps to points multiplied by credit hours. Weighted honours/AP scales are not applied.' },
    { q: 'Is my data stored?', a: 'No. Your course list exists only on this page while you use it — nothing is uploaded or saved between visits.' },
  ],
  'compound-interest': [
    { q: 'What is the difference from simple interest?', a: 'Simple interest grows linearly on the principal only; compound interest earns on the growing balance too. The gap widens over time.' },
    { q: 'Can I add monthly contributions?', a: 'Not here — it models a single deposit compounding over time. For recurring deposits, use a savings calculator that supports them.' },
  ],
    'date-difference': [
    { q: 'Does it count business days only?', a: 'No — it counts calendar days, weeks, months and years between two dates. For weekdays-only, use a business-day calculator instead.' },
    { q: 'Does date order matter?', a: 'No — the tool takes the absolute difference, so you can enter the dates in either order and get the same result.' },
  ],
  // ===== CONVERTERS =====
  'length-converter': [
    { q: 'Which units are supported?', a: 'Metric lengths (mm, cm, m, km) and imperial lengths (inches, feet, yards, miles). Enter a value in any unit and read the others instantly.' },
    { q: 'How do I get feet and inches?', a: 'Convert to inches and divide by twelve yourself — the tool shows decimal feet, not feet-and-inches notation.' },
  ],
  'weight-converter': [
    { q: 'Can I convert stones to kilograms?', a: 'Yes — stones join kg, grams, mg, pounds and ounces. Note the result is decimal kilograms, not stone-plus-pounds notation.' },
    { q: 'Why so many decimal places?', a: 'The tool shows precise converted values so you can round to whatever precision your context needs — cooking, shipping, labs.' },
  ],
  'temperature-converter': [
    { q: 'How do I convert Celsius to Fahrenheit?', a: 'Exact is ×9/5 + 32. A quick approximation is to double the Celsius value and add 30 for an everyday estimate.' },
    { q: 'Can I convert Kelvin?', a: 'Yes — Kelvin joins Celsius and Fahrenheit, covering science homework and thermodynamics. Absolute zero is the floor of all three scales.' },
  ],
  'currency-converter': [
    { q: 'Where do exchange rates come from?', a: 'Current mid-market rates from the ExchangeRate-API service, fetched when you load or refresh the tool. The conversion maths runs locally in your browser.' },
    { q: 'Will my bank give the same rate?', a: 'Usually not — banks and card services add margins and fees on top of mid-market rates. Treat results as a reference point, not a guaranteed price.' },
  ],
  'speed-converter': [
    { q: 'Which speed units are included?', a: 'Km/h, mph, m/s and knots — type a value in any unit and read the equivalents for speed limits, treadmills and wind reports.' },
    { q: 'Can I convert running pace like min/km?', a: 'No — pace is time per distance. Convert the speed, then derive pace from the result if needed.' },
  ],
  'area-converter': [
    { q: 'Which land units are supported?', a: 'Square metres, square kilometres, hectares, acres, square feet and square miles — the units in most property listings and land documents.' },
    { q: 'How do I convert regional units like bigha?', a: 'Regional units vary by country; not built in. Convert the local unit to hectares or acres first, then use this tool.' },
  ],
  'volume-converter': [
    { q: 'Does it cover US and UK units?', a: 'Yes — litres, millilitres, US gallons, cups, Imperial pints and fluid ounces. Check which system your source uses, since US and Imperial gallons differ.' },
    { q: 'Can I use it for cooking?', a: 'Yes — cups, tablespoons and millilitres cover most recipes. Cup sizes are US customary; for baking precision, weigh ingredients.' },
  ],
  'time-converter': [
    { q: 'What durations can I convert?', a: 'Seconds, minutes, hours, days, weeks and beyond — for example a film runtime into minutes or a work week into hours.' },
    { q: 'Does it handle months and years exactly?', a: 'It uses approximate lengths since months vary. For calendar-precise date maths, use the date difference tool instead.' },
  ],
  'data-converter': [
    { q: 'What units does it convert?', a: 'Bytes, kilobytes, megabytes, gigabytes and terabytes — the sizes shown for files, drives and download plans.' },
    { q: 'Binary or decimal gigabytes?', a: 'Binary convention (1 GB = 1024 MB) that operating systems display. Drive manufacturers often use decimal (1000), explaining size mismatches.' },
  ],
  'number-base-converter': [
    { q: 'Which bases are supported?', a: 'Binary (base 2), octal (base 8), decimal (base 10) and hexadecimal (base 16) — enter a valid number in any and read the other three.' },
    { q: 'Can it convert fractional numbers?', a: 'No — it converts integers only. For fractions, convert whole and fractional parts separately.' },
  ],
  'pressure-converter': [
    { q: 'Which pressure units are supported?', a: 'Pascal, bar, PSI and atmospheres — used for tyre pressures, compressors, diving and physics problems.' },
    { q: 'Gauge or absolute pressure?', a: 'The tool converts numbers without distinguishing gauge from absolute pressure. Ensure both readings use the same reference.' },
  ],
  'energy-converter': [
    { q: 'Are food calories the same as calories?', a: 'Nutrition labels use kilocalories (kcal), called Calories. The tool converts kilocalories properly — a “100 calorie” snack is 100 kcal.' },
    { q: 'Can I convert joules to kilowatt-hours?', a: 'Yes — joules, kilojoules, kilocalories, kWh and BTU are supported, for both household bills and physics problems.' },
  ],
  'time-zone-converter': [
    { q: 'Does it handle daylight saving time?', a: 'Yes — conversions use your browser’s timezone database, applying current DST rules for each zone. Historical dates before rule changes may differ.' },
        { q: 'Why do I set both zones?', a: 'A time is only meaningful relative to a zone: the tool converts your entered time from the source zone to the equivalent wall-clock time in the target zone.' },
  ],
  // ===== IMAGE EXTRA =====
  'color-picker': [
    { q: 'Which formats can I copy?', a: 'HEX, RGB and HSL — pick a colour visually or paste a value, then copy the notation your stylesheet needs.' },
    { q: 'Can I pick from a screenshot?', a: 'Not directly — use an image viewer with an eyedropper to grab a value, then paste it here to convert.' },
  ],
  'color-converter': [
    { q: 'Which formats can I convert between?', a: 'HEX, RGB and HSL — type or paste a colour in any notation and read the equivalents for CSS variables and design tokens.' },
    { q: 'Is it a full palette tool?', a: 'No — it converts a single colour. It does not adjust brightness or build palettes.' },
  ],
  'png-to-jpg': [
    { q: 'What happens to transparent areas?', a: 'PNG transparency is flattened onto a white background, because JPG has no alpha channel.' },
    { q: 'Will the JPG be smaller?', a: 'Almost always — JPG compression suits screenshots and photos, typically producing much smaller files than the original PNG.' },
  ],
  'jpg-to-png': [
    { q: 'Does converting improve quality?', a: 'No — conversion is lossless from here, but any artefacts the original JPG introduced remain. It changes the format, not the quality.' },
    { q: 'Why might the PNG be larger?', a: 'PNG stores losslessly, so photographic content takes more bytes. Use PNG for graphics needing transparency; keep JPG for photos.' },
  ],
  'image-to-text': [
    { q: 'Which languages can it recognise?', a: 'OCR runs with English as the default language; recognition is best on clean, high-contrast English text.' },
    { q: 'Why is an image inaccurate?', a: 'Accuracy drops with skew, blur, low contrast and decorative fonts. Straighten, sharpen and crop the image, then try again.' },
  ],
  'base64-to-image': [
    { q: 'The preview is blank — why?', a: 'The string must be a complete, valid image data URI. Truncated Base64 or a wrong MIME type cannot render; re-copy the full string.' },
    { q: 'Can I recover the file?', a: 'Yes — the download action saves the decoded image as a real file with the correct extension.' },
  ],
  'gradient-generator': [
    { q: 'How do I use the CSS output?', a: 'Copy the generated background property into your stylesheet or inline style — standard CSS that works in every modern browser.' },
    { q: 'What is the PNG export for?', a: 'It renders your gradient to a fixed 640×360 image — useful as a placeholder or mock-up, not a production asset.' },
  ],
  'background-remover': [
    { q: 'Does it remove backgrounds?', a: 'Not yet — this is a demo of the interface and does not produce a transparent image at the moment. No file is uploaded anywhere.' },
    { q: 'What is expected later?', a: 'When removal is implemented, it will run in the browser like the other image tools and export a PNG with transparency.' },
  ],
  'image-resizer': [
    { q: 'Can I keep the aspect ratio?', a: 'Yes — the resizer maintains proportions: set width or height and the other follows automatically.' },
    { q: 'Which format is the resized image?', a: 'Resized images are exported as PNG from the canvas; convert to JPG with the format converter for a smaller photo file.' },
  ],
    'image-compressor': [
    { q: 'How can I judge the right quality?', a: 'Lower quality means much smaller files. The live preview shows the result before you download, so balance size against visible quality.' },
    { q: 'Is compression lossless?', a: 'No — JPG compression discards detail to save space. Re-compress from the original source at a different quality anytime.' },
  ],
  // ===== DEVELOPER =====
  'json-formatter': [
    { q: 'Why does my JSON show an error?', a: 'Common causes: trailing commas, single quotes, or comments. The formatter uses strict JSON — remove these and retry.' },
    { q: 'Can I copy the formatted output?', a: 'Yes — click the copy icon next to the result to copy the prettified or minified JSON to your clipboard in one step.' },
  ],
  'json-to-csv': [
    { q: 'What do the column headers come from?', a: 'The keys of the first object become the CSV headers. Keep your object keys consistent so every row maps to them.' },
    { q: 'What if my objects have different keys?', a: 'Missing values are left blank for that row, which can shift your columns. Normalise the objects before converting.' },
  ],
  'base64-encoder': [
    { q: 'Is Base64 encryption?', a: 'No — it is just an encoding. It is fully reversible, so never use it to protect secrets.' },
    { q: 'Where is it commonly needed?', a: 'Embedding images in CSS/HTML, API payloads, basic obfuscation and reading JWT-looking strings.' },
  ],
  'html-minifier': [
    { q: 'Will my page still look the same?', a: 'Visually, yes — whitespace removal is cosmetic. But whitespace inside <pre> can affect it, so check sensitive markup after minifying.' },
    { q: 'Can I reverse it?', a: 'You can paste it back into a formatter, but minified output is intentionally hard to read by hand.' },
  ],
  'css-minifier': [
    { q: 'Does it optimise my selectors?', a: 'No — this tool reformats for size by removing comments and trimming spaces. Selector rewriting is left to your build pipeline.' },
    { q: 'Is the result still valid CSS?', a: 'Yes — it reformats, it does not restructure, so the CSS behaves exactly the same after minification.' },
  ],
  'js-minifier': [
    { q: 'Does it rename my variables?', a: 'No — this minifier strips comments and whitespace but leaves variable and function names intact, like a basic compressor.' },
    { q: 'Should I use it for production?', a: 'It reduces size for quick one-off fixes. For production, run a full mangler like Terser in your build pipeline.' },
  ],
  'regex-tester': [
    { q: 'What do the flags do?', a: 'g = replace all, i = ignore case, m = multiline (^/$ match line starts/ends), s = dot matches newline. Combine as needed.' },
    { q: 'Why does my regex match too much?', a: 'The default dot is greedy — add ? after a quantifier (*? or +?) to make it lazy, or anchor matches with ^ and $ for tighter control.' },
  ],
  'password-generator': [
    { q: 'How strong are generated passwords?', a: 'They are cryptographically random from your chosen character pools — long and varied by default. Longer is always stronger.' },
    { q: 'Should I reuse generated passwords?', a: 'No — generate a unique one per account. A password manager is the safe way to store them rather than memorising these.' },
  ],
  'uuid-generator': [
    { q: 'What version of UUID is generated?', a: 'Version 4 — a random UUID generated with your browser’s cryptographic random source, suitable for unique IDs.' },
    { q: 'Is UUID v4 unique enough?', a: 'Yes, with extremely high probability at scale. It is random, not sequential, so it is ideal for keys but not for sorted lists.' },
  ],
  'hash-generator': [
    { q: 'Which algorithms are supported?', a: 'SHA-256, SHA-1, SHA-384, SHA-512 and MD5. All are one-way hashes with no decryption.' },
    { q: 'Is MD5 safe to use?', a: 'Not for security — MD5 is broken and fast to brute-force. Use SHA-256 or higher for integrity or fingerprints.' },
  ],
  'qr-generator': [
    { q: 'What will be sent over the network?', a: 'Just the text or URL you enter is forwarded to the QRServer API to render the QR code image. Do not encode secrets.' },
    { q: 'Can I scan the code I generate?', a: 'Yes — download the PNG and open it with any phone camera or QR scanner app to confirm it reads back your content.' },
  ],
    'qr-scanner': [
    { q: 'Why is the camera not starting?', a: 'QR scanning needs a secure context served over HTTPS (or localhost) and your permission to use the camera. Grant the prompt and reload if blocked.' },
    { q: 'What happens after my code is detected?', a: 'The decoded text or URL appears on screen, and you can optionally export it as a .txt file for saving or sharing.' },
  ],
  // ===== CODE TESTING =====
  'html-preview': [
    { q: 'Are there security risks?', a: 'The preview runs your HTML live, so embedded scripts execute normally. Never paste untrusted code and then click around it.' },
    { q: 'Can I save my work?', a: 'No — the code is local to the tab and is lost when you leave. Copy it out if you need to keep it.' },
  ],
  'css-tester': [
    { q: 'Does the preview persist?', a: 'It only applies your rule to a built-in sample element; there is no saved project. Copy the CSS if you need it later.' },
    { q: 'Why does my rule not apply?', a: 'Inspect the sample element to confirm the selector matches it; specificity and later rules can override your input.' },
  ],
  'js-playground': [
    { q: 'Can I import NPM libraries?', a: 'No — code runs with standard browser globals only. For libraries, build a local snippet or use an online editor.' },
    { q: 'What happens with errors?', a: 'Errors and console output appear in the result area. Long-running loops can freeze the tab, since execution shares the page thread.' },
  ],
  'html-to-jsx': [
    { q: 'Are there edge cases?', a: 'It handles common HTML; inline scripts and some SVG quirks may need cleanup. Always treat the output as a starting point.' },
    { q: 'Can it convert JSX to HTML?', a: 'No — it is one-way, HTML to JSX for React components.' },
  ],
  'css-to-scss': [
    { q: 'Does it add variables or mixins?', a: 'No — it performs mechanical nesting of repeated selectors only. Add variables, functions and mixins yourself if needed.' },
    { q: 'Will my styling change?', a: 'No — identical selectors are grouped; only the structure becomes nested, which compiles back to the same CSS.' },
  ],
  'json-to-yaml': [
    { q: 'Why does deep JSON look messy?', a: 'YAML relies on indentation, so deep trees become deeply indented. Flatten the structure if readability matters.' },
    { q: 'Does YAML preserve data types?', a: 'Yes — numbers, booleans and strings map to YAML scalars where the type is unambiguous; quoting is used when it is not.' },
  ],
  'yaml-to-json': [
    { q: 'Why might my YAML fail to parse?', a: 'YAML is whitespace-sensitive — a misaligned indent or a tab breaks it. Match each level consistently before converting.' },
    { q: 'Does it handle anchors and aliases?', a: 'No — anchors and merge keys resolve into explicit repeated values, which is safer for most downstream tools.' },
  ],
  // ===== FUN =====
  'random-number': [
    { q: 'Can I set the range?', a: 'Yes — set minimum and maximum values to generate random integers within any range, not just 1 to 100.' },
    { q: 'Is it cryptographically random?', a: 'No — it uses a standard generator, fine for games and quick picks, not for security or keys.' },
  ],
  'dice-roller': [
    { q: 'Can I roll multiple dice?', a: 'Yes — set the number of dice and sides on each. Every roll is independent and results are clearly counted.' },
    { q: 'Are rolls saved?', a: 'No — each roll is independent and nothing is stored between sessions.' },
  ],
  'coin-flip': [
    { q: 'Can I flip more than once?', a: 'Yes — each click flips a fresh, independent coin. There is no history or running tally.' },
    { q: 'Is the toss fair?', a: 'The generator is unbiased, so over many flips heads and tails each land roughly half the time.' },
  ],
  'emoji-translator': [
    { q: 'How does translation work?', a: 'The tool maps keywords such as “happy” or “love” to matching emoji. Not every word has an emoji equivalent.' },
    { q: 'Can I translate back?', a: 'No — translation goes text to emoji only. Emoji do not map back to unambiguous words.' },
  ],
  'ascii-art': [
    { q: 'What is a good input length?', a: 'Short words and phrases work best — the art is built from characters, so long input creates very wide art that wraps awkwardly.' },
    { q: 'Can I use symbols?', a: 'Letters and numbers are rendered into ASCII art. Symbols and punctuation are ignored.' },
  ],
  'palindrome-checker': [
    { q: 'What counts for the check?', a: 'The tool compares the word to its reverse after ignoring spaces and punctuation, so “taco cat” and “Madam, I’m Adam” count.' },
    { q: 'Is there a word database?', a: 'No — it checks only the text you enter. There is no lookup against a dictionary.' },
  ],
  'anagram-generator': [
    { q: 'Can it find real words?', a: 'It shuffles the letters randomly to produce an anagram, not a lookup against a dictionary of real words.' },
    { q: 'Is there a length limit?', a: 'Input is capped at 8 letters so results stay puzzle-friendly, with a maximum of 50 anagrams per word.' },
  ],
  'random-quote': [
    { q: 'How often does a new quote appear?', a: 'Each click pulls a random quote from the built-in list. Quotes may repeat across draws.' },
    { q: 'Are quotes attributed?', a: 'Yes, each quote shows the author or source where known.' },
  ],
  'image-to-base64': [
    { q: 'Why does the Base64 output look so long?', a: 'Base64 encodes binary data as text and adds about 33% overhead, so even a small image produces a long string. That is normal for data URIs.' },
    { q: 'Can I convert the string back to an image?', a: 'Yes — paste the same data URI into the Base64 to Image tool on this site to preview and download the original file.' },
  ],
  'url-encoder': [
    { q: 'When do I need to encode a URL?', a: 'Whenever a URL or query string contains spaces, symbols or non-ASCII characters that must survive an API call, an href attribute or a redirect.' },
    { q: 'Does decoding trust the URL?', a: 'No — it decodes percent-escapes only and never executes the result. Still treat decoded URLs with the usual caution before opening them.' },
  ],
};