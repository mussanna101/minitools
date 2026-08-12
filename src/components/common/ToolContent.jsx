// src/components/common/ToolContent.jsx
// SEO content template rendered under every tool.
// Supplies high-intent H1/H2/H3, a privacy/how-it-works block, and 4 FAQs
// that ALSO feed the FAQPage JSON-LD schema (see src/utils/seo/schema.js).
import React from 'react';
import { buildFAQs } from '../../utils/seo/schema';

export default function ToolContent({ tool }) {
  const faqs = buildFAQs(tool);

  return (
    <section className="prose prose-slate dark:prose-invert max-w-none mt-10 space-y-6">
      {/* High-intent H2 intro */}
      <h2 className="text-2xl font-bold">Free {tool.name} Online — No Signup, No Limits</h2>
      <p className="text-gray-700 dark:text-gray-300">
        The {tool.name} is a fast, free, browser-based utility that lets you complete the task
        instantly without installing anything. It is designed for students, writers, developers,
        and everyday users who need a reliable result in seconds. Because the tool runs entirely
        on your device, your input is never uploaded to any server — making it ideal for private
        or sensitive content.
      </p>

      {/* H2: how it works */}
      <h3 className="text-xl font-semibold">How the {tool.name} Works</h3>
      <p className="text-gray-700 dark:text-gray-300">
        Simply open the tool above, enter or paste your input, and the result updates in real
        time. There are no buttons to search for and no waiting — every calculation or conversion
        is performed locally using efficient JavaScript. You can repeat the process as many times
        as you like, completely free, with no account and no watermarks.
      </p>

      {/* H2: privacy */}
      <h3 className="text-xl font-semibold">Is the {tool.name} Private &amp; Secure?</h3>
      <p className="text-gray-700 dark:text-gray-300">
        Yes. All processing happens inside your browser. Your text, files, and numbers never
        leave your device, so you can use the {tool.name} with total confidence even for
        confidential work. There is no data collection, no tracking, and no hidden storage.
      </p>

      {/* H2: benefits */}
      <h3 className="text-xl font-semibold">Why People Choose the {tool.name}</h3>
      <p className="text-gray-700 dark:text-gray-300">
        It is 100% free, works on every device and browser, and gives accurate results instantly.
        Whether you need a quick answer or repeated use, the {tool.name} saves you time and is
        always available whenever you need it.
      </p>

      {/* H2: FAQ */}
      <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((f, i) => (
          // Use index-based, stable keys for static FAQ ordering
          // eslint-disable-next-line react/no-array-index-key
          <div key={i}>
            <h3 className="font-semibold">{f.q}</h3>
            <p className="text-gray-700 dark:text-gray-300">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}