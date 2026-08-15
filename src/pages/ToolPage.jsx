import React, { Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getToolById, categories } from '../data/toolsData';
import SEO from '../components/common/SEO';
import ToolContent from '../components/common/ToolContent';
import { webAppSchema, faqSchema, breadcrumbSchema } from '../utils/seo/schema';

// Mapping of toolId -> dynamic import module + exported component name
const loaderMap = {
  // TextTools
  'word-counter': ['../components/tools/TextTools', 'WordCounter'],
  'character-counter': ['../components/tools/TextTools', 'CharacterCounter'],
  'case-converter': ['../components/tools/TextTools', 'CaseConverter'],
  'text-reverser': ['../components/tools/TextTools', 'TextReverser'],
  'lorem-ipsum': ['../components/tools/TextTools', 'LoremIpsum'],
  'text-to-slug': ['../components/tools/TextTools', 'TextToSlug'],
  'remove-duplicates': ['../components/tools/TextTools', 'RemoveDuplicates'],
  'sort-lines': ['../components/tools/TextTools', 'SortLines'],
  'find-replace': ['../components/tools/TextTools', 'FindReplace'],
  'text-to-binary': ['../components/tools/TextTools', 'TextToBinary'],

  // ImageTools
  'image-to-base64': ['../components/tools/ImageTools', 'ImageToBase64'],
  'image-resizer': ['../components/tools/ImageTools', 'ImageResizer'],
  'image-compressor': ['../components/tools/ImageTools', 'ImageCompressor'],
  'color-picker': ['../components/tools/ImageTools', 'ColorPicker'],
  'color-converter': ['../components/tools/ImageTools', 'ColorConverter'],

  // Media Tools
  'pdf-to-word': ['../components/tools/MediaTools', 'PDFToWord'],
  'word-to-pdf': ['../components/tools/MediaTools', 'WordToPDF'],
  'image-to-pdf': ['../components/tools/MediaTools', 'ImageToPDF'],
  'pdf-to-image': ['../components/tools/MediaTools', 'PDFToImage'],
  'merge-pdf': ['../components/tools/MediaTools', 'MergePDF'],
  'compress-pdf': ['../components/tools/MediaTools', 'CompressPDF'],
  'audio-to-mp3': ['../components/tools/MediaTools', 'AudioToMP3'],
  'video-to-mp4': ['../components/tools/MediaTools', 'VideoToMP4'],
  'pdf-split': ['../components/tools/MediaTools', 'PDFSplit'],

  // Video downloaders
  'video-downloader': ['../components/tools/VideoDownloaderTools', 'UniversalVideoDownloader'],
  'youtube-downloader': ['../components/tools/VideoDownloaderTools', 'YouTubeDownloader'],

  // Calculator tools
  'basic-calculator': ['../components/tools/CalculatorTools', 'BasicCalculator'],
  'percentage-calculator': ['../components/tools/CalculatorTools', 'PercentageCalculator'],
  'bmi-calculator': ['../components/tools/CalculatorTools', 'BMICalculator'],
  'age-calculator': ['../components/tools/CalculatorTools', 'AgeCalculator'],
  'discount-calculator': ['../components/tools/CalculatorTools', 'DiscountCalculator'],
  'tip-calculator': ['../components/tools/CalculatorTools', 'TipCalculator'],
  'loan-calculator': ['../components/tools/CalculatorTools', 'LoanCalculator'],
  'scientific-calculator': ['../components/tools/CalculatorTools', 'ScientificCalculator'],

  // Extra calculators
  'gpa-calculator': ['../components/tools/CalculatorExtraTools', 'GPACalculator'],
  'compound-interest': ['../components/tools/CalculatorExtraTools', 'CompoundInterestCalculator'],
  'date-difference': ['../components/tools/CalculatorExtraTools', 'DateDifferenceCalculator'],

  // Converter tools
  'length-converter': ['../components/tools/ConverterTools', 'LengthConverter'],
  'weight-converter': ['../components/tools/ConverterTools', 'WeightConverter'],
  'temperature-converter': ['../components/tools/ConverterTools', 'TemperatureConverter'],
  'currency-converter': ['../components/tools/ConverterTools', 'CurrencyConverter'],
  'speed-converter': ['../components/tools/ConverterTools', 'SpeedConverter'],
  'area-converter': ['../components/tools/ConverterTools', 'AreaConverter'],
  'volume-converter': ['../components/tools/ConverterTools', 'VolumeConverter'],
  'time-converter': ['../components/tools/ConverterTools', 'TimeConverter'],
  'data-converter': ['../components/tools/ConverterTools', 'DataConverter'],
  'number-base-converter': ['../components/tools/ConverterTools', 'NumberBaseConverter'],
  'pressure-converter': ['../components/tools/ConverterExtraTools', 'PressureConverter'],
  'energy-converter': ['../components/tools/ConverterExtraTools', 'EnergyConverter'],
  'time-zone-converter': ['../components/tools/ConverterExtraTools', 'TimeZoneConverter'],

  // Developer tools
  'json-formatter': ['../components/tools/DeveloperTools', 'JSONFormatter'],
  'json-to-csv': ['../components/tools/DeveloperTools', 'JSONToCSV'],
  'base64-encoder': ['../components/tools/DeveloperTools', 'Base64Encoder'],
  'url-encoder': ['../components/tools/DeveloperTools', 'URLEncoder'],
  'html-minifier': ['../components/tools/DeveloperTools', 'HTMLMinifier'],
  'css-minifier': ['../components/tools/DeveloperTools', 'CSSMinifier'],
  'js-minifier': ['../components/tools/DeveloperTools', 'JSMinifier'],
  'regex-tester': ['../components/tools/DeveloperTools', 'RegexTester'],
  'password-generator': ['../components/tools/DeveloperTools', 'PasswordGenerator'],
  'uuid-generator': ['../components/tools/DeveloperTools', 'UUIDGenerator'],
  'hash-generator': ['../components/tools/DeveloperTools', 'HashGenerator'],
  'qr-generator': ['../components/tools/DeveloperTools', 'QRGenerator'],

  // Fun tools
  'random-number': ['../components/tools/FunTools', 'RandomNumber'],
  'dice-roller': ['../components/tools/FunTools', 'DiceRoller'],
  'coin-flip': ['../components/tools/FunTools', 'CoinFlip'],
  'emoji-translator': ['../components/tools/FunTools', 'EmojiTranslator'],
  'ascii-art': ['../components/tools/FunTools', 'ASCIIArt'],
  'palindrome-checker': ['../components/tools/FunTools', 'PalindromeChecker'],
  'anagram-generator': ['../components/tools/FunTools', 'AnagramGenerator'],
  'random-quote': ['../components/tools/FunTools', 'RandomQuote'],

  // Image extra
  'png-to-jpg': ['../components/tools/ImageExtraTools', 'ImageFormatConverter'],
  'jpg-to-png': ['../components/tools/ImageExtraTools', 'ImageFormatConverter'],
  'image-to-text': ['../components/tools/ImageExtraTools', 'ImageToText'],
  'base64-to-image': ['../components/tools/ImageExtraTools', 'Base64ToImage'],
  'gradient-generator': ['../components/tools/ImageExtraTools', 'GradientGenerator'],

  // Code testing / playgrounds
  'html-preview': ['../components/tools/CodeTestingTools', 'HTMLPreview'],
  'css-tester': ['../components/tools/CodeTestingTools', 'CSSTester'],
  'js-playground': ['../components/tools/CodeTestingTools', 'JSPlayground'],
  'html-to-jsx': ['../components/tools/CodeTestingTools', 'HTMLToJSX'],
  'css-to-scss': ['../components/tools/CodeTestingTools', 'CSSToSCSS'],
  'json-to-yaml': ['../components/tools/CodeTestingTools', 'JSONToYAML'],
  'yaml-to-json': ['../components/tools/CodeTestingTools', 'YAMLToJSON'],
  'background-remover': ['../components/tools/CodeTestingTools', 'BackgroundRemover'],

  // Extra text tools
  'roman-numerals': ['../components/tools/TextExtraTools', 'RomanNumeralsConverter'],
  'number-to-words': ['../components/tools/TextExtraTools', 'NumberToWordsConverter'],
  'markdown-to-html': ['../components/tools/TextExtraTools', 'MarkdownToHTMLConverter'],
  'typing-speed': ['../components/tools/TextExtraTools', 'TypingSpeedTest'],

  // Extra developer tools
  'qr-scanner': ['../components/tools/DeveloperExtraTools', 'QRScanner'],
};

function loadToolComponent(toolId) {
  const info = loaderMap[toolId];
  if (!info) return null;
  const [modulePath, exportName] = info;
  return React.lazy(() => import(/* @vite-ignore */ modulePath).then((m) => ({ default: m[exportName] })));
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
