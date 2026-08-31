// src/components/common/ToolContent.jsx
// SEO content rendered under every tool.
// Sections: About (unique per tool) → Supported Inputs/Outputs → How to Use →
// Key Features → Limitations → FAQ → Related Tools → category hub links.
// The FAQ uses native <details>/<summary> so EVERY question and answer is
// present in the initial HTML — crawlable by Google and always in sync with
// the FAQPage JSON-LD. Content copy comes from data/toolContentData.js
// (unique per tool) via src/utils/seo/toolContent.js.
import React from 'react';
import { Link } from 'react-router-dom';
import { buildFAQs } from '../../utils/seo/schema';
import {
  buildHowToSteps,
  buildFeatures,
  buildAbout,
  buildFormats,
  buildLimits,
} from '../../utils/seo/toolContent';
import { getToolsByCategory, categories } from '../../data/toolsData';

export default function ToolContent({ tool }) {
  const faqs = buildFAQs(tool);
  const steps = buildHowToSteps(tool);
  const features = buildFeatures(tool);
  const about = buildAbout(tool);
  const formats = buildFormats(tool);
  const limits = buildLimits(tool);
  const related = getToolsByCategory(tool.category)
    .filter((t) => t.id !== tool.id)
    .slice(0, 8);
  const category = categories.find((c) => c.id === tool.category);

  return (
    <section className="prose prose-slate dark:prose-invert max-w-none mt-10 space-y-6">
      {/* Unique per-tool intro — sourced from data/toolContentData.js */}
      <h2 className="text-2xl font-bold">About the {tool.name}</h2>
      <p className="text-gray-700 dark:text-gray-300">{about}</p>

      {/* Supported inputs / outputs — concrete and tool-specific */}
      <h2 className="text-2xl font-bold">Supported Inputs &amp; Outputs</h2>
      <p className="text-gray-700 dark:text-gray-300">{formats}</p>

      {/* ===== How to Use — <h2> + <ol> ===== */}
      <h2 className="text-2xl font-bold">How to Use the {tool.name}</h2>
      <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
        {steps.map((s, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={i}>{s}</li>
        ))}
      </ol>

      {/* ===== Key Features & Benefits — <h2> + <ul> ===== */}
      <h2 className="text-2xl font-bold">Key Features &amp; Benefits of the {tool.name}</h2>
      <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
        {features.map((f, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={i}>{f}</li>
        ))}
      </ul>

      {/* ===== Limitations — honest, tool-specific ===== */}
      <h2 className="text-2xl font-bold">{tool.name} Limitations</h2>
      <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
        {limits.map((l, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={i}>{l}</li>
        ))}
      </ul>

      {/* ===== FAQ — native <details>: every answer is in the initial HTML ===== */}
      <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
      <div className="space-y-3 not-prose">
        {faqs.map((f, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <details key={i} className="border border-gray-300 dark:border-gray-600 rounded-lg" open={i === 0}>
            <summary className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              {f.q}
            </summary>
            <div className="px-4 pb-3 text-gray-700 dark:text-gray-300">{f.a}</div>
          </details>
        ))}
      </div>

      {/* Related tools — internal linking for SEO + user retention */}
      {related.length > 0 && (
        <>
          <h2 className="text-2xl font-bold">Related Tools</h2>
          <div className="flex flex-wrap gap-2 not-prose">
            {related.map((t) => (
              <Link
                key={t.id}
                to={`/tools/${t.id}`}
                className="inline-block px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
              >
                {t.icon} {t.name}
              </Link>
            ))}
          </div>
        </>
      )}

      {/* Category hub link — a crawlable path back to all sibling tools */}
      {category && (
        <p className="not-prose text-sm text-gray-600 dark:text-gray-400">
          Browse all{' '}
          <Link
            to={`/category/${category.id}`}
            className="text-primary-600 dark:text-primary-400 hover:underline"
          >
            {category.name}
          </Link>{' '}
          on MiniTools.
        </p>
      )}

    </section>
  );
}