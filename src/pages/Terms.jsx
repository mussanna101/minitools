import React from 'react';
import ToolHelmet from '../components/common/ToolHelmet';

export default function Terms() {
  return (
    <>
      <ToolHelmet
        title="Terms of Service"
        description="MiniTools Terms of Service. Please read these terms carefully before using our tools."
        canonical="https://minitools-silk.vercel.app/terms"
      />
      <div className="max-w-2xl mx-auto text-gray-900 dark:text-gray-100">
        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-invert max-w-none space-y-6 text-gray-800 dark:text-gray-200">
          <section>
            <h2 className="text-2xl font-semibold mb-3">Overview</h2>
            <p>
              By accessing and using MiniTools (<strong>minitools-silk.vercel.app</strong>), 
              you agree to be bound by these Terms of Service. If you do not agree, do not use the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Use License</h2>
            <p>
              Permission is granted to temporarily download and use MiniTools for personal, 
              non-commercial use only. This is the grant of a license, not a transfer of title, 
              and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Modify or copy the materials or tools.</li>
              <li>Use the materials for any commercial purpose or for any public display.</li>
              <li>Attempt to decompile, reverse-engineer, or disassemble any tool or code.</li>
              <li>Remove any copyright or proprietary notations from the materials.</li>
              <li>Transfer the materials to another person or "mirror" them on another server.</li>
              <li>Use any tools to access or scrape the site automatically (bots, crawlers).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Video Download Tools — Permitted Use</h2>
            <p className="font-semibold text-amber-400">
              ⚠️ These terms are especially important for the Video Downloader and YouTube Downloader tools.
            </p>
            <p className="mt-3">
              <strong>You may only use these tools to download:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Videos you created or own.</li>
              <li>Videos you have explicit permission to download from the copyright holder.</li>
              <li>Videos released under a Creative Commons or similar open license that permits downloading.</li>
              <li>Videos in the public domain.</li>
            </ul>
            <p className="mt-3">
              <strong>You may NOT use these tools to:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Download copyrighted videos without permission.</li>
              <li>Download videos in violation of the platform's Terms of Service (YouTube, TikTok, Instagram, Facebook, etc.).</li>
              <li>Circumvent DRM (Digital Rights Management) protections or platform restrictions.</li>
              <li>Download videos for commercial purposes without rights.</li>
              <li>Redistribute downloaded videos without the creator's permission.</li>
              <li>Download private, unlisted, or restricted videos.</li>
            </ul>
            <p className="mt-3 text-red-400 font-semibold">
              Unauthorized downloading is copyright infringement and may result in legal liability. 
              You assume all responsibility for your use of these tools.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Disclaimer of Warranties</h2>
            <p>
              MiniTools and its content are provided on an "AS IS" and "AS AVAILABLE" basis. 
              MiniTools makes no representations or warranties of any kind, expressed or implied, 
              regarding the tools, including but not limited to implied warranties of 
              merchantability, fitness for a particular purpose, or non-infringement.
            </p>
            <p className="mt-3">
              <strong>We do not guarantee that:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>The site will be error-free or uninterrupted.</li>
              <li>All tools will work with all file types, browsers, or devices.</li>
              <li>Downloaded content will be complete, accurate, or malware-free.</li>
              <li>Any tool results are suitable for your intended use.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Limitation of Liability</h2>
            <p>
              In no event shall MiniTools be liable for any indirect, incidental, special, 
              consequential, or punitive damages arising from your use of or inability to use 
              the tools, including:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Loss of data or files.</li>
              <li>Lost profits or revenue.</li>
              <li>Copyright claims or legal issues related to downloaded content.</li>
              <li>Damage to your device, data, or software.</li>
              <li>Any third-party claims against you.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless MiniTools from any claims, damages, 
              or costs (including legal fees) arising from:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Your use or misuse of the tools.</li>
              <li>Your violation of these Terms of Service.</li>
              <li>Your violation of any law, regulation, or third-party rights.</li>
              <li>Copyright infringement or other intellectual property claims related to your downloads.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Prohibited Activities</h2>
            <p>
              You agree NOT to:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Violate any local, state, national, or international law or regulation.</li>
              <li>Infringe on any intellectual property, privacy, or publicity rights.</li>
              <li>Harass, abuse, threaten, or defame any person or entity.</li>
              <li>Submit malware, viruses, or malicious code.</li>
              <li>Attempt to gain unauthorized access to any systems or accounts.</li>
              <li>Use any tool to download, scrape, or access content in violation of platform Terms.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Modification of Terms</h2>
            <p>
              MiniTools reserves the right to revise these Terms at any time without notice. 
              Your continued use of the site following any changes means you accept the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to MiniTools at any time 
              for violations of these Terms or any applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Severability</h2>
            <p>
              If any provision of these Terms is found to be unenforceable, the remaining 
              provisions shall continue in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">10. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the jurisdiction where MiniTools is operated, 
              without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">11. Contact</h2>
            <p>
              Questions about these terms? <a href="/contact" className="text-primary-500 hover:underline">Contact us</a> 
              or email <strong>support@minitools.app</strong>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
