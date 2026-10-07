/**
 * CategoryIcon
 *
 * Renders a Lucide SVG icon for a given category id. Each category gets a
 * distinct Lucide icon name plus a vibrant accent color applied to its
 * icon box so the category cards look lively and distinguishable.
 *
 * Lucide renders inline SVGs via the global `lucide` object loaded from
 * the CDN in index.html. We use the `data-lucide` attribute and call
 * `lucide.createIcons()` so the icons are created dynamically.
 */

// Map category id -> { icon, accent (tailwind gradient), glow (shadow color) }
const CATEGORY_ICON_MAP = {
  pdf: { icon: 'file-text', accent: 'from-cyan-400 to-blue-600', glow: 'rgba(56, 189, 248, 0.55)' },
  text: { icon: 'type', accent: 'from-blue-400 to-indigo-600', glow: 'rgba(99, 102, 241, 0.55)' },
  image: { icon: 'image', accent: 'from-pink-400 to-rose-600', glow: 'rgba(244, 114, 182, 0.55)' },
  calculator: { icon: 'calculator', accent: 'from-green-400 to-emerald-600', glow: 'rgba(52, 211, 153, 0.55)' },
  converter: { icon: 'refresh-cw', accent: 'from-orange-400 to-amber-600', glow: 'rgba(251, 146, 60, 0.55)' },
  developer: { icon: 'code', accent: 'from-purple-400 to-violet-600', glow: 'rgba(167, 139, 250, 0.55)' },
  media: { icon: 'play', accent: 'from-red-400 to-pink-600', glow: 'rgba(244, 63, 94, 0.55)' },
  fun: { icon: 'dice-1', accent: 'from-yellow-400 to-orange-500', glow: 'rgba(250, 204, 21, 0.55)' },
};

const FALLBACK = { icon: 'layout-grid', accent: 'from-gray-400 to-gray-600', glow: 'rgba(156, 163, 175, 0.5)' };

export function getCategoryIcon(categoryId) {
  return CATEGORY_ICON_MAP[categoryId] || FALLBACK;
}

export default function CategoryIcon({ categoryId, size = 28, className = '' }) {
  const meta = getCategoryIcon(categoryId);

  return (
    <span
      className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-br ${meta.accent} p-2 shadow-lg ${className}`}
      style={{ boxShadow: `0 0 22px -2px ${meta.glow}, 0 8px 20px -6px rgba(0,0,0,0.5)` }}
      aria-hidden="true"
    >
      <i data-lucide={meta.icon} style={{ width: size, height: size }} className="text-white" />
    </span>
  );
}