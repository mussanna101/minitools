import { Link, useParams } from 'react-router-dom';
import { categories, getToolsByCategory } from '../data/toolsData';
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

  return (
    <>
      <SEO
        title={`Free Online ${category.name} | MiniTools`}
        description={`${category.description} Explore ${categoryTools.length} free ${category.name.toLowerCase()} utilities with no account required.`}
        canonical={`https://minitools-silk.vercel.app/category/${category.id}`}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categoryTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </>
  );
}