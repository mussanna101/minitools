import { Link, useParams } from 'react-router-dom';
import { categories } from '../../data/toolsData';
import { getCategoryIcon } from '../CategoryIcon';

export default function Sidebar() {
  const { categoryId } = useParams();

  return (
    <aside className="w-64 shrink-0 hidden md:block">
      <nav className="sticky top-20 space-y-1">
        <Link
          to="/"
          className={`block px-4 py-2.5 rounded-lg font-medium transition-colors ${
            !categoryId
              ? 'bg-primary-600 text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <i data-lucide="house" style={{ width: 16, height: 16 }} className="inline-block align-[-2px] mr-2" aria-hidden="true" />
          All Tools
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/category/${cat.id}`}
            className={`block px-4 py-2.5 rounded-lg font-medium transition-colors ${
              categoryId === cat.id
                ? 'bg-primary-600 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <i
              data-lucide={getCategoryIcon(cat.id).icon}
              style={{ width: 15, height: 15 }}
              className="inline-block align-[-2px] mr-2"
              aria-hidden="true"
            />
            {cat.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}