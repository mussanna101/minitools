import { useEffect } from 'react';
import { tools } from '../../data/toolsData';

export default function Footer() {
  // Load Adsterra banner script once when footer mounts
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = 'https://pl30807551.effectivecpmnetwork.com/4096c9c6d69cf5f5cea8db5c2c79b336/invoke.js';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* AdSense Ad Unit */}
        <div className="mb-6">
          <ins className="adsbygoogle"
            style={{ display: 'block', width: '100%', height: '90px' }}
            data-ad-client="ca-pub-9674079530936526"
            data-ad-slot="1234567890"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
          <script>
            (adsbygoogle = window.adsbygoogle || []).push({});
          </script>
        </div>

        {/* Adsterra Ad Container (banner loads here via invoke.js) */}
        <div className="mb-6">
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