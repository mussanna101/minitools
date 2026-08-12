import { Link, useParams } from 'react-router-dom';
import { categories, getToolsByCategory } from '../data/toolsData';
import ToolCard from '../components/common/ToolCard';

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
    <div className="space-y-6">
      <div className={`rounded-2xl p-6 bg-gradient-to-r ${category.color} text-white`}>
        <div className="flex items-center space-x-4">
          <span className="text-4xl">{category.icon}</span>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{category.name}</h1>
            <p className="opacity-90">{categoryTools.length} tools available</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categoryTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
}