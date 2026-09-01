// src/data/toolContentData.js
// Per-tool editorial content: a unique "about" paragraph, supported formats and
// real limitations for every tool. Consumed by:
//   - src/components/common/ToolContent.jsx   (runtime UI)
//   - src/utils/seo/toolContent.js            (fallbacks + feature bullets)
//   - scripts/prerender-static.mjs            (static no-JS snapshot)
// Every entry is written against what the tool actually does — keep entries
// accurate and specific; if a tool changes, update its entry here.
export const toolContentData = {
  // ===== PDF & MEDIA =====
  'pdf-to-word': {
    about: 'This tool opens your PDF directly in the browser, extracts the text layer with pdf.js, and writes it into a genuine .docx (Office Open XML) file that Word, Google Docs and LibreOffice can open and edit.',
    formats: 'Input: PDF files. Output: editable .docx Word document.',
    limits: [
      'Text is extracted in reading order — complex columns, tables and embedded images are not reconstructed.',
      'Scanned PDFs without a text layer produce little or no text; run OCR first for those.',
    ],
  },
  'word-to-pdf': {
    about: 'The converter unpacks your document in the browser (DOCX is a zip of XML), rebuilds each paragraph with pdf-lib and saves a clean, text-selectable PDF — nothing is uploaded to a server.',
    formats: 'Input: .docx and plain-text files. Output: PDF.',
    limits: [
      'Best results with text-focused documents; images, headers/footers and advanced layout are simplified.',
      'Legacy binary .doc files may fail to parse — save them as .docx first.',
    ],
  },
  'image-to-pdf': {
    about: 'Pick one or more images, arrange the order, and the tool embeds each file into a multi-page PDF with pdf-lib in your browser — a common way to turn scans, receipts or photos into one shareable document.',
    formats: 'Input: JPG and PNG images (multiple files supported). Output: PDF.',
    limits: [
      'Each image becomes one full page; there is no cropping or per-page layout control.',
      'Other image types (WebP, GIF, BMP) should be converted to JPG/PNG first.',
    ],
  },
  'pdf-to-image': {
    about: 'Every page of your PDF is rendered to a PNG image using pdf.js, then bundled into a ZIP archive so you can download all pages at once — handy for thumbnails, previews and slide images.',
    formats: 'Input: PDF. Output: one PNG per page, delivered as a .zip archive.',
    limits: [
      'Pages are rasterised — the resulting images are flat pictures, not editable vectors.',
      'Very large PDFs take longer because each page is rendered individually in the browser.',
    ],
  },
  'merge-pdf': {
    about: 'Add two or more PDFs in the order you want and the tool concatenates them page-by-page with pdf-lib, producing a single combined document without any server round-trip.',
    formats: 'Input: two or more PDF files. Output: one merged PDF.',
    limits: [
      'Page order follows the list order — remove and re-add a file to change where it lands.',
      'Encrypted or password-protected PDFs cannot be merged.',
    ],
  },
  'compress-pdf': {
    about: 'The tool re-saves your PDF through pdf-lib with object streams enabled, rebuilding the internal file structure more efficiently — a lossless tidy-up that often shrinks PDFs exported with redundant objects.',
    formats: 'Input: PDF. Output: optimised PDF.',
    limits: [
      'This is a structural optimisation, not image recompression — image-heavy PDFs may shrink only slightly.',
      'Results vary by file; PDFs exported efficiently to begin with may see minimal savings.',
    ],
  },
  'pdf-split': {
    about: 'Enter the page numbers you want to keep (for example 1, 3, 5-8) and the tool copies exactly those pages into a new PDF using pdf-lib — ideal for extracting a chapter or sharing a few pages.',
    formats: 'Input: PDF plus a page list or range. Output: a new PDF containing the selected pages.',
    limits: [
      'Selected pages are combined into one new PDF; each page is not saved as a separate file.',
      'Pages are referenced by number, so check the page count of your document first.',
    ],
  },
  'audio-to-mp3': {
    about: 'Your audio file is decoded with the browser Web Audio API and re-encoded to MP3 with lamejs — entirely inside the tab, which makes it a quick way to get an MP3 from recordings, voice notes or downloads.',
    formats: 'Input: browser-decodable audio (WAV, OGG, M4A, MP3 and more). Output: MP3.',
    limits: [
      'Encoding runs faster than real time but is not instant for long recordings.',
      'Formats the browser itself cannot decode are not supported.',
    ],
  },
  'video-to-mp4': {
    about: 'The video is played back off-screen onto a canvas and re-recorded with the browser MediaRecorder, producing a shareable clip without uploading your original file anywhere.',
    formats: 'Input: browser-playable video files. Output: re-encoded video file.',
    limits: [
      'Recording happens in real time — a 3-minute video takes roughly 3 minutes to process.',
      'The exact container depends on your browser; some record WebM instead of MP4.',
    ],
  },
  'video-downloader': {
    about: 'Paste a public video link from Facebook, Instagram, TikTok, Dailymotion, Vimeo and similar sites; a yt-dlp/ffmpeg backend fetches the formats that genuinely exist for that URL and offers download or MP4/MP3 conversion. ⚠️ Only download videos you own or have explicit permission to download.',
    formats: 'Input: a public video URL. Output: the video file, or MP4/MP3 conversion via the backend.',
    limits: [
      '⚠️ Legal: Only download videos you own or have explicit permission to download. Downloading copyrighted content without permission is illegal and violates platform Terms of Service.',
      'The URL and selected format are sent to the downloader backend — never submit private or sensitive links.',
      'Only formats the source site actually serves are listed; private, deleted or region-locked posts fail.',
      'Respect platform terms and copyright law when using downloaded content.',
    ],
  },
  'youtube-downloader': {
    about: 'Paste a YouTube link and the tool asks the yt-dlp/ffmpeg backend for the formats that really exist for that video, then lets you download a chosen quality or convert it to MP4/MP3. ⚠️ YouTube\'s Terms of Service prohibit automated downloads; only download videos you own.',
    formats: 'Input: a public YouTube URL. Output: video download or MP4/MP3 conversion via the backend.',
    limits: [
      '⚠️ Legal: YouTube Terms of Service prohibit automated downloading. Download only videos you own or created, and only for legitimate backup purposes.',
      'The URL and format selection are processed by the downloader backend, so avoid private or unlisted links.',
      'Available qualities depend on what YouTube serves for that video; restricted videos cannot be fetched.',
      'Unauthorized distribution of downloaded content is copyright infringement.',
    ],
  },
  // ===== TEXT =====
  'word-counter': {
    about: 'Paste or type any text and the counter updates live as you write, tracking words, characters, sentences and paragraphs — useful for essays with limits, social posts, meta descriptions and transcripts.',
    formats: 'Input: plain text. Output: live counts (words, characters, sentences, paragraphs).',
    limits: [
      'Counts apply to the text in the box only — it does not open files such as PDF or DOCX.',
      'Word counting follows whitespace rules, so hyphenated compounds count as one word.',
    ],
  },
  'character-counter': {
    about: 'A focused counter that shows your character total with and without spaces in real time — the quickest way to check limits for tweets/X posts, SMS messages, meta titles and ad copy.',
    formats: 'Input: plain text. Output: live character counts (with and without spaces).',
    limits: [
      'It reports counts only — there is no trimming, rewriting or analysis.',
      'Counts are per paste; there is no history of previous checks.',
    ],
  },
  'case-converter': {
    about: 'Convert any block of text between UPPERCASE, lowercase, Title Case and Sentence case with one click — handy for fixing SHOUTING HEADINGS, headlines, names and titles you pasted in the wrong style.',
    formats: 'Input: plain text. Output: the same text in the selected case.',
    limits: [
      'Title Case capitalises each word mechanically and does not know minor-style exceptions like “of” or “the”.',
      'Sentence case resets every sentence, which may alter intentional capitalisation such as acronyms.',
    ],
  },
  'text-reverser': {
    about: 'Flip text backwards at three levels — reverse whole characters, word order or line order. Handy for word games, mirror-style captions, checking palindromes or undoing a scrambled list.',
    formats: 'Input: plain text. Output: reversed text (characters, words or lines).',
    limits: [
      'Character reversal also reverses emoji and other multi-byte characters into broken sequences.',
      'Line reversal needs multi-line input — with one line only the character mode changes anything.',
    ],
  },
  'lorem-ipsum': {
    about: 'Generate classic lorem ipsum placeholder paragraphs for wireframes, mock-ups and CMS testing — choose how many paragraphs you need and copy the result straight into your design.',
    formats: 'Output: lorem ipsum paragraphs ready to copy.',
    limits: [
      'The generator produces Latin-style filler only — it does not write real copy for you.',
      'Paragraph count is the only control; sentence length inside each paragraph is fixed.',
    ],
  },
  'text-to-slug': {
    about: 'Turn any headline or title into a clean URL slug: lowercase, accents transliterated, spaces turned into hyphens and special characters stripped — exactly what CMSes expect in a permalink.',
    formats: 'Input: plain text (title/heading). Output: URL-safe slug.',
    limits: [
      'Slugs are ASCII-safe, so scripts without Latin equivalents (Chinese, Arabic, etc.) are transliterated or dropped.',
      'Punctuation you may want to keep, such as full stops in abbreviations, is stripped by design.',
    ],
  },
  'remove-duplicates': {
    about: 'Paste a list — one item per line — and the tool keeps only the first occurrence of every line, giving you a clean, de-duplicated list of emails, keywords, URLs or IDs in seconds.',
    formats: 'Input: lines of text (one item per line). Output: unique lines in original order.',
    limits: [
      'Matching is exact — differences in case, spacing or trailing punctuation count as different lines.',
      'It preserves first-seen order; it does not sort the result.',
    ],
  },
  'sort-lines': {
    about: 'Alphabetise any list of lines in ascending or descending order — perfect for sorting name lists, bibliographies, keyword exports or configuration entries before pasting them elsewhere.',
    formats: 'Input: lines of text. Output: the same lines re-ordered alphabetically.',
    limits: [
      'Sorting is case-sensitive character order, so entries starting with capitals can group before lowercase ones.',
      'It sorts whole lines only — there is no numeric or date-aware ordering mode.',
    ],
  },
  'find-replace': {
    about: 'A quick find-and-replace panel for text you would rather not open an editor for: swap repeated words, fix a misspelt name across a paste, or replace separators in a data dump — all instantly and locally.',
    formats: 'Input: text plus a find and replace pair. Output: text with every match replaced.',
    limits: [
      'Replacement is plain-text based; there is no regular-expression mode.',
      'Every occurrence is replaced — there is no step-through “replace next” option.',
    ],
  },
  'text-to-binary': {
    about: 'Convert text to binary bytes and back: each character is encoded to its 8-bit binary value, which makes this useful for teaching how computers store text, debugging encodings or a quick binary puzzle.',
    formats: 'Input: text or space-separated binary bytes. Output: the equivalent binary or text.',
    limits: [
      'Decoding expects groups of 8 bits per character; other groupings produce wrong output.',
      'The tool uses standard byte encoding — it is not a general unicode codepoint converter.',
    ],
  },
  // ===== CONVERTERS =====
  'length-converter': {
    about: 'Convert between metric and imperial lengths — metres, kilometres, centimetres, millimetres, miles, yards, feet and inches — with results as you type, so a quick “how many feet is 2 m” takes one second.',
    formats: 'Input: a length value. Output: the same length in the selected unit.',
    limits: [
      'It converts linear distance only — no surveyor’s units or nautical miles.',
      'Results are decimal; there is no feet-and-inches fraction display.',
    ],
  },
  'weight-converter': {
    about: 'Switch weights between kilograms, grams, milligrams, pounds, ounces and stones instantly — the everyday converter for cooking, shipping, gym and travel luggage questions.',
    formats: 'Input: a weight value. Output: the same weight in the selected unit.',
    limits: [
      'It covers common mass units only — troy ounces and carats are not included.',
      'Values are decimal; stone results are shown decimally rather than in stone-plus-pounds.',
    ],
  },
  'temperature-converter': {
    about: 'Convert temperatures between Celsius, Fahrenheit and Kelvin with live results — whether that is an oven setting from a US recipe, a weather report or a science homework problem.',
    formats: 'Input: a temperature value. Output: the same temperature in the selected scale.',
    limits: [
      'Only the three main scales are supported — no Rankine or Réaumur.',
      'Below absolute zero inputs are not physically meaningful and are not specially flagged.',
    ],
  },
  'currency-converter': {
    about: 'Convert between world currencies using current exchange rates fetched from ExchangeRate-API; you pick the base and target currencies and the maths runs locally in your browser.',
    formats: 'Input: an amount plus two currencies. Output: the converted amount at current rates.',
    limits: [
      'Rates come from a third-party API and are indicative mid-market rates — card or bank rates will differ.',
      'An internet connection is required to refresh rates; no historical or intraday charts are shown.',
    ],
  },
  'speed-converter': {
    about: 'Translate speeds between km/h, mph, m/s, knots and more — the tool for reading a treadmill in mph, a European speed limit in km/h, or wind speeds given in knots.',
    formats: 'Input: a speed value. Output: the same speed in the selected unit.',
    limits: [
      'It converts constant speed units only — acceleration units are not included.',
      'Values are decimal; there is no minutes-per-kilometre pace mode for runners.',
    ],
  },
  'area-converter': {
    about: 'Convert area units — square metres, square kilometres, hectares, acres, square feet and square miles — for property listings, land measurement, flooring estimates and homework.',
    formats: 'Input: an area value. Output: the same area in the selected unit.',
    limits: [
      'It handles flat area only — there is no 3D volume mode.',
      'Regional land units beyond hectares and acres (for example bigha) are not supported.',
    ],
  },
  'volume-converter': {
    about: 'Convert volumes and capacities between litres, millilitres, gallons (US and Imperial), cups, pints and cubic units — the kitchen, fuel and shipping helper in one place.',
    formats: 'Input: a volume value. Output: the same volume in the selected unit.',
    limits: [
      'US and Imperial gallons are separate units — check which one your source uses.',
      'Cooking measures follow US conventions; metric cups differ slightly.',
    ],
  },
  'time-converter': {
    about: 'Convert durations between seconds, minutes, hours, days and weeks instantly — for time tracking, billing, countdowns and any “how many hours is that” question.',
    formats: 'Input: a duration value. Output: the same duration in the selected unit.',
    limits: [
      'Fixed units only — months and years are excluded because their length varies.',
      'It converts durations, not clock times; for those use the time zone converter.',
    ],
  },
  'data-converter': {
    about: 'Convert digital storage units — bytes, kilobytes, megabytes, gigabytes and terabytes — so you always know how a download, plan limit or drive size compares.',
    formats: 'Input: a data size value. Output: the same size in the selected unit.',
    limits: [
      'Decimal (1 kB = 1000 B) and binary (1 KiB = 1024 B) conventions differ — check which your source uses.',
      'It converts units only; actual file sizes on disk may differ due to file-system overhead.',
    ],
  },
  'roman-numerals': {
    about: 'Convert numbers to Roman numerals and Roman numerals back to numbers — 2024 becomes MMXXIV and MMXXIV becomes 2024, useful for outlines, clock faces, film credits, chapter numbering and history homework.',
    formats: 'Input: a number or a Roman numeral. Output: the equivalent in the other format.',
    limits: [
      'Standard Roman notation has no zero and no negatives — only positive integers are supported.',
      'Very large numbers exceed what Classical Roman numerals can express without overline notation.',
    ],
  },
  'number-to-words': {
    about: 'Spell out numbers in English words — the standard need for cheques, invoices, legal documents and forms that require the amount “in words”, up to the trillions.',
    formats: 'Input: a number (up to trillions). Output: the number written out in English words.',
    limits: [
      'Output is English only; there are no other languages or currency-specific phrasings.',
      'Decimal values are spelled digit-by-digit after the point rather than as fractions.',
    ],
  },
  'markdown-to-html': {
    about: 'Paste Markdown and get clean HTML instantly: headings, lists, links, code blocks and emphasis are converted live — handy when a CMS, email tool or website only accepts HTML.',
    formats: 'Input: Markdown text. Output: HTML markup.',
    limits: [
      'CommonMark-style syntax is supported; exotic extensions (footnotes, tables in some flavours) may vary.',
      'The output is an HTML fragment — it does not build a full page with head and body.',
    ],
  },
  'typing-speed': {
    about: 'A no-frills typing test: start typing and the tool measures your words-per-minute and accuracy live, so you can track practice sessions without creating an account.',
    formats: 'Input: your typing. Output: live WPM and accuracy.',
    limits: [
      'Accuracy and WPM are computed from the provided sample text — results are comparable only within the tool.',
      'Sessions are not stored; reloading the page starts a fresh test.',
    ],
  },
  // ===== CALCULATORS =====
  'basic-calculator': {
    about: 'A dependable four-operation calculator for addition, subtraction, multiplication and division, running entirely in the browser — no app install, no ads popping over the keypad.',
    formats: 'Input: numbers and operators. Output: the calculated result.',
    limits: [
      'It handles the four basic operations — no exponents, parentheses or scientific functions.',
      'Results follow standard JavaScript number precision, like any browser calculator.',
    ],
  },
  'percentage-calculator': {
    about: 'Answer the everyday percentage questions in one place: what is X% of Y, what percentage one number is of another, and percentage increase or decrease between two values.',
    formats: 'Input: two numbers per question. Output: the percentage result.',
    limits: [
      'It covers the common percentage operations — not compound growth or statistics.',
      'Increase/decrease results are signed, so a drop is shown as a negative percentage.',
    ],
  },
  'bmi-calculator': {
    about: 'Calculate Body Mass Index from height and weight, switching freely between metric (cm/kg) and imperial (in/lbs) units — a quick screening number, with the classic WHO weight categories.',
    formats: 'Input: height and weight in metric or imperial units. Output: BMI value and category.',
    limits: [
      'BMI does not distinguish muscle from fat, so athletes can read as overweight.',
      'It is a general screening tool for adults — not medical advice and not calibrated for children.',
    ],
  },
  'age-calculator': {
    about: 'Enter a date of birth and any reference date to get an exact age in years, months and days — the standard tool for forms, insurance, school enrolment and “how old exactly” questions.',
    formats: 'Input: dates. Output: exact age in years, months and days.',
    limits: [
      'Results depend on calendar rules, so historical dates before calendar reforms may look odd.',
      'It computes calendar age — it does not account for time zones in birth records.',
    ],
  },
  'discount-calculator': {
    about: 'Enter the original price and the discount percentage to see the final price and exactly how much you save — useful when shopping sales, comparing offers or checking “50% off” claims.',
    formats: 'Input: original price and discount percentage. Output: final price and savings.',
    limits: [
      'It handles a single percentage discount — stacked or tiered discounts must be calculated step by step.',
      'Results are pure numbers; sales tax is not added automatically.',
    ],
  },
  'tip-calculator': {
    about: 'Work out the tip on any bill: enter the amount and choose a percentage to see the tip and the total to pay, so splitting a restaurant bill takes seconds.',
    formats: 'Input: bill amount and tip percentage. Output: tip amount and total.',
    limits: [
      'One percentage applies to the whole bill — per-person splitting is not part of the calculation.',
      'Amounts are unitless numbers; currency symbols are not shown.',
    ],
  },
  'loan-calculator': {
    about: 'Estimate the monthly payment on an amortised loan: enter the amount, annual interest rate and term in years to see the monthly instalment and the total interest you would pay over the life of the loan.',
    formats: 'Input: loan amount, interest rate (% per year) and term in years. Output: monthly payment and totals.',
    limits: [
      'It assumes a fixed rate and equal monthly payments — variable rates and fees are not modelled.',
      'Figures are estimates; lenders may add insurance, processing fees or taxes that change the real payment.',
    ],
  },
  'scientific-calculator': {
    about: 'A scientific calculator in the browser with trigonometric functions, logarithms, powers and roots — enough for homework and quick engineering checks without hunting for a physical calculator.',
    formats: 'Input: numbers and scientific functions. Output: calculated results.',
    limits: [
      'Trigonometric results depend on the selected angle mode, so check degrees versus radians first.',
      'Complex-number arithmetic and symbolic algebra are not supported.',
    ],
  },
  'gpa-calculator': {
    about: 'Add your courses with their grades and credit hours on the 4.0 scale and the calculator totals a weighted GPA — handy at the end of a semester or when estimating what you need next term.',
    formats: 'Input: course grades (4.0 scale) with credit hours. Output: weighted GPA.',
    limits: [
      'It uses the plain 4.0 scale — weighted honours/AP scales and percentage-to-GPA conversions are not applied.',
      'Your entries stay on this page; nothing is saved between visits.',
    ],
  },
  'compound-interest': {
    about: 'See how savings grow with compound interest: enter a principal, rate and time period to compare the final balance against simple interest — the clearest way to visualise “interest on interest”.',
    formats: 'Input: principal, interest rate and time. Output: future value and total interest.',
    limits: [
      'It models a single deposit that compounds — regular monthly contributions are not part of the calculation.',
      'Taxes, fees and inflation are not included in the projection.',
    ],
  },
  'date-difference': {
    about: 'Pick two dates and get the exact gap between them in days, weeks, months and years — useful for deadlines, project planning, contract periods and countdowns.',
    formats: 'Input: two calendar dates. Output: the difference in days/months/years.',
    limits: [
      'It counts calendar days — business-day-only differences (skipping weekends) are not calculated.',
      'Order of the dates does not matter, but very old historical dates follow the modern calendar.',
    ],
  },
  // ===== CONVERTERS =====
  'length-converter': {
    about: 'Convert between metric and imperial lengths — metres, kilometres, centimetres, millimetres, miles, yards, feet and inches — with results as you type, so a quick “how many feet is 2 m” takes one second.',
    formats: 'Input: a length value. Output: the same length in the selected unit.',
    limits: [
      'It converts linear distance only — no surveyor’s units or nautical miles.',
      'Results are decimal; there is no feet-and-inches fraction display.',
    ],
  },
  'weight-converter': {
    about: 'Switch weights between kilograms, grams, milligrams, pounds, ounces and stones instantly — the everyday converter for cooking, shipping, gym and travel luggage questions.',
    formats: 'Input: a weight value. Output: the same weight in the selected unit.',
    limits: [
      'It covers common mass units only — troy ounces and carats are not included.',
      'Values are decimal; stone results are shown decimally rather than in stone-plus-pounds.',
    ],
  },
  'temperature-converter': {
    about: 'Convert temperatures between Celsius, Fahrenheit and Kelvin with live results — whether that is an oven setting from a US recipe, a weather report or a science homework problem.',
    formats: 'Input: a temperature value. Output: the same temperature in the selected scale.',
    limits: [
      'Only the three main scales are supported — no Rankine or Réaumur.',
      'Below absolute zero inputs are not physically meaningful and are not specially flagged.',
    ],
  },
  'currency-converter': {
    about: 'Convert between world currencies using current exchange rates fetched from ExchangeRate-API; you pick the base and target currencies and the maths runs locally in your browser.',
    formats: 'Input: an amount plus two currencies. Output: the converted amount at current rates.',
    limits: [
      'Rates come from a third-party API and are indicative mid-market rates — card or bank rates will differ.',
      'An internet connection is required to refresh rates; no historical or intraday charts are shown.',
    ],
  },
  'speed-converter': {
    about: 'Translate speeds between km/h, mph, m/s, knots and more — the tool for reading a treadmill in mph, a European speed limit in km/h, or wind speeds given in knots.',
    formats: 'Input: a speed value. Output: the same speed in the selected unit.',
    limits: [
      'It converts constant speed units only — acceleration units are not included.',
      'Values are decimal; there is no minutes-per-kilometre pace mode for runners.',
    ],
  },
  'area-converter': {
    about: 'Convert area units — square metres, square kilometres, hectares, acres, square feet and square miles — for property listings, land measurement, flooring estimates and homework.',
    formats: 'Input: an area value. Output: the same area in the selected unit.',
    limits: [
      'It handles flat area only — there is no 3D volume mode.',
      'Regional land units beyond hectares and acres (for example bigha) are not supported.',
    ],
  },
  'volume-converter': {
    about: 'Convert cooking and everyday volumes — litres, millilitres, gallons, quarts, pints, cups and fluid ounces — so a US recipe works in a metric kitchen and vice versa.',
    formats: 'Input: a volume value. Output: the same volume in the selected unit.',
    limits: [
      'Cup measures follow the US customary cup; metric cup countries will see small differences.',
      'Dry versus liquid gallons are treated as one imperial/US customary set — no separate dry measures.',
    ],
  },
  'time-converter': {
    about: 'Flip durations between milliseconds, seconds, minutes, hours, days and weeks — quick answers for time-based billing, video lengths, timeouts and “how long is 90 000 ms” questions.',
    formats: 'Input: a duration value. Output: the same duration in the selected unit.',
    limits: [
      'It converts durations, not clock times — for date gaps use the date difference tool instead.',
      'Months and years are excluded because their length varies.',
    ],
  },
  'data-converter': {
    about: 'Convert digital storage between bytes, KB, MB, GB and TB (with binary KiB/MiB/GiB included) — clarifying why a “1 TB” drive shows less capacity in your operating system.',
    formats: 'Input: a data size value. Output: the same size in the selected unit.',
    limits: [
      'Decimal (KB = 1000 B) and binary (KiB = 1024 B) conventions are separate — pick the right family.',
      'Bits are not covered; this tool is for bytes-based storage units.',
    ],
  },
  'pressure-converter': {
    about: 'Convert pressure readings between Pascal, bar, PSI and atmospheres — the daily need for tyre pressures, compressor settings, dive planning and physics problems.',
    formats: 'Input: a pressure value. Output: the same pressure in the selected unit.',
    limits: [
      'It covers the standard engineering units — mmHg for blood-pressure contexts is not included.',
      'Gauge versus absolute pressure is not distinguished; convert like-for-like readings.',
    ],
  },
  'number-base-converter': {
    about: 'Convert numbers between binary, octal, decimal and hexadecimal in one step — the everyday helper for reading memory addresses, colour codes, subnet masks and computer-science homework.',
    formats: 'Input: a number in any base (2, 8, 10 or 16). Output: the same value in the other bases.',
    limits: [
      'It converts integer values — fractional numbers are not supported.',
      'Inputs must be valid for their base; binary accepts only 0 and 1, hex accepts A–F.',
    ],
  },
  'energy-converter': {
    about: 'Convert energy between joules, kilocalories, kilowatt-hours, BTU and more — useful for reading food labels, comparing heater ratings or checking physics and engineering coursework.',
    formats: 'Input: an energy value. Output: the same energy in the selected unit.',
    limits: [
      'It converts energy only — power units like watts are a separate calculation.',
      'Nutritional “calories” are kilocalories; double-check which unit your source means.',
    ],
  },
  'time-zone-converter': {
    about: 'Convert a date and time between world time zones so a meeting time in one country makes sense in another — the simple way to schedule calls across regions without mental maths.',
    formats: 'Input: a date/time plus source and target zones. Output: the equivalent local time.',
    limits: [
      'Daylight-saving rules follow your browser’s timezone database and may differ for historical dates.',
      'It converts point-in-time instants — it does not handle ambiguous local times specially.',
    ],
  },
  // ===== DEVELOPER =====
  'json-formatter': {
    about: 'Paste raw JSON and get it pretty-printed with consistent indentation, or minified back to a single line — and since it validates as it formats, you see exactly where a JSON document breaks.',
    formats: 'Input: JSON text. Output: formatted or minified JSON.',
    limits: [
      'Strict JSON only — comments and trailing commas are rejected as syntax errors.',
      'Very large files (many MB) can slow the tab because parsing happens in the browser.',
    ],
  },
  'base64-encoder': {
    about: 'Encode text to Base64 or decode Base64 back to text right in the browser — the everyday tool for data URIs, API payloads, basic obfuscation and debugging JWT-looking strings.',
    formats: 'Input: text or Base64. Output: the encoded or decoded equivalent.',
    limits: [
      'It encodes text, not binary files — for images use a file-to-Base64 converter.',
      'Invalid Base64 input produces garbage output rather than a clear error.',
    ],
  },
  'url-encoder': {
    about: 'Percent-encode or decode URLs and query parameters: spaces become %20, reserved characters are escaped, so a link with symbols survives an API call or an href attribute.',
    formats: 'Input: text or an encoded URL. Output: percent-encoded or decoded text.',
    limits: [
      'It encodes the whole string — it does not keep ? & = intact as a full URL encoder would.',
      'Encoding is UTF-8 based; other character sets are not offered.',
    ],
  },
  'json-to-csv': {
    about: 'Convert an array of JSON objects into CSV rows for Excel, Google Sheets or any spreadsheet tool — column headers come from the object keys, so exports stay predictable.',
    formats: 'Input: JSON array of objects. Output: CSV text.',
    limits: [
      'Best with a uniform array — objects with different keys can produce ragged rows.',
      'Nested objects are not flattened into separate columns.',
    ],
  },
  'html-minifier': {
    about: 'Strip comments and unnecessary whitespace from HTML to shrink the file before you publish it — handy for email templates and anywhere every byte counts.',
    formats: 'Input: HTML source. Output: minified HTML.',
    limits: [
      'Whitespace inside <pre> and similar elements can change meaning — check sensitive markup after minifying.',
      'Keep an original copy; minification is meant to be one-way.',
    ],
  },
  'css-minifier': {
    about: 'Remove comments, last semicolons and redundant spaces from CSS to produce a compact stylesheet — a quick optimisation when a build pipeline is not available.',
    formats: 'Input: CSS source. Output: minified CSS.',
    limits: [
      'It does not rewrite or optimise selectors — only textual size is reduced.',
      'Minified output is hard to edit; always keep the readable source.',
    ],
  },
  'js-minifier': {
    about: 'Compress JavaScript by stripping comments and collapsing whitespace, reducing file size for quick deployments and code-golf experiments.',
    formats: 'Input: JavaScript source. Output: minified JavaScript.',
    limits: [
      'Regex-heavy code can confuse simple minifiers — verify behaviour after minifying.',
      'This is not a mangler: variable names and structure are preserved, so savings are smaller than Terser.',
    ],
  },
  'uuid-generator': {
    about: 'Generate random UUID v4 identifiers with your browser’s cryptographic random source — safe for database keys, test data, request IDs and anywhere a unique string is needed.',
    formats: 'Output: one or more UUID v4 strings.',
    limits: [
      'UUID v4 is random, not sequential — do not use it when sortability matters.',
      'Generated UUIDs are not tracked or stored; copy them before leaving the page.',
    ],
  },
  'regex-tester': {
    about: 'Type a regular expression with flags, paste sample text, and see live match highlighting — the quick playground for building and debugging patterns without touching your codebase.',
    formats: 'Input: a regex pattern, flags and test text. Output: live matches.',
    limits: [
      'It uses JavaScript regex semantics — patterns written for PCRE or RE2 may behave differently.',
      'There is no match-group inspector or replace-preview mode.',
    ],
  },
  'hash-generator': {
    about: 'Generate SHA-1, SHA-256, SHA-384 or SHA-512 hashes of any text using the browser’s native crypto engine — handy for checksums, dedupe checks and verifying that a string was not altered.',
    formats: 'Input: plain text. Output: the selected hexadecimal hash digest.',
    limits: [
      'Text only — hashing a file is not supported.',
      'SHA-1 is provided for legacy compatibility but is not collision-resistant; prefer SHA-256 for security work.',
      'These are one-way hashes, not encryption — there is no decryption.',
    ],
  },
  'qr-scanner': {
    about: 'Scan QR codes with your device camera straight from the browser: point the camera at a code and the decoded text or URL appears on screen without installing an app.',
    formats: 'Input: live camera feed aimed at a QR code. Output: the decoded text or URL.',
    limits: [
      'Camera access requires your permission and an HTTPS connection.',
      'The optional TXT export action passes the decoded result through QRServer.',
    ],
  },
  'html-preview': {
    about: 'Type or paste HTML and see it rendered live beside your code — the fastest way to test markup, email snippets or CSS experiments without creating files or spinning up a server.',
    formats: 'Input: HTML markup. Output: a live rendered preview.',
    limits: [
      'Everything runs locally in your browser, but resources referenced by your HTML load from the internet as normal.',
      'Do not paste untrusted HTML and click around — embedded scripts run as they would on any page.',
    ],
  },
  'css-tester': {
    about: 'Experiment with CSS properties on sample elements and watch the result immediately — a focused sandbox for checking how a rule actually looks before you commit it to a stylesheet.',
    formats: 'Input: CSS declarations. Output: styled sample elements, live.',
    limits: [
      'It styles built-in sample elements — it is not a full page editor.',
      'Browser-specific behaviour follows the browser you are using.',
    ],
  },
  'js-playground': {
    about: 'Write and run JavaScript right in your browser: type code, press run, and see console output instantly — a lightweight scratchpad for testing ideas, loops and APIs.',
    formats: 'Input: JavaScript code. Output: execution results / console output.',
    limits: [
      'Code runs locally with no sandbox escape — but code you write can make its own network requests, as on any site.',
      'Long-running loops can freeze the tab, since execution shares the page thread.',
    ],
  },
  'html-to-jsx': {
    about: 'Convert HTML markup into React-ready JSX: class becomes className, inline styles become objects, and self-closing tags are normalised — saving tedious manual edits when porting markup into a component.',
    formats: 'Input: HTML source. Output: JSX code.',
    limits: [
      'Best for straightforward markup — complex inline scripts or SVG quirks may need manual tweaks.',
      'Framework-specific attributes beyond standard HTML are not transformed.',
    ],
  },
  'css-to-scss': {
    about: 'Turn flat CSS into SCSS syntax by structuring repeated selectors into nested rules — a first step when migrating a plain stylesheet into a Sass project.',
    formats: 'Input: CSS source. Output: SCSS with nested selectors.',
    limits: [
      'It performs mechanical nesting — review the result before adopting Sass variables or mixins.',
      'Very repetitive stylesheets may still need manual cleanup for the cleanest structure.',
    ],
  },
  'json-to-yaml': {
    about: 'Convert JSON configuration into clean, human-friendly YAML — the format most CI pipelines, Docker Compose files and Kubernetes manifests expect.',
    formats: 'Input: JSON text. Output: YAML text.',
    limits: [
      'Numbers, booleans and strings are mapped to YAML scalars; exotic edge cases may need review.',
      'Deeply nested JSON produces deeply indented YAML — check readability of the result.',
    ],
  },
  'yaml-to-json': {
    about: 'Convert YAML into JSON so pipeline configs and manifest files can be read by tools, scripts and validators that only speak JSON.',
    formats: 'Input: YAML text. Output: JSON text.',
    limits: [
      'Indentation mistakes in the YAML input cause parse errors — YAML is whitespace-sensitive.',
      'Anchors and other advanced YAML extensions are outside the supported subset.',
    ],
  },
  'qr-generator': {
    about: 'Turn a URL or any text into a downloadable QR code PNG that phones scan directly — use it for links, Wi-Fi details, contact info or print materials without signing up for a QR service.',
    formats: 'Input: text or URL. Output: QR code image (PNG download).',
    limits: [
      'The text or URL you enter is sent to the QRServer API to render the image, so do not encode secrets.',
      'Very long text creates denser codes that are harder to scan — keep payloads short where possible.',
    ],
  },
  'color-picker': {
    about: 'Pick a colour and read it in HEX, RGB and HSL at once, with copy-ready values for CSS — plus conversion between notations so a design token written one way works everywhere.',
    formats: 'Input: a colour via picker or HEX value. Output: HEX / RGB equivalents.',
    limits: [
      'It converts between HEX and RGB — HSL/HSV and colour-blindness previews are not included.',
      'It works with sRGB values; wide-gamut colour spaces are not handled.',
    ],
  },
  // ===== IMAGE =====
  'image-resizer': {
    about: 'Resize any image to exact pixel dimensions directly in the browser using canvas — set width and height (or keep the aspect ratio) and download the resized picture without uploading it.',
    formats: 'Input: JPG, PNG, WebP and other browser-supported images. Output: resized PNG.',
    limits: [
      'Output is PNG regardless of input format, so resized photos may be larger than the original JPG.',
      'Upscaling beyond the original size enlarges pixels rather than adding real detail.',
    ],
  },
  'image-compressor': {
    about: 'Shrink JPG file sizes with a quality slider you control: the image is re-encoded on a canvas with adjustable quality, which is usually enough to get photos under an upload limit.',
    formats: 'Input: JPG/PNG images. Output: compressed JPG.',
    limits: [
      'Compression is lossy — lower quality means smaller files but more visible artefacts.',
      'PNG output with transparency flattens onto the chosen background.',
    ],
  },
  'image-to-base64': {
    about: 'Convert an image file into a Base64 data URI string you can copy — the standard trick for embedding small logos and icons directly in CSS, HTML or JSON without hosting a separate file.',
    formats: 'Input: image file. Output: Base64 data URI string.',
    limits: [
      'Base64 makes files about 33% larger — keep embedded images small.',
      'Very large images create unwieldy strings that may choke editors.',
    ],
  },
  'color-converter': {
    about: 'Convert colours between HEX, RGB and HSL notation with copy-ready output — pick a value in any one format and read the equivalents for CSS variables, design tokens and graphics tools.',
    formats: 'Input: a colour in HEX, RGB or HSL. Output: the same colour in the other notations.',
    limits: [
      'It converts colour notation — it does not adjust brightness, saturation or build palettes.',
      'Values are sRGB; wide-gamut spaces like Display-P3 are not handled.',
    ],
  },
  'png-to-jpg': {
    about: 'Convert PNG images to JPG entirely in your browser using the canvas: transparency is flattened onto a white background, which makes screenshots and graphics far smaller for email and uploads.',
    formats: 'Input: PNG images. Output: JPG images.',
    limits: [
      'Transparency is lost — transparent areas become white (or the chosen background).',
      'JPG is lossy, so sharp line art can show slight edge artefacts.',
    ],
  },
  'jpg-to-png': {
    about: 'Convert JPG photos to PNG losslessly in the browser — useful when an editor, form or design tool insists on PNG, or before you start adding transparent elements to a picture.',
    formats: 'Input: JPG images. Output: PNG images.',
    limits: [
      'PNG conversion does not add quality — existing JPG artefacts remain.',
      'PNG files from photo content are usually much larger than the original JPG.',
    ],
  },
  'image-to-text': {
    about: 'Extract text from images with OCR powered by Tesseract.js: photos of documents, screenshots and signs become selectable, copyable text without uploading your file to a server.',
    formats: 'Input: images containing text. Output: recognised plain text.',
    limits: [
      'Accuracy drops on blurry, low-contrast, skewed or stylised text — clean scans work best.',
      'The OCR engine downloads its language assets from a CDN on first use, so it needs a connection.',
    ],
  },
  'base64-to-image': {
    about: 'Paste a Base64 string or data URI and see the image instantly, then download it as a real file — the quick way to recover an image embedded in CSS, JSON or an API response.',
    formats: 'Input: Base64 string or data URI. Output: image preview and file download.',
    limits: [
      'The string must be a valid image MIME type — corrupt or truncated Base64 will not render.',
      'Huge strings can slow the preview; this is meant for small embedded graphics.',
    ],
  },
  'gradient-generator': {
    about: 'Design linear and radial CSS gradients visually: add colour stops, set positions and angle, copy the generated CSS, and download a PNG preview — no design tool required.',
    formats: 'Input: colours, stop positions and angle. Output: CSS gradient code and PNG export.',
    limits: [
      'PNG export is a fixed 640×360 preview — use the CSS output for production assets.',
      'Multi-layer or conic gradients are not supported; one gradient is generated at a time.',
    ],
  },
  'background-remover': {
    about: 'This page is currently a preview of the background-removal interface. Automatic background removal is not implemented yet, so it does not produce a transparent image at the moment.',
    formats: 'Input: image upload (interface demo). Output: none yet.',
    limits: [
      'The tool does not remove backgrounds or generate transparent results today — treat it as a demo.',
      'No file is uploaded anywhere; the demo works entirely on your device.',
    ],
  },
  // ===== FUN =====
  'random-number': {
    about: 'Generate a random integer between any minimum and maximum you set — the unbiased picker for raffles, dice rolls, picking a winner or sampling a random test value.',
    formats: 'Input: minimum and maximum bounds. Output: a random integer in range.',
    limits: [
      'It produces one integer per draw — there is no bulk list or “no repeats” mode.',
      'Bounds are inclusive; the minimum must not exceed the maximum.',
    ],
  },
  'password-generator': {
    about: 'Create strong random passwords using your browser’s cryptographic random generator, with control over length and character types — and nothing is transmitted or stored anywhere.',
    formats: 'Output: a random password of your chosen length and character set.',
    limits: [
      'Passwords are shown once — copy them straight into your password manager because they are not saved.',
      'Strength depends on the options you pick; short or limited-character passwords are weaker.',
    ],
  },
  'dice-roller': {
    about: 'Roll a virtual die (or dice) with a tap — a clean replacement for the physical die that always disappears under the sofa, for board games, classroom activities and decision-making.',
    formats: 'Output: random dice results.',
    limits: [
      'Results are for fun and games — cryptographic-grade randomness is not used.',
      'Dice type and count depend on the options shown; there is no custom-sided dice mode.',
    ],
  },
  'emoji-translator': {
    about: 'Type a sentence and watch suitable emoji appear for the words it recognises — a quick way to add visual flair to messages, or just to play with how text maps to emoji.',
    formats: 'Input: plain English text. Output: text with emoji substitutions.',
    limits: [
      'It maps a fixed dictionary of common words — unusual words pass through unchanged.',
      'Substitution is mechanical; context and tone are not interpreted.',
    ],
  },
  'palindrome-checker': {
    about: 'Check whether a word or phrase reads the same forwards and backwards — the tool ignores spaces, punctuation and case, so classic phrases like “A man, a plan, a canal: Panama” are judged fairly.',
    formats: 'Input: a word or phrase. Output: palindrome verdict.',
    limits: [
      'Only one phrase is checked at a time.',
      'Diacritics are compared as typed, so accented characters must match themselves.',
    ],
  },
  'anagram-generator': {
    about: 'Scramble the letters of a word (up to 8 letters) to create anagram puzzles, classroom games and party activities — every run shuffles again so you get a fresh jumble.',
    formats: 'Input: a word (max 8 letters). Output: a scrambled anagram of it.',
    limits: [
      'Length is capped at 8 letters so results stay puzzle-friendly.',
      'The shuffle is random — the output may occasionally look close to the original word.',
    ],
  },
  'coin-flip': {
    about: 'Flip a virtual coin for heads-or-tails decisions — settle debates, pick who goes first or add randomness to classroom activities with a single click.',
    formats: 'Output: heads or tails.',
    limits: [
      'Results come from a standard random generator — fine for games, not for cryptography.',
      'One flip at a time; there is no streak or statistics view.',
    ],
  },
  'ascii-art': {
    about: 'Turn short words into ASCII art built from text characters — a fun touch for terminal banners, README files, code comments and retro-style messages.',
    formats: 'Input: a word or short phrase. Output: ASCII art text.',
    limits: [
      'Long input produces very wide art that wraps awkwardly — keep it short.',
      'Character shapes depend on the chosen font style, not custom templates.',
    ],
  },
  'random-quote': {
    about: 'Pull a random inspirational quote whenever you need a spark of motivation, an icebreaker for a presentation or sample content for a design mock-up.',
    formats: 'Output: a random quote with attribution.',
    limits: [
      'The pool is a fixed built-in list; it does not fetch quotes from the internet.',
      'Quotes may repeat across draws — there is no “no repeats” mode.',
    ],
  },
};
