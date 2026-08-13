import { useParams, Link, Navigate } from 'react-router-dom';
import { getToolById, categories } from '../data/toolsData';
import SEO from '../components/common/SEO';
import ToolContent from '../components/common/ToolContent';
import { webAppSchema, faqSchema, breadcrumbSchema } from '../utils/seo/schema';
import {
  WordCounter, CharacterCounter, CaseConverter, TextReverser, LoremIpsum,
  TextToSlug, RemoveDuplicates, SortLines, FindReplace, TextToBinary
} from '../components/tools/TextTools';
import {
  ImageToBase64, ImageResizer, ImageCompressor, ColorPicker, ColorConverter
} from '../components/tools/ImageTools';
import {
  BasicCalculator, PercentageCalculator, BMICalculator, AgeCalculator,
  DiscountCalculator, TipCalculator, LoanCalculator, ScientificCalculator
} from '../components/tools/CalculatorTools';
import {
  LengthConverter, WeightConverter, TemperatureConverter, CurrencyConverter,
  SpeedConverter, AreaConverter, VolumeConverter, TimeConverter,
  DataConverter, NumberBaseConverter
} from '../components/tools/ConverterTools';
import {
  JSONFormatter, JSONToCSV, Base64Encoder, URLEncoder, HTMLMinifier,
  CSSMinifier, JSMinifier, RegexTester, PasswordGenerator, UUIDGenerator,
  HashGenerator, QRGenerator
} from '../components/tools/DeveloperTools';
import {
  RandomNumber, DiceRoller, CoinFlip, EmojiTranslator, ASCIIArt,
  PalindromeChecker, AnagramGenerator, RandomQuote
} from '../components/tools/FunTools';
import {
  PDFToWord, WordToPDF, ImageToPDF, PDFToImage, MergePDF,
  CompressPDF, AudioToMP3, VideoToMP4
} from '../components/tools/MediaTools';
import {
  UniversalVideoDownloader
} from '../components/tools/VideoDownloaderTools';
import {
  HTMLPreview, CSSTester, JSPlayground, HTMLToJSX, CSSToSCSS,
  JSONToYAML, YAMLToJSON, BackgroundRemover
} from '../components/tools/CodeTestingTools';

const toolComponents = {
  // Code Testing & Conversion Tools
  'html-preview': HTMLPreview,
  'css-tester': CSSTester,
  'js-playground': JSPlayground,
  'html-to-jsx': HTMLToJSX,
  'css-to-scss': CSSToSCSS,
  'json-to-yaml': JSONToYAML,
  'yaml-to-json': YAMLToJSON,
  'background-remover': BackgroundRemover,

  // PDF & Media Tools
  'pdf-to-word': PDFToWord,
  'word-to-pdf': WordToPDF,
  'image-to-pdf': ImageToPDF,
  'pdf-to-image': PDFToImage,
  'merge-pdf': MergePDF,
  'compress-pdf': CompressPDF,
  'audio-to-mp3': AudioToMP3,
  'video-to-mp4': VideoToMP4,
  'video-downloader': UniversalVideoDownloader,

  // Text Tools
  'word-counter': WordCounter,
  'character-counter': CharacterCounter,
  'case-converter': CaseConverter,
  'text-reverser': TextReverser,
  'lorem-ipsum': LoremIpsum,
  'text-to-slug': TextToSlug,
  'remove-duplicates': RemoveDuplicates,
  'sort-lines': SortLines,
  'find-replace': FindReplace,
  'text-to-binary': TextToBinary,

  // Image Tools
  'image-to-base64': ImageToBase64,
  'image-resizer': ImageResizer,
  'image-compressor': ImageCompressor,
  'color-picker': ColorPicker,
  'color-converter': ColorConverter,

  // Calculator Tools
  'basic-calculator': BasicCalculator,
  'percentage-calculator': PercentageCalculator,
  'bmi-calculator': BMICalculator,
  'age-calculator': AgeCalculator,
  'discount-calculator': DiscountCalculator,
  'tip-calculator': TipCalculator,
  'loan-calculator': LoanCalculator,
  'scientific-calculator': ScientificCalculator,

  // Converter Tools
  'length-converter': LengthConverter,
  'weight-converter': WeightConverter,
  'temperature-converter': TemperatureConverter,
  'currency-converter': CurrencyConverter,
  'speed-converter': SpeedConverter,
  'area-converter': AreaConverter,
  'volume-converter': VolumeConverter,
  'time-converter': TimeConverter,
  'data-converter': DataConverter,
  'number-base-converter': NumberBaseConverter,

  // Developer Tools
  'json-formatter': JSONFormatter,
  'json-to-csv': JSONToCSV,
  'base64-encoder': Base64Encoder,
  'url-encoder': URLEncoder,
  'html-minifier': HTMLMinifier,
  'css-minifier': CSSMinifier,
  'js-minifier': JSMinifier,
  'regex-tester': RegexTester,
  'password-generator': PasswordGenerator,
  'uuid-generator': UUIDGenerator,
  'hash-generator': HashGenerator,
  'qr-generator': QRGenerator,

  // Fun Tools
  'random-number': RandomNumber,
  'dice-roller': DiceRoller,
  'coin-flip': CoinFlip,
  'emoji-translator': EmojiTranslator,
  'ascii-art': ASCIIArt,
  'palindrome-checker': PalindromeChecker,
  'anagram-generator': AnagramGenerator,
  'random-quote': RandomQuote,
};

export default function ToolPage() {
  const { toolId } = useParams();

  // YouTube downloader temporarily disabled (feature kept for future use).
  if (toolId === 'youtube-downloader') {
    return <Navigate to="/tool/video-downloader" replace />;
  }

  const tool = getToolById(toolId);
  const ToolComponent = toolComponents[toolId];

  if (!tool || !ToolComponent) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-3">🔧</div>
        <h2 className="text-2xl font-bold mb-4">Tool not found</h2>
        <Link to="/" className="btn-primary inline-block">Back to Home</Link>
      </div>
    );
  }

  const category = categories.find(c => c.id === tool.category);
  const canonical = `https://minitools-silk.vercel.app/tool/${tool.id}`;

  return (
    <>
      {/* Dynamic metadata + JSON-LD for this tool */}
      <SEO
        title={`${tool.name} Online - Free ${tool.name} | MiniTools`}
        description={tool.description}
        canonical={canonical}
        ogType="website"
        jsonLd={[
          webAppSchema(tool),
          faqSchema(tool),
          breadcrumbSchema(tool, category?.name),
        ]}
      />

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
          <ToolComponent />
        </div>

        {/* SEO content block (H2/H3 + privacy + 4 FAQs) */}
        <ToolContent tool={tool} />
      </div>
    </>
  );
}