// src/config.js
// Central runtime config for the frontend's video-downloader tools.
//
// Backend URL resolution order (highest priority first):
//   1. User override saved in localStorage (set from the tool's UI)
//   2. VITE_BACKEND_URL build-time env var (set in Vercel/Railway)
//   3. Hardcoded production default (falls back automatically so the tools
//      never call localhost in production)
//
// Example:  VITE_BACKEND_URL=https://your-backend.up.railway.app

const STORAGE_KEY = 'minitools_backend_url';

// The production backend (Railway). Change here if you move hosts.
const PRODUCTION_BACKEND = 'https://minitools-production-0646.up.railway.app';

export function normalizeBackendUrl(url) {
  return String(url || '').trim().replace(/\/+$/, '');
}

function defaultBackendUrl() {
  const fromEnv = import.meta.env && import.meta.env.VITE_BACKEND_URL;
  if (fromEnv && fromEnv.trim()) return normalizeBackendUrl(fromEnv);
  return normalizeBackendUrl(PRODUCTION_BACKEND);
}

// Current backend URL to use for requests (has user-override priority).
export function getBackendUrl() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && saved.trim()) return normalizeBackendUrl(saved);
  } catch {
    /* localStorage unavailable (private mode) — fall through */
  }
  return defaultBackendUrl();
}

// Persist a user-provided backend URL so it survives reloads.
export function setBackendUrl(url) {
  try {
    localStorage.setItem(STORAGE_KEY, normalizeBackendUrl(url));
  } catch {
    /* ignore storage errors */
  }
}

// Backward-compatible constant for any code that imports it directly.
export const BACKEND_URL = getBackendUrl();
