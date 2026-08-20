// vite.config.prerender-plugin.mjs
// OPTIONAL: uses vite-plugin-prerender (puppeteer / headless Chrome) to render the
// REAL client-side DOM for every route into dist-plugin-rendered/.
//
// WHY NOT THE DEFAULT: it needs a Chromium binary at build time (puppeteer) and
// renders every route in a headless browser — slow and fragile on serverless
// builders (e.g. Vercel). The repo's default prerender (scripts/prerender-static.mjs)
// is deterministic, dependency-free and production-safe. Use this plugin script when
// you want a true client-rendered snapshot and can guarantee Chrome at build time.
//
// Run:  npm run prerender:plugin
//
// Note: the plugin ships an ESM build that uses top-level require(), which the
// Vite 5 config loader rejects — so we load its CJS build via createRequire.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { tools, categories } from './src/data/toolsData.js'

const require = createRequire(import.meta.url)
const __dirname = dirname(fileURLToPath(import.meta.url))

const vitePrerender = require('vite-plugin-prerender')

const routes = [
  '/',
  ...categories.map((c) => `/category/${c.id}`),
  ...tools.map((t) => `/tools/${t.id}`),
]

export default defineConfig({
  plugins: [
    react(),
    vitePrerender({
      staticDir: join(__dirname, 'dist'),
      indexPath: join(__dirname, 'dist', 'index.html'),
      outputDir: join(__dirname, 'dist-plugin-rendered'),
      routes,
      renderer: new vitePrerender.PuppeteerRenderer({
        headless: true,
        renderAfterTime: 5000,
        maxConcurrentRoutes: 4,
      }),
    }),
  ],
})
