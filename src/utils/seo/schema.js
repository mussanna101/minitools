// src/utils/seo/schema.js
// Programmatic JSON-LD structured data builders.
// No internet at runtime: everything is generated from tool data.
const SITE_URL = 'https://minitools-silk.vercel.app';

// ---------------------------------------------------------------------------
// 2a. WebApplication schema (rich result for each tool)
// ---------------------------------------------------------------------------
export function webAppSchema(tool) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    url: `${SITE_URL}/tool/${tool.id}`,
    description: tool.description,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: 'MiniTools',
      url: SITE_URL,
    },
  };
}

// ---------------------------------------------------------------------------
// 2b. FAQPage schema (drives FAQ rich snippets; data from buildFAQs)
// ---------------------------------------------------------------------------
export function faqSchema(tool) {
  const faqs = buildFAQs(tool);
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

// ---------------------------------------------------------------------------
// 2c. BreadcrumbList schema (Home > Category > Tool)
// ---------------------------------------------------------------------------
export function breadcrumbSchema(tool, categoryName) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: categoryName || tool.category,
        item: `${SITE_URL}/category/${tool.category}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: tool.name,
        item: `${SITE_URL}/tool/${tool.id}`,
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// Per-tool FAQ data. Add an entry for every tool id to power faqSchema()
// and the on-page FAQ content block. Any tool without an entry gets a
// sensible default pair.
// ---------------------------------------------------------------------------
export function buildFAQs(tool) {
  const map = {
    'word-counter': [
      { q: 'How does the MiniTools word counter work?', a: 'It reads your text live in the browser and instantly counts words, characters (with and without spaces), sentences, and paragraphs. Nothing is uploaded anywhere.' },
      { q: 'Is the word counter free to use?', a: 'Yes. It is 100% free with no signup, no limits, and no watermarks.' },
      { q: 'Does the word counter work on mobile?', a: 'Yes, it is fully responsive and works on any device with a modern browser.' },
      { q: 'Is my text stored or shared?', a: 'No. All counting happens locally on your device; your text never leaves your browser.' },
    ],
    'case-converter': [
      { q: 'What case styles can I convert to?', a: 'You can convert text to UPPERCASE, lowercase, Title Case, and Sentence case instantly.' },
      { q: 'Does the case converter handle special characters?', a: 'Yes, it preserves numbers, punctuation, and special characters during conversion.' },
      { q: 'Is the case converter free?', a: 'Yes, it is completely free with no signup and no character limits.' },
      { q: 'Is my text sent to a server?', a: 'No. Everything runs locally in your browser for full privacy.' },
    ],
    'youtube-downloader': [
      { q: 'How do I download a YouTube video?', a: 'Paste the YouTube link, click Get Video, choose your quality, and hit Download Video to save an MP4 to your device.' },
      { q: 'Can I convert YouTube videos to MP3?', a: 'Yes. After fetching the video, click the Download MP3 button and the backend converts the audio using ffmpeg.' },
      { q: 'Which video qualities can I download?', a: 'The tool returns a format list including 1080p, 720p, 480p and more, plus MP3 audio conversion.' },
      { q: 'Is it legal to download YouTube videos?', a: 'Only download your own content or videos you have permission to use. Downloading copyrighted material may violate YouTube’s terms of service.' },
    ],
    'video-downloader': [
      { q: 'Which sites does the video downloader support?', a: 'It supports YouTube, Facebook, Instagram, TikTok, Dailymotion, Vimeo, Twitter/X, Reddit, SoundCloud and many more through yt-dlp.' },
      { q: 'How do I download a Facebook or TikTok video?', a: 'Copy the video link, paste it in the tool, click Get Video, then choose Download Video or a conversion format.' },
      { q: 'Is there a video length limit?', a: 'There is no hard limit; very long videos simply take longer depending on your backend resources.' },
      { q: 'Is the downloader free?', a: 'Yes, it is free to use with no per-download costs or watermarks.' },
    ],
  };

  return map[tool.id] || [
    { q: `What is the ${tool.name}?`, a: tool.description },
    { q: `Is the ${tool.name} free to use?`, a: 'Yes, it is 100% free with no signup required.' },
    { q: `Does the ${tool.name} work on mobile?`, a: 'Yes, it is fully responsive and works on any modern device.' },
    { q: `Is my data stored with the ${tool.name}?`, a: 'No. Everything runs locally in your browser; nothing is uploaded or stored.' },
  ];
}