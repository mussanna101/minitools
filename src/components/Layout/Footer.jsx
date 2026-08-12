export default function Footer() {
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
        
        <p className="text-gray-600 dark:text-gray-400">
          Mini Tools - 50+ Free Online Tools | Made with love
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
          All tools run directly in your browser. No data is sent to any server.
        </p>
      </div>
    </footer>
  );
}