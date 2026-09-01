import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { tools, categories } from '../../data/toolsData';

export default function Footer() {
  const scriptRef = useRef(false);
  const [footerAdLoaded, setFooterAdLoaded] = useState(false);

  // Load Adsterra banner script once when footer mounts (after first paint)
  useEffect(() => {
    // Prevent duplicate initialization in StrictMode
    if (scriptRef.current) return;
    scriptRef.current = true;

    // Defer ad script loading to idle time to avoid impacting main thread
    const loadAd = () => {
      const script = document.createElement('script');
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = 'https://airtightmodification.com/4096c9c6d69cf5f5cea8db5c2c79b336/invoke.js';
      script.onload = () => setFooterAdLoaded(true);
      document.body.appendChild(script);
    };

    // Use requestIdleCallback where available, fallback to setTimeout
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadAd, { timeout: 2000 });
    } else {
      setTimeout(loadAd, 100);
    }
  }, []);

  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Crawlable site-wide navigation */}
        <nav aria-label="Footer" className="mb-6">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400 font-medium">
                All Tools
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link to={`/category/${cat.id}`} className="hover:text-primary-600 dark:hover:text-primary-400">
                  {cat.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/about" className="hover:text-primary-600 dark:hover:text-primary-400">
                About
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-primary-600 dark:hover:text-primary-400">
                Privacy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-primary-600 dark:hover:text-primary-400">
                Terms
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary-600 dark:hover:text-primary-400">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* 
          AdSense ad unit (placeholder slot - replace "1234567890" with real slot ID from AdSense dashboard when available)
          When a real slot ID is ready:
          <div className="mb-6" style={{ minHeight: '90px' }}>
            <ins className="adsbygoogle"
              style={{ display: 'block', width: '100%', minHeight: '90px' }}
              data-ad-client="ca-pub-9674079530936526"
              data-ad-slot="[REAL_SLOT_ID_HERE]"
              data-ad-format="auto"
              data-full-width-responsive="true"></ins>
            <script>
              (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
          </div>
        */}

        {/* Adsterra Ad Container (banner loads here via invoke.js) */}
        <div className="mb-6" style={{ minHeight: '90px' }}>
          <div id="container-4096c9c6d69cf5f5cea8db5c2c79b336"></div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400">
          MiniTools – {tools.length}+ Free Online Tools | Made with love
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
          Most tools run in your browser; currency rates and QR images use third-party APIs, while video downloads use the configured backend.
        </p>
      </div>
    </footer>
  );
}