import React from 'react';

/**
 * ShareButton — native Web Share API with clipboard fallback.
 * Renders a compact button that:
 *   1. Tries navigator.share() (mobile OS share sheet)
 *   2. Falls back to copying the URL to clipboard
 *   3. Shows a brief toast confirmation.
 */
export default function ShareButton({
  url = window.location.href,
  title = document.title,
  text = 'Share this tool',
  className = '',
  children,
}) {
  const [copied, setCopied] = React.useState(false);

  const handleShare = async () => {
    // Prefer Web Share API (mobile)
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (e) {
        if (e.name === 'AbortError') return; // user cancelled
      }
    }

    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      // Last resort: prompt user to copy manually
      prompt('Copy this link:', url);
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${className}`}
      aria-label={text}
    >
      {children || (
        <>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          <span>{copied ? 'Copied!' : 'Share'}</span>
        </>
      )}
    </button>
  );
}