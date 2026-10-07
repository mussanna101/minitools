import { Link } from 'react-router-dom';
import { getCategoryIcon } from '../CategoryIcon';

export default function ToolCard({ tool }) {
  const meta = getCategoryIcon(tool.category);

  return (
    <Link to={`/tools/${tool.id}`} className="tool-card group">
      <div className="flex items-start justify-between">
        <span
          className={`inline-flex items-center justify-center rounded-xl p-2 mb-3 bg-gradient-to-br ${meta.accent}`}
          style={{ boxShadow: `0 0 18px -3px ${meta.glow}` }}
          aria-hidden="true"
        >
          <i data-lucide={meta.icon} style={{ width: 26, height: 26 }} className="text-white" />
        </span>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100/80 dark:bg-white/10 text-gray-600 dark:text-gray-200 backdrop-blur-sm">
          {tool.category}
        </span>
      </div>
      <h3 className="font-semibold text-lg mb-1 text-gray-900 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400 transition-colors">
        {tool.name}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300/90">{tool.description}</p>
    </Link>
  );
}