import { useSearchParams, Link } from 'react-router-dom';
import { tools, categories } from '../data/toolsData';
import ToolCard from '../components/common/ToolCard';

export default function Home() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search')?.toLowerCase() || '';

  const filteredTools = tools.filter(tool => {
    if (!search) return true;
    return (
      tool.name.toLowerCase().includes(search) ||
      tool.description.toLowerCase().includes(search) ||
      tool.category.toLowerCase().includes(search)
    );
  });

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
            50+ Free Online Tools
          </span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Text, Image, Calculator, Converter, Developer aur Fun tools - sab kuch ek jagah.
          Free, fast aur secure - koi data server par nahi jata.
        </p>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat) => {
          const count = tools.filter(t => t.category === cat.id).length;
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <div className="text-4xl mb-3">🔍</div>
            <p>Koi tool nahi mila. Kuch aur try karein.</p>
          </div>
        )}
      </div>
    </div>
  );
}