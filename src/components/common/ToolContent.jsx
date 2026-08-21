// src/components/common/ToolContent.jsx
// SEO content template rendered under every tool.
// Supplies the 3 keyword-rich, natural UI sections that appear on scroll below
// the tool component:
//   1. How to Use [Tool Name]        — <h2> + <ol> step-by-step guide
//   2. Key Features & Benefits       — <h2> + <ul> bullet points
//   3. Frequently Asked Questions    — interactive accordion (<h2> + <h3>)
// The FAQ questions/answers also feed the FAQPage JSON-LD schema via buildFAQs()
// (see src/utils/seo/schema.js), so on-page content and structured data always
// match. Content copy is generated in src/utils/seo/toolContent.js.
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { buildFAQs } from '../../utils/seo/schema';
import { buildHowToSteps, buildFeatures, getProcessingDisclosure } from '../../utils/seo/toolContent';
import { getToolsByCategory } from '../../data/toolsData';

export default function ToolContent({ tool }) {
  const faqs = buildFAQs(tool);
  const steps = buildHowToSteps(tool);
  const features = buildFeatures(tool);
  const [openIndex, setOpenIndex] = useState(0); // FAQ accordion: first open by default
  const related = getToolsByCategory(tool.category)
    .filter((t) => t.id !== tool.id)
    .slice(0, 8);

  return (
    <section className="prose prose-slate dark:prose-invert max-w-none mt-10 space-y-6">
      {/* High-intent intro */}
      <h2 className="text-2xl font-bold">Free {tool.name} Online — No Signup, No Limits</h2>
      <p className="text-gray-700 dark:text-gray-300">
        The {tool.name} lets you {tool.description.toLowerCase()} {getProcessingDisclosure(tool)}
      </p>

      {/* ===== 1. How to Use — <h2> + <ol> ===== */}
      <h2 className="text-2xl font-bold">How to Use the {tool.name}</h2>
      <p className="text-gray-700 dark:text-gray-300">
        Using the {tool.name} takes just a few seconds. Follow these simple steps to get an
        accurate, free result every time.
      </p>
      <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
        {steps.map((s, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={i}>{s}</li>
        ))}
      </ol>

      {/* ===== 2. Key Features & Benefits — <h2> + <ul> ===== */}
      <h2 className="text-2xl font-bold">Key Features &amp; Benefits of the {tool.name}</h2>
      <p className="text-gray-700 dark:text-gray-300">
        The {tool.name} has focused features for completing this task in your browser or through
        the disclosed processing service:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
        {features.map((f, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={i}>{f}</li>
        ))}
      </ul>

      {/* ===== 3. FAQ — interactive accordion ===== */}
      <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
      <div className="space-y-3 not-prose">
        {faqs.map((f, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <span>{f.q}</span>
                <svg
                  className={`w-5 h-5 shrink-0 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isOpen && (
                <div className="px-4 pb-3 text-gray-700 dark:text-gray-300">
                  {f.a}
                </div>
              )}
            </div>
          );
        })}
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
    </section>
  );
}