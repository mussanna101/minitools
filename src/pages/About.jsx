import React from 'react';
import ToolHelmet from '../components/common/ToolHelmet';

export default function About() {
  return (
    <>
      <ToolHelmet
        title="About MiniTools"
        description="Learn about MiniTools, a collection of 90+ free online utility tools. Most tools run entirely in your browser for privacy and speed."
        canonical="https://minitools-silk.vercel.app/about"
      />
      <div className="max-w-2xl mx-auto text-gray-900 dark:text-gray-100">
        <h1 className="text-4xl font-bold mb-6">About MiniTools</h1>

        <div className="prose prose-invert max-w-none space-y-6 text-gray-800 dark:text-gray-200">
          <section>
            <h2 className="text-2xl font-semibold mb-3">Who We Are</h2>
            <p>
              MiniTools is a free online utility collection offering 90+ tools for everyday tasks — 
              image conversion, PDF editing, video downloading, text manipulation, unit conversion, 
              calculators, and more.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Why MiniTools?</h2>
            <p>
              Every tool is designed to be simple, fast, and private. We believe utilities should 
              be free and straightforward — no subscriptions, no ads blocking the tool, no tracking.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">How It Works</h2>
            <p>
              <strong>Most MiniTools run locally in your browser.</strong> That means:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>
                <strong>Your files stay private.</strong> Files you upload (images, PDFs, documents) 
                are processed on your device, not sent to our servers.
              </li>
              <li>
                <strong>No accounts or logins.</strong> Start using any tool instantly—no registration, 
                no passwords.
              </li>
              <li>
                <strong>Works offline.</strong> After the page loads, many tools work without internet 
                (except video downloads and API-dependent tools like currency rates).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Backend & Third-Party Services</h2>
            <p>
              Some tools depend on external services:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>
                <strong>Video downloads</strong> use a backend powered by yt-dlp and FFmpeg 
                (hosted on Railway).
              </li>
              <li>
                <strong>QR code generation</strong> and <strong>currency conversion</strong> 
                use third-party APIs.
              </li>
              <li>
                <strong>Ads and analytics</strong> — we use Google AdSense and third-party ad networks 
                to keep tools free. See our <a href="/privacy-policy" className="text-primary-500 hover:underline">Privacy Policy</a> 
                for details.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Questions?</h2>
            <p>
              Have feedback, found a bug, or want to suggest a tool? <a href="/contact" className="text-primary-500 hover:underline">Contact us</a>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
