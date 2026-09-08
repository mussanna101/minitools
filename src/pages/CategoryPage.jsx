import { Link, useParams } from 'react-router-dom';
import { categories, getToolsByCategory, tools } from '../data/toolsData';
import ToolCard from '../components/common/ToolCard';
import SEO from '../components/common/SEO';

export default function CategoryPage() {
  const { categoryId } = useParams();
  const category = categories.find(c => c.id === categoryId);
  const categoryTools = getToolsByCategory(categoryId);

  if (!category) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Category not found</h2>
        <Link to="/" className="btn-primary inline-block">Back to Home</Link>
      </div>
    );
  }

  // ItemList structured data: tells Google exactly which tools belong to this
  // category hub, matching the links rendered below.
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${category.name} - Free Online Tools`,
    itemListElement: categoryTools.map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: tool.name,
      url: `https://minitools-silk.vercel.app/tools/${tool.id}`,
    })),
  };

  return (
    <>
      <SEO
        title={`Free Online ${category.name} | MiniTools`}
        description={category.metaDescription || `${category.description} Explore ${categoryTools.length} free ${category.name.toLowerCase()} utilities with no account required.`}
        canonical={`https://minitools-silk.vercel.app/category/${category.id}`}
        jsonLd={itemList}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-gray-500 dark:text-gray-400 mb-3">
        <ol className="flex items-center gap-1.5">
          <li><Link to="/" className="hover:underline text-primary-600 dark:text-primary-400">Home</Link></li>
          <li aria-hidden="true" className="text-gray-400 dark:text-gray-500">/</li>
          <li className="text-gray-700 dark:text-gray-200 font-medium">{category.name}</li>
        </ol>
      </nav>
      <div className="space-y-6">
        <div className={`rounded-2xl p-6 bg-gradient-to-r ${category.color} text-white`}>
          <div className="flex items-center space-x-4">
            <span className="text-4xl">{category.icon}</span>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{category.name}</h1>
              <p className="opacity-90">{category.description} {categoryTools.length} tools available.</p>
            </div>
          </div>
        </div>

        {/* Category intro — unique editorial content for this hub */}
        {category.intro && (
          <p className="text-gray-700 dark:text-gray-300 max-w-none">{category.intro}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categoryTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {/* Browse other categories — keeps Googlebot moving through the hub pages */}
        <div>
          <h2 className="text-xl font-bold mb-3">Browse Other Categories</h2>
          <div className="flex flex-wrap gap-2">
            {categories
              .filter((c) => c.id !== category.id)
              .map((c) => {
                const count = tools.filter((t) => t.category === c.id).length;
                return (
                  <Link
                    key={c.id}
                    to={`/category/${c.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
                  >
                    <span aria-hidden="true">{c.icon}</span>
                    {c.name}
                    <span className="text-xs text-gray-500 dark:text-gray-400">({count})</span>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}