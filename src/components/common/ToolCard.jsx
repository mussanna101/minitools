import { Link } from 'react-router-dom';

export default function ToolCard({ tool }) {
  return (
    <Link to={`/tools/${tool.id}`} className="tool-card group">
      <div className="flex items-start justify-between">
        <span className="text-3xl mb-3">{tool.icon}</span>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
          {tool.category}
        </span>
      </div>
      <h3 className="font-semibold text-lg mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {tool.name}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{tool.description}</p>
    </Link>
  );
}