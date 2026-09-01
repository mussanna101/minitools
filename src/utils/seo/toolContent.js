// src/utils/seo/toolContent.js
// Natural, keyword-rich content builders for the 3 sections rendered under every
// tool ("How to Use", "Key Features & Benefits", "Frequently Asked Questions").
// Shared by:
//   - src/components/common/ToolContent.jsx   (runtime UI, FAQ rendered as accordion)
//   - scripts/prerender-static.mjs            (no-JS static snapshot)
// Every string interpolates the tool name so the copy reads naturally and is
// keyword-focused without feeling templated.

import { getToolProcessingProfile } from '../../data/toolProcessing.js';
import { toolContentData } from '../../data/toolContentData.js';

// ---------------------------------------------------------------------------
// Unique per-tool editorial content (about / formats / limits), authored in
// data/toolContentData.js. These builders are the single source used by the
// runtime UI (ToolContent.jsx), the FAQ generators (schema.js) and the static
// prerender pipeline, so all three stay in sync.
// ---------------------------------------------------------------------------
export function buildAbout(tool) {
  const entry = toolContentData[tool.id];
  if (entry?.about) return entry.about;
  // Fallback for any tool added without an editorial entry yet.
  const profile = getToolProcessingProfile(tool);
  return `${tool.description} ${profile.disclosure}`;
}

export function buildFormats(tool) {
  return toolContentData[tool.id]?.formats || '';
}

export function buildLimits(tool) {
  return toolContentData[tool.id]?.limits || [];
}

// ---------------------------------------------------------------------------
export function getProcessingDisclosure(tool) {
  return getToolProcessingProfile(tool).disclosure;
}

export function isBackendTool(tool) {
  return getToolProcessingProfile(tool).kind === 'backend';
}

// How to Use [Tool Name] — <h2> + <ol> step-by-step guide
// ---------------------------------------------------------------------------
export function buildHowToSteps(tool) {
  const { name, category, id } = tool;
  const profile = getToolProcessingProfile(tool);
  const entry = toolContentData[id];

  if (profile.kind === 'backend') {
    return [
      `Paste a supported YouTube or social video URL into the ${name} input.`,
      profile.step,
      'Choose one of the returned video qualities; only formats actually fetched for that URL are shown.',
      'Download the video or choose MP4/MP3 conversion, depending on the output you need.',
      'Use only videos you own or have permission to download, and avoid submitting private links.',
    ];
  }

  if (profile.kind !== 'local') {
    return [
      `Open the ${name} tool and provide the input it requests.`,
      profile.step,
      'Choose the available options and run the tool.',
      'Review the result shown in the browser.',
      'Use the output for your task and avoid submitting sensitive information to external services.',
    ];
  }

  // Tool-specific steps for local processing tools
  switch (id) {
    case 'pdf-to-word':
      return [
        `Open the free ${name} tool above — no account needed.`,
        'Upload your PDF file or drag-and-drop it into the upload area.',
        'The tool extracts the text layer using pdf.js and rebuilds paragraphs as an editable Word document.',
        'Download your .docx file instantly — it opens in Word, Google Docs, and LibreOffice.',
        `Note: scanned PDFs without text require OCR first for the ${name} to extract content.`,
      ];
    case 'word-to-pdf':
      return [
        `Open the ${name} converter above — completely free, no login.`,
        'Upload a .docx Word document or plain-text file into the converter.',
        'The tool unpacks the DOCX (which is a ZIP of XML) in your browser and rebuilds it as a PDF.',
        'Download your clean, text-selectable PDF instantly.',
        'Avoid legacy .doc files — save as .docx first for best results.',
      ];
    case 'image-to-pdf':
      return [
        `Use the free ${name} tool to bundle multiple images into one PDF.`,
        'Upload or drag your JPG and PNG images — order them how you want them to appear in the PDF.',
        'Each image becomes one full page in the final document.',
        'Click Convert and the tool creates your PDF instantly in the browser.',
        'Download the PDF to share it, print it, or store it in your documents.',
      ];
    case 'pdf-to-image':
      return [
        `Open the free ${name} converter above — no signup required.`,
        'Upload your PDF file into the tool.',
        'Every page is rendered to a PNG image instantly in your browser using pdf.js.',
        'Download a ZIP archive containing all the page images — one PNG per page.',
        'Use for thumbnails, previews, or sharing individual slides as images.',
      ];
    case 'merge-pdf':
      return [
        `Use the ${name} tool to combine multiple PDFs into one document.`,
        'Add two or more PDF files and arrange them in the order you want.',
        'The tool merges them page-by-page using pdf-lib, directly in your browser.',
        'Download your combined PDF instantly — no server upload needed.',
        'Note: encrypted PDFs cannot be merged; unlock them first.',
      ];
    case 'compress-pdf':
      return [
        `Open the free ${name} tool — completely online, no installation.`,
        'Upload your PDF file into the compression area.',
        'The tool rebuilds the file structure with object streams, removing redundancy without altering content.',
        'Download your optimized PDF — the result may be noticeably smaller depending on the source.',
        'Compression is lossless; text and images remain identical.',
      ];
    case 'pdf-split':
      return [
        `Use the ${name} tool to extract specific pages from your PDF.`,
        'Upload your PDF and enter page numbers or ranges (e.g., 1, 3, 5-8).',
        'The tool creates a new PDF containing only the selected pages.',
        'Download your extracted PDF in seconds.',
        'Repeat as needed to split your PDF into multiple files.',
      ];

    case 'word-counter':
      return [
        `Paste or type any text into the ${name} box above — it starts counting instantly.`,
        `The tool updates live as you type, showing word count, character count (with and without spaces), sentences, and paragraphs.`,
        `Use it to check if your writing meets word limits for essays, social posts, and meta descriptions.`,
        'Copy the text back when you are done reviewing the stats.',
        `The ${name} is completely free and stores nothing on a server.`,
      ];
    case 'character-counter':
      return [
        `Paste or type text into the free ${name} tool above.`,
        `The tool shows character count both with spaces and without — pick the version that matches your limit.`,
        `Use it for tweets, SMS messages, form fields, and any platform with character restrictions.`,
        `The counter updates live and reports sentence and word counts as a bonus.`,
        `No data is saved; everything stays private in your browser.`,
      ];

    case 'case-converter':
      return [
        `Paste your text into the free ${name} tool above.`,
        `Choose your target case: UPPERCASE, lowercase, Title Case, or Sentence case.`,
        `The tool converts your entire text instantly.`,
        `Copy the result, or switch case styles and convert again right away.`,
        `Experiment with different styles for headings, titles, and copy formatting.`,
      ];

    case 'text-reverser':
      return [
        `Paste or type text into the ${name} tool above.`,
        `Choose your reversal mode: Character (letter-by-letter), Word (reverse word order), or Line (flip line order).`,
        `The result updates instantly.`,
        `Copy your reversed text or flip it again in a different mode.`,
        `Note: character mode may break emoji — use word or line mode for emoji-heavy text.`,
      ];

    case 'image-resizer':
      return [
        `Upload a JPG or PNG into the free ${name} tool.`,
        `Enter your desired width and height (or choose a preset aspect ratio).`,
        `Click Resize and the tool scales your image in the browser.`,
        `Choose your output quality if needed.`,
        `Download your resized image instantly without any quality loss compared to online services.`,
      ];

    case 'image-compressor':
      return [
        `Upload a JPG or PNG into the free ${name} tool above.`,
        `Drag the quality slider or choose a preset compression level.`,
        `Click Compress and the tool reduces file size while maintaining visible quality.`,
        `See the before and after file sizes instantly.`,
        `Download your compressed image — perfect for web, email, and sharing.`,
      ];

    case 'color-picker':
      return [
        `Open the free ${name} tool above — click anywhere to start.`,
        `Paste a hex color code, RGB value, or HSL value into the input, or use the color picker to select visually.`,
        `The tool displays the chosen color and converts it across all formats instantly.`,
        `Copy the color in hex, RGB, HSL, or other formats as you need.`,
        `Use the ${name} for design, web development, and color matching.`,
      ];

    case 'color-converter':
      return [
        `Enter a color value (hex, RGB, HSL, or a named color) into the ${name} tool.`,
        `The converter instantly shows the same color in every other format.`,
        `Copy whichever format you need for your design tool or code.`,
        `Switch between hex for web, RGB for CSS, and HSL for intuitive color adjustments.`,
        `Use the color preview to confirm you have the right shade.`,
      ];

    default:
      if (category === 'converter') {
        return [
          `Open the free ${name} tool above — no account, no signup, and nothing to install.`,
          `Select the unit or format you want to convert from and the one you want to convert to from the dropdowns.`,
          `Type or paste the value you need to convert into the input field.`,
          `Watch the result update instantly, or click Convert to see the precise answer right away.`,
          `Copy the outcome, tweak your value, or repeat as many times as you like — the ${name} is completely free.`,
        ];
      } else if (category === 'calculator') {
        return [
          `Open the ${name} on this page — it loads instantly in your browser.`,
          `Enter the numbers and values the tool asks for into the labelled fields.`,
          `Choose your unit or option from any dropdowns to match your situation.`,
          `Hit Calculate (or let the result update live) to get an accurate answer in seconds.`,
          `Review the breakdown and use it again for free as often as you need.`,
        ];
      } else if (['pdf', 'image', 'media'].includes(category)) {
        return [
          `Open the free ${name} tool on this page — this operation processes your input in the browser.`,
          `Upload or drop your file into the upload area using the button or drag-and-drop.`,
          `Adjust any options you need, such as quality, format, or output settings.`,
          `Click the Convert / Process button and wait a moment while the tool works in your browser.`,
          `Download your finished file instantly. You can repeat this as many times as you like at no cost.`,
        ];
      } else if (category === 'developer') {
        return [
          `Open the ${name} tool at the top of this page — it is free and needs no login.`,
          `Paste your code, data, or configuration into the main text area.`,
          `Choose any options that apply, such as formatting rules or output type.`,
          `Run the tool to see the result, which updates instantly in the output panel.`,
          `Copy the cleaned or converted output and reuse the ${name} whenever you need it.`,
        ];
      } else {
        return [
          `Open the handy ${name} on this page — it starts working the moment it loads.`,
          `Type, paste, or load the text you want to work with into the main input box.`,
          `Pick the option you need, such as the format, case, or mode you want to apply.`,
          `The result appears instantly and updates live as you type.`,
          `Copy your final text or keep experimenting — the ${name} is free and unlimited.`,
        ];
      }
  }
}

// ---------------------------------------------------------------------------
// Key Features & Benefits — <h2> + <ul> (4-5 keyword-rich bullets)
// ---------------------------------------------------------------------------
export function buildFeatures(tool) {
  const { name, id } = tool;
  const profile = getToolProcessingProfile(tool);
  
  if (profile.kind !== 'local') {
    return [
      profile.feature,
      profile.disclosure,
      `Use ${name} without an account or installation.`,
      'Review the result before using or sharing it.',
      'Avoid submitting private or sensitive information to external services.',
    ];
  }

  // Tool-specific features for local processing tools
  switch (id) {
    case 'pdf-to-word':
      return [
        `100% free ${name} — extract text from PDFs into editable Word documents.`,
        'Works entirely in your browser — your PDF never leaves your device.',
        'Extracts text in reading order and converts to genuine .docx (Office Open XML) format.',
        'Compatible with Word, Google Docs, and LibreOffice.',
        'Instant results, no account needed, and unlimited use.',
      ];
    case 'word-to-pdf':
      return [
        `Free ${name} that converts .docx and text files into clean PDFs instantly.`,
        'All processing happens in your browser — nothing is uploaded to a server.',
        'Produces text-selectable PDFs that are easy to share and print.',
        'Works on desktop, tablet, and mobile browsers.',
        'No signup required, and use it as many times as you need.',
      ];
    case 'image-to-pdf':
      return [
        `Combine multiple images (JPG, PNG) into a single PDF with the free ${name}.`,
        'Arrange images in any order before converting.',
        'Processes entirely in your browser with no file upload to a server.',
        'Create PDF documents from photos, scans, and screenshots instantly.',
        'No watermarks, no registration, and unlimited use.',
      ];
    case 'pdf-to-image':
      return [
        `Convert every page of your PDF to high-quality PNG images with the free ${name}.`,
        'Renders each page instantly in your browser using pdf.js.',
        'Download all pages as a ZIP archive for easy bulk use.',
        'Perfect for creating thumbnails, slide images, and visual previews.',
        'No installation, no account, and process as many PDFs as you need.',
      ];
    case 'merge-pdf':
      return [
        `Combine multiple PDFs into one document with the free ${name}.`,
        'Control the exact page order of your merged PDF.',
        'All merging happens in your browser — keep your PDFs private.',
        'Works with unlimited PDFs in a single merge operation.',
        'Instant results, no signup, and completely free.',
      ];
    case 'compress-pdf':
      return [
        `Reduce PDF file size losslessly with the ${name} — shrink files while preserving quality.`,
        'Processes your PDF entirely in the browser — your file stays private.',
        'Rebuilds file structure with object streams, removing redundancy.',
        'Text and images remain identical after compression.',
        'See exact before/after file sizes, no watermarks, unlimited use.',
      ];
    case 'pdf-split':
      return [
        `Extract specific pages from your PDF with the free ${name}.`,
        'Enter page numbers or ranges (e.g., 1, 3, 5-8) to extract.',
        'Processing happens in your browser with zero file upload.',
        'Split one PDF into multiple files or extract a single section.',
        'No account needed, instant results, and unlimited splits.',
      ];

    case 'word-counter':
      return [
        `Free ${name} that counts words, characters, sentences and paragraphs live.`,
        'Updates instantly as you type — perfect for meeting word limits.',
        'Shows character count with and without spaces for maximum flexibility.',
        'Ideal for essays, social posts, meta descriptions, and articles.',
        'No account or installation needed, completely private and unlimited.',
      ];
    case 'character-counter':
      return [
        `Count characters instantly with the ${name} — with or without spaces.`,
        'Perfect for tweets, SMS, form fields, and platform character limits.',
        'Updates live as you type with bonus word and sentence counts.',
        'Shows both totals side-by-side for easy comparison.',
        'Completely free, no signup, and 100% private processing.',
      ];

    case 'case-converter':
      return [
        `Convert text between UPPERCASE, lowercase, Title Case and Sentence case instantly.`,
        'Switch styles multiple times to experiment with different formats.',
        'Perfect for titles, headings, menu copy, and standardizing text.',
        'All conversion happens in your browser instantly.',
        'Free, no account required, and supports any text length.',
      ];

    case 'text-reverser':
      return [
        `Reverse text by character, word, or line with the free ${name}.`,
        'Choose your reversal mode for different types of text manipulation.',
        'Instant results that update live in your browser.',
        'Useful for puzzles, code analysis, and text experiments.',
        'No signup, no limits, and completely private processing.',
      ];

    case 'image-resizer':
      return [
        `Resize JPG and PNG images instantly with the free ${name}.`,
        'Set custom dimensions or choose preset aspect ratios.',
        'All resizing happens in your browser with no quality loss.',
        'Perfect for social media, web, and email image optimization.',
        'Download resized images instantly, no account or watermarks.',
      ];

    case 'image-compressor':
      return [
        `Compress JPG and PNG images to reduce file size without visible quality loss.`,
        'Adjust quality with a slider to balance file size and appearance.',
        'Process unlimited images instantly in your browser.',
        'Perfect for web images, email attachments, and storage.',
        'See before/after file sizes, completely free, no signup.',
      ];

    case 'color-picker':
      return [
        `Pick, convert and explore colors in hex, RGB, HSL and other formats.`,
        'Click anywhere to pick a color visually or paste a code to convert.',
        'See the color preview instantly in every available format.',
        'Perfect for designers, developers, and anyone working with colors.',
        'All conversions happen instantly in your browser.',
      ];

    case 'color-converter':
      return [
        `Convert colors between hex, RGB, HSL and other formats instantly.`,
        'Paste any color value and see it converted to every other format.',
        'View the color in a live preview to confirm accuracy.',
        'Essential for web design, CSS development, and graphics work.',
        'Completely free, no account, and lightning-fast results.',
      ];

    default:
      return [
        `100% free ${name} — no signup, no watermarks, and no hidden fees, ever.`,
        `Instant, accurate results that update live right inside your browser.`,
        `Works on any device — desktop, tablet, or mobile — with zero installation.`,
        profile.feature,
        `Unlimited use with a clean, simple interface designed for speed.`,
      ];
  }
}
