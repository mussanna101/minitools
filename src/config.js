// src/config.js
// Central runtime config for the frontend.
// The download tools call a self-hosted yt-dlp backend. Override the URL at
// build time with a Vite env var:
//
//   VITE_BACKEND_URL=https://your-backend.example.com
//
// Default keeps local development working against `npm start` in /server.

export const BACKEND_URL =
  (import.meta.env && import.meta.env.VITE_BACKEND_URL) || 'http://localhost:4000';
