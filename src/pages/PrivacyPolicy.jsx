import React from 'react';
import ToolHelmet from '../components/common/ToolHelmet';

export default function PrivacyPolicy() {
  return (
    <>
      <ToolHelmet
        title="Privacy Policy"
        description="MiniTools Privacy Policy. Learn how we handle your data, cookies, and advertising."
        canonical="https://minitools-silk.vercel.app/privacy-policy"
      />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">Overview</h2>
            <p>
              MiniTools is committed to protecting your privacy. This policy explains how we collect, 
              use, and protect your information when you visit <strong>minitools-silk.vercel.app</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Data Processing</h2>
            <p>
              <strong>Most MiniTools run in your browser.</strong> Files you upload (images, PDFs, 
              documents, text) are processed locally on your device and are NOT sent to our servers.
            </p>
            <p className="mt-3">
              <strong>Exceptions:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>
                <strong>Video downloads</strong> — your URL is sent to our backend server 
                (hosted on Railway) to fetch video information and process downloads.
              </li>
              <li>
                <strong>Currency conversion & QR codes</strong> — these request data from third-party APIs.
              </li>
            </ul>
            <p className="mt-3 text-sm text-gray-400">
              <strong>Do not use these tools with private, sensitive, or confidential URLs or data.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Cookies</h2>
            <p>
              MiniTools uses cookies for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>
                <strong>Theme preference</strong> — stores your light/dark mode choice.
              </li>
              <li>
                <strong>User preferences</strong> — backend URL settings, tool history (stored locally).
              </li>
              <li>
                <strong>Google AdSense</strong> — cookies used to serve personalized ads (see details below).
              </li>
              <li>
                <strong>Third-party ad networks</strong> — Adsterra and other ad partners may set their own cookies.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Advertising & Google AdSense</h2>
            <p>
              This site is monetized with <strong>Google AdSense</strong>. Google and its partners 
              use cookies to:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Serve ads based on your prior visits to this and other websites.</li>
              <li>Track ad performance and click rates.</li>
              <li>Display ads that match your interests.</li>
            </ul>
            <p className="mt-3">
              <strong>Additional ad networks:</strong> We also use <strong>Adsterra</strong> 
              and other third-party ad networks. These partners may collect information about 
              your browsing behavior.
            </p>
            <p className="mt-3">
              <strong>Opt out of personalized ads:</strong>{' '}
              <a 
                href="https://adssettings.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-500 hover:underline"
              >
                Google Ad Settings
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Analytics & Tracking</h2>
            <p>
              We may use Google Analytics or similar services to understand how users interact 
              with the site. This helps us improve tools and content. Analytics data is aggregated 
              and anonymized.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Third-Party Services</h2>
            <p>
              MiniTools uses or links to the following third-party services:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li><strong>Vercel</strong> — hosting and deployment</li>
              <li><strong>Railway</strong> — video download backend (yt-dlp/FFmpeg)</li>
              <li><strong>Google AdSense</strong> — advertising</li>
              <li><strong>Adsterra</strong> — advertising</li>
              <li><strong>Currency & QR APIs</strong> — external data providers</li>
            </ul>
            <p className="mt-3">
              These services have their own privacy policies. We recommend reviewing them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Your Rights & Choices</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Local data:</strong> Settings and history are stored in your browser only. 
                Clear your browser cache to delete them.
              </li>
              <li>
                <strong>Personalized ads:</strong> Opt out at{' '}
                <a 
                  href="https://adssettings.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-500 hover:underline"
                >
                  Google Ad Settings
                </a>.
              </li>
              <li>
                <strong>Contact us:</strong> Have privacy concerns? <a href="/contact" className="text-primary-500 hover:underline">Contact us</a>.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Security</h2>
            <p>
              We take reasonable measures to protect your data:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>HTTPS is used to encrypt data in transit.</li>
              <li>Client-side processing means your files never leave your device (for most tools).</li>
              <li>We do not store uploaded files on our servers.</li>
            </ul>
            <p className="mt-3">
              <strong>No guarantee:</strong> While we strive for security, no system is 100% secure. 
              Use at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Children's Privacy</h2>
            <p>
              MiniTools is not intended for children under 13. We do not knowingly collect 
              personal information from children. If we learn we have, we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. Changes take effect when posted here. 
              Continued use of the site means you accept any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">10. Contact</h2>
            <p>
              Questions about this privacy policy? <a href="/contact" className="text-primary-500 hover:underline">Contact us</a> 
              or email <strong>support@minitools.app</strong>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
