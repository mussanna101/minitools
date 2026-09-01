import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { tools, categories } from '../data/toolsData';
import ToolCard from '../components/common/ToolCard';
import SEO from '../components/common/SEO';
// All tools render as HTML links by default (no JS-gated "Load more") so
// Googlebot can crawl every tool page directly from the home snapshot.
export default function Home() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search')?.toLowerCase() || '';

  const filteredTools = tools.filter((tool) => {
    if (!search) return true;
    return (
      tool.name.toLowerCase().includes(search) ||
      tool.description.toLowerCase().includes(search) ||
      tool.category.toLowerCase().includes(search)
    );
  });

  const visibleTools = filteredTools;

  return (
    <>
      <SEO
        title={`MiniTools: ${tools.length}+ Free Online Tools | PDF, Text & Image`}
        canonical="https://minitools-silk.vercel.app/"
      />
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center py-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              {tools.length}+ Free Online Tools
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Text, Image, Calculator, Converter, Developer, and Fun tools — all in one place.
            Free utilities for browser-based work. Currency rates and QR images use third-party APIs, while video downloads use the configured backend.
          </p>
        </div>

        {/* AdSense Ad Unit - Horizontal Banner
          Removed until a real slot ID is created in AdSense dashboard.
          When ready, add back:
          <div className="mb-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center" style={{ minHeight: '90px' }}>
              <ins
                className="adsbygoogle"
                style={{ display: 'block', width: '100%', minHeight: '90px' }}
                data-ad-client="ca-pub-9674079530936526"
                data-ad-slot="[INSERT_REAL_SLOT_ID_HERE]"
                data-ad-format="auto"
                data-full-width-responsive="true"
              ></ins>
              <script>{"(adsbygoogle = window.adsbygoogle || []).push({});"}</script>
            </div>
          </div>
        */}

        {/* Categories */}
        <h2 className="text-2xl font-bold mb-4">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => {
            const count = tools.filter((t) => t.category === cat.id).length;
            return (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className={`card text-center hover:scale-105 transition-transform bg-gradient-to-br ${cat.color} text-white border-0`}
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <div className="font-semibold text-sm">{cat.name}</div>
                <div className="text-xs opacity-80">{count} tools</div>
              </Link>
            );
          })}
        </div>

        {/* Search Results / All Tools */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            {search ? `Search Results for "${search}"` : 'All Tools'}
          </h2>

          {filteredTools.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {visibleTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <div className="text-4xl mb-3">🔍</div>
              <p>No tool found. Try a different search.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
