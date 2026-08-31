import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';

// Lazy-load ToolPage to move heavy SEO data files (toolFAQs, toolMeta)
// and schema utilities out of the initial bundle. This reduces the main
// chunk by ~80 kB; those modules are only fetched when a user opens a tool.
const ToolPage = lazy(() => import('./pages/ToolPage'));

// Warm the ToolPage chunk during idle time so navigating to any tool page
// renders instantly (no Suspense fallback swap => no layout shift). This
// never blocks the critical path: it only runs after first paint + idle.
let toolPagePreloaded = false;
function preloadToolPage() {
  if (toolPagePreloaded) return;
  toolPagePreloaded = true;
  import('./pages/ToolPage');
}

export default function App() {
  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(preloadToolPage, { timeout: 3000 });
      return () => cancelIdleCallback(id);
    }
    const t = setTimeout(preloadToolPage, 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route
              path="/tools/:toolId"
              element={
                <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
                  <ToolPage />
                </Suspense>
              }
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}