// src/data/toolFAQs.js
// Unique, tool-specific FAQ data that powers both the FAQPage JSON-LD
// schema (src/utils/seo/schema.js) and the on-page FAQ content block.
// Each tool id has exactly 4 precise Q&As.
export const toolFAQs = {
  // ===================== MEDIA TOOLS =====================
  'pdf-to-word': [
    { q: 'How do I convert PDF to Word?', a: 'Upload or drop your PDF in the tool, and it converts your file to an editable Word document instantly in your browser.' },
    { q: 'Is the PDF to Word converter free?', a: 'Yes, it is 100% free with no signup, no watermarks, and no file size limits for basic use.' },
    { q: 'Will the layout of my PDF stay the same in Word?', a: 'The converter preserves text, tables, and basic formatting, though very complex layouts may need minor manual adjustments.' },
    { q: 'Are my PDF files safe?', a: 'Yes. Files are processed locally in your browser and are never uploaded to any server.' },
  ],
  'word-to-pdf': [
    { q: 'How do I convert Word to PDF?', a: 'Select your Word document and the tool instantly converts it to a PDF file you can download.' },
    { q: 'Does it work with .docx files?', a: 'Yes, modern .docx files as well as older .doc files are supported.' },
    { q: 'Is the Word to PDF converter free?', a: 'Yes, it is completely free with unlimited conversions and no signup required.' },
    { q: 'Will my formatting be preserved?', a: 'Fonts, headings, tables, and images are preserved so the PDF looks like the original document.' },
  ],
  'image-to-pdf': [
    { q: 'How do I convert an image to PDF?', a: 'Upload one or multiple images and the tool arranges them into a single downloadable PDF document.' },
    { q: 'Can I convert multiple images at once?', a: 'Yes, you can add several images and they will be merged into one PDF in the order you choose.' },
    { q: 'Is the image to PDF converter free?', a: 'Yes, it is free with no signup or watermarks.' },
    { q: 'Are my images uploaded to a server?', a: 'No. Everything runs locally in your browser for complete privacy.' },
  ],
  'pdf-to-image': [
    { q: 'How do I convert a PDF to images?', a: 'Upload your PDF and the tool extracts each page as a separate image file you can download.' },
    { q: 'What image formats are supported?', a: 'Pages are saved as high-quality PNG images by default.' },
    { q: 'Is the PDF to image converter free?', a: 'Yes, it is free with no signup required.' },
    { q: 'Are large PDFs supported?', a: 'Yes, multi-page PDFs can be converted, with each page exported as its own image.' },
  ],
  'merge-pdf': [
    { q: 'How do I merge PDF files?', a: 'Upload two or more PDFs, arrange them in the desired order, and download the single combined file.' },
    { q: 'Can I reorder pages before merging?', a: 'Yes, the tool lets you drag files to reorder them before merging.' },
    { q: 'Is merging PDFs free?', a: 'Yes, it is completely free with no limits.' },
    { q: 'Are my PDFs stored anywhere?', a: 'No, all merging happens locally in your browser.' },
  ],
  'compress-pdf': [
    { q: 'How does PDF compression work?', a: 'The tool re-encodes images and removes redundant data to shrink the file size while keeping it readable.' },
    { q: 'How much can I compress a PDF?', a: 'Compression rates vary, but most PDFs can be reduced by 30-70% without visible quality loss.' },
    { q: 'Is the PDF compressor free?', a: 'Yes, it is free with no signup and no watermarks.' },
    { q: 'Will my text remain sharp after compression?', a: 'Yes, text stays crisp; only heavy image data is optimized.' },
  ],
  'audio-to-mp3': [
    { q: 'How do I convert audio to MP3?', a: 'Upload your audio file and the tool converts it to MP3 format for download.' },
    { q: 'Which audio formats are supported?', a: 'Common formats like WAV, OGG, and M4A can be converted to MP3.' },
    { q: 'Is the audio converter free?', a: 'Yes, it is free with no signup.' },
    { q: 'Is my audio file private?', a: 'Yes, conversion happens locally in your browser; nothing is uploaded.' },
  ],
  'video-to-mp4': [
    { q: 'How do I convert a video to MP4?', a: 'Upload your video file and the tool converts it to MP4 format ready to download.' },
    { q: 'Which video formats are supported?', a: 'Formats like MOV, AVI, and WebM can be converted to MP4.' },
    { q: 'Is the video converter free?', a: 'Yes, it is free with no signup.' },
    { q: 'Does it keep my video private?', a: 'Yes, processing happens locally in your browser.' },
  ],
  'youtube-downloader': [
    { q: 'How do I download a YouTube video?', a: 'Paste the YouTube link, click Get Video, choose your quality, and hit Download Video — it saves an MP4 to your device.' },
    { q: 'Can I convert YouTube to MP3?', a: 'Yes. After fetching the video, click the "Download MP3" button and the server converts the audio using ffmpeg.' },
    { q: 'Which qualities are supported?', a: 'You get a format list from the server including 1080p, 720p, 480p and more, plus MP3 audio.' },
    { q: 'Is it legal to download YouTube videos?', a: "Only download your own content or videos you have permission for. Downloading copyrighted material may violate YouTube's terms of service." },
  ],
  'video-downloader': [
    { q: 'Which sites does the video downloader support?', a: 'It supports YouTube, Facebook, Instagram, TikTok, Dailymotion, Vimeo, Twitter/X, Reddit, SoundCloud and many more through yt-dlp.' },
    { q: 'How do I download a Facebook or TikTok video?', a: 'Copy the video link, paste it in the tool, click Get Video, then choose Download Video or a conversion format.' },
    { q: 'Is there a video length limit?', a: 'There is no hard limit; very long videos just take longer to download depending on your server resources.' },
    { q: 'Is the downloader free?', a: 'Yes, it is free to use. It relies on your self-hosted backend so there are no per-download costs or watermarks.' },
  ],
}
