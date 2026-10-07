import { useEffect } from 'react';

/**
 * useLucideIcons
 *
 * Turns every pending `<i data-lucide="...">` placeholder into an inline SVG
 * using the Lucide CDN global (`window.lucide.createIcons()`), as soon as the
 * library is available. Covers:
 *  - initial render (run on mount + on window "load")
 *  - icons added later by route changes (lightweight interval, no-op unless
 *    new placeholders exist)
 *
 * The guard checks for `i[data-lucide]` elements only, so already-rendered
 * SVGs are never re-processed and React's DOM is left alone after the swap.
 */
export function useLucideIcons() {
  useEffect(() => {
    const run = () => {
      if (typeof window === 'undefined' || !window.lucide) return;
      if (!document.querySelector('i[data-lucide]')) return;
      try {
        window.lucide.createIcons();
      } catch (e) {
        console.warn('lucide.createIcons failed', e);
      }
    };

    run();
    window.addEventListener('load', run);
    const id = setInterval(run, 1000);

    return () => {
      window.removeEventListener('load', run);
      clearInterval(id);
    };
  }, []);
}