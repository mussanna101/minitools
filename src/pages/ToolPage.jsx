import React, { Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getToolById, categories } from '../data/toolsData';
import SEO from '../components/common/SEO';
import ToolContent from '../components/common/ToolContent';
import { webAppSchema, faqSchema, breadcrumbSchema } from '../utils/seo/schema';

// Vite-friendly dynamic loader using import.meta.glob
const modules = import.meta.glob('../components/tools/**/*.jsx');

// Map tool ids to module path (relative to this file) and exported component name
const componentMap = {
  'word-counter': { path: '../components/tools/TextTools.jsx', exportName: 'WordCounter' },
  'character-counter': { path: '../components/tools/TextTools.jsx', exportName: 'CharacterCounter' },
  'case-converter': { path: '../components/tools/TextTools.jsx', exportName: 'CaseConverter' },
  'text-reverser': { path: '../components/tools/TextTools.jsx', exportName: 'TextReverser' },
  'lorem-ipsum': { path: '../components/tools/TextTools.jsx', exportName: 'LoremIpsum' },
  'text-to-slug': { path: '../components/tools/TextTools.jsx', exportName: 'TextToSlug' },
  'remove-duplicates': { path: '../components/tools/TextTools.jsx', exportName: 'RemoveDuplicates' },
  'sort-lines': { path: '../components/tools/TextTools.jsx', exportName: 'SortLines' },
  'find-replace': { path: '../components/tools/TextTools.jsx', exportName: 'FindReplace' },
  'text-to-binary': { path: '../components/tools/TextTools.jsx', exportName: 'TextToBinary' },

  'image-to-base64': { path: '../components/tools/ImageTools.jsx', exportName: 'ImageToBase64' },
  'image-resizer': { path: '../components/tools/ImageTools.jsx', exportName: 'ImageResizer' },
  'image-compressor': { path: '../components/tools/ImageTools.jsx', exportName: 'ImageCompressor' },
  'color-picker': { path: '../components/tools/ImageTools.jsx', exportName: 'ColorPicker' },
  'color-converter': { path: '../components/tools/ImageTools.jsx', exportName: 'ColorConverter' },

  'pdf-to-word': { path: '../components/tools/MediaTools.jsx', exportName: 'PDFToWord' },
  'word-to-pdf': { path: '../components/tools/MediaTools.jsx', exportName: 'WordToPDF' },
  'image-to-pdf': { path: '../components/tools/MediaTools.jsx', exportName: 'ImageToPDF' },
  'pdf-to-image': { path: '../components/tools/MediaTools.jsx', exportName: 'PDFToImage' },
  'merge-pdf': { path: '../components/tools/MediaTools.jsx', exportName: 'MergePDF' },
  'compress-pdf': { path: '../components/tools/MediaTools.jsx', exportName: 'CompressPDF' },
  'audio-to-mp3': { path: '../components/tools/MediaTools.jsx', exportName: 'AudioToMP3' },
  'video-to-mp4': { path: '../components/tools/MediaTools.jsx', exportName: 'VideoToMP4' },
  'pdf-split': { path: '../components/tools/MediaTools.jsx', exportName: 'PDFSplit' },

  'video-downloader': { path: '../components/tools/VideoDownloaderTools.jsx', exportName: 'UniversalVideoDownloader' },
  'youtube-downloader': { path: '../components/tools/VideoDownloaderTools.jsx', exportName: 'YouTubeDownloader' },

  'basic-calculator': { path: '../components/tools/CalculatorTools.jsx', exportName: 'BasicCalculator' },
  'percentage-calculator': { path: '../components/tools/CalculatorTools.jsx', exportName: 'PercentageCalculator' },
  'bmi-calculator': { path: '../components/tools/CalculatorTools.jsx', exportName: 'BMICalculator' },
  'age-calculator': { path: '../components/tools/CalculatorTools.jsx', exportName: 'AgeCalculator' },
  'discount-calculator': { path: '../components/tools/CalculatorTools.jsx', exportName: 'DiscountCalculator' },
  'tip-calculator': { path: '../components/tools/CalculatorTools.jsx', exportName: 'TipCalculator' },
  'loan-calculator': { path: '../components/tools/CalculatorTools.jsx', exportName: 'LoanCalculator' },
  'scientific-calculator': { path: '../components/tools/CalculatorTools.jsx', exportName: 'ScientificCalculator' },

  'gpa-calculator': { path: '../components/tools/CalculatorExtraTools.jsx', exportName: 'GPACalculator' },
  'compound-interest': { path: '../components/tools/CalculatorExtraTools.jsx', exportName: 'CompoundInterestCalculator' },
  'date-difference': { path: '../components/tools/CalculatorExtraTools.jsx', exportName: 'DateDifferenceCalculator' },

  'length-converter': { path: '../components/tools/ConverterTools.jsx', exportName: 'LengthConverter' },
  'weight-converter': { path: '../components/tools/ConverterTools.jsx', exportName: 'WeightConverter' },
  'temperature-converter': { path: '../components/tools/ConverterTools.jsx', exportName: 'TemperatureConverter' },
  'currency-converter': { path: '../components/tools/ConverterTools.jsx', exportName: 'CurrencyConverter' },
  'speed-converter': { path: '../components/tools/ConverterTools.jsx', exportName: 'SpeedConverter' },
  'area-converter': { path: '../components/tools/ConverterTools.jsx', exportName: 'AreaConverter' },
  'volume-converter': { path: '../components/tools/ConverterTools.jsx', exportName: 'VolumeConverter' },
  'time-converter': { path: '../components/tools/ConverterTools.jsx', exportName: 'TimeConverter' },
  'data-converter': { path: '../components/tools/ConverterTools.jsx', exportName: 'DataConverter' },
  'number-base-converter': { path: '../components/tools/ConverterTools.jsx', exportName: 'NumberBaseConverter' },
  'pressure-converter': { path: '../components/tools/ConverterExtraTools.jsx', exportName: 'PressureConverter' },
  'energy-converter': { path: '../components/tools/ConverterExtraTools.jsx', exportName: 'EnergyConverter' },
  'time-zone-converter': { path: '../components/tools/ConverterExtraTools.jsx', exportName: 'TimeZoneConverter' },

  'json-formatter': { path: '../components/tools/DeveloperTools.jsx', exportName: 'JSONFormatter' },
  'json-to-csv': { path: '../components/tools/DeveloperTools.jsx', exportName: 'JSONToCSV' },
  'base64-encoder': { path: '../components/tools/DeveloperTools.jsx', exportName: 'Base64Encoder' },
  'url-encoder': { path: '../components/tools/DeveloperTools.jsx', exportName: 'URLEncoder' },
  'html-minifier': { path: '../components/tools/DeveloperTools.jsx', exportName: 'HTMLMinifier' },
  'css-minifier': { path: '../components/tools/DeveloperTools.jsx', exportName: 'CSSMinifier' },
  'js-minifier': { path: '../components/tools/DeveloperTools.jsx', exportName: 'JSMinifier' },
  'regex-tester': { path: '../components/tools/DeveloperTools.jsx', exportName: 'RegexTester' },
  'password-generator': { path: '../components/tools/DeveloperTools.jsx', exportName: 'PasswordGenerator' },
  'uuid-generator': { path: '../components/tools/DeveloperTools.jsx', exportName: 'UUIDGenerator' },
  'hash-generator': { path: '../components/tools/DeveloperTools.jsx', exportName: 'HashGenerator' },
  'qr-generator': { path: '../components/tools/DeveloperTools.jsx', exportName: 'QRGenerator' },

  'random-number': { path: '../components/tools/FunTools.jsx', exportName: 'RandomNumber' },
  'dice-roller': { path: '../components/tools/FunTools.jsx', exportName: 'DiceRoller' },
  'coin-flip': { path: '../components/tools/FunTools.jsx', exportName: 'CoinFlip' },
  'emoji-translator': { path: '../components/tools/FunTools.jsx', exportName: 'EmojiTranslator' },
  'ascii-art': { path: '../components/tools/FunTools.jsx', exportName: 'ASCIIArt' },
  'palindrome-checker': { path: '../components/tools/FunTools.jsx', exportName: 'PalindromeChecker' },
  'anagram-generator': { path: '../components/tools/FunTools.jsx', exportName: 'AnagramGenerator' },
  'random-quote': { path: '../components/tools/FunTools.jsx', exportName: 'RandomQuote' },

  'png-to-jpg': { path: '../components/tools/ImageExtraTools.jsx', exportName: 'ImageFormatConverter' },
  'jpg-to-png': { path: '../components/tools/ImageExtraTools.jsx', exportName: 'ImageFormatConverter' },
  'image-to-text': { path: '../components/tools/ImageExtraTools.jsx', exportName: 'ImageToText' },
  'base64-to-image': { path: '../components/tools/ImageExtraTools.jsx', exportName: 'Base64ToImage' },
  'gradient-generator': { path: '../components/tools/ImageExtraTools.jsx', exportName: 'GradientGenerator' },

  'html-preview': { path: '../components/tools/CodeTestingTools.jsx', exportName: 'HTMLPreview' },
  'css-tester': { path: '../components/tools/CodeTestingTools.jsx', exportName: 'CSSTester' },
  'js-playground': { path: '../components/tools/CodeTestingTools.jsx', exportName: 'JSPlayground' },
  'html-to-jsx': { path: '../components/tools/CodeTestingTools.jsx', exportName: 'HTMLToJSX' },
  'css-to-scss': { path: '../components/tools/CodeTestingTools.jsx', exportName: 'CSSToSCSS' },
  'json-to-yaml': { path: '../components/tools/CodeTestingTools.jsx', exportName: 'JSONToYAML' },
  'yaml-to-json': { path: '../components/tools/CodeTestingTools.jsx', exportName: 'YAMLToJSON' },
  'background-remover': { path: '../components/tools/CodeTestingTools.jsx', exportName: 'BackgroundRemover' },

  'roman-numerals': { path: '../components/tools/TextExtraTools.jsx', exportName: 'RomanNumeralsConverter' },
  'number-to-words': { path: '../components/tools/TextExtraTools.jsx', exportName: 'NumberToWordsConverter' },
  'markdown-to-html': { path: '../components/tools/TextExtraTools.jsx', exportName: 'MarkdownToHTMLConverter' },
  'typing-speed': { path: '../components/tools/TextExtraTools.jsx', exportName: 'TypingSpeedTest' },

  'qr-scanner': { path: '../components/tools/DeveloperExtraTools.jsx', exportName: 'QRScanner' },
};

function loadToolComponent(toolId) {
  const info = componentMap[toolId];
  if (!info) return null;
  const { path, exportName } = info;
  const loader = modules[path];
  if (!loader) {
    const alt = path.replace(/\.jsx$/, '.js');
    if (modules[alt]) return React.lazy(() => modules[alt]().then((m) => ({ default: m[exportName] })));
    return null;
  }
  return React.lazy(() => loader().then((m) => ({ default: m[exportName] })));
}

export default function ToolPage() {
  const { toolId } = useParams();
  const tool = getToolById(toolId);
  const ToolComponent = tool ? loadToolComponent(toolId) : null;

  if (!tool || !ToolComponent) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-3">🔧</div>
        <h2 className="text-2xl font-bold mb-4">Tool not found</h2>
        <Link to="/" className="btn-primary inline-block">Back to Home</Link>
      </div>
    );
  }

  const category = categories.find((c) => c.id === tool.category);
  const canonical = `https://minitools-silk.vercel.app/tool/${tool.id}`;

  const faq = faqSchema(tool);
  const jsonLd = [webAppSchema(tool), breadcrumbSchema(tool, category?.name)].filter(Boolean);
  if (faq) jsonLd.push(faq);

  return (
    <>
      {/* Dynamic metadata + JSON-LD for this tool */}
      <SEO title={`${tool.name} | Free Online Tool`} description={tool.description} canonical={canonical} ogType="website" jsonLd={jsonLd} />

      <div className="space-y-6">
        <div>
          <Link to={`/category/${tool.category}`} className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
            ← {category?.name}
          </Link>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-4xl">{tool.icon}</span>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{tool.name}</h1>
              <p className="text-gray-600 dark:text-gray-400">{tool.description}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <Suspense fallback={<div className="p-8 text-center">Loading tool...</div>}>
            <ToolComponent />
          </Suspense>
        </div>

        {/* SEO content block (H2/H3 + privacy + 4 FAQs) */}
        <ToolContent tool={tool} />
      </div>
    </>
  );
}
