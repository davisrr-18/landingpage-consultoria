import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { siteConfig } from './src/config/site.js'

const HTML_ESCAPES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => HTML_ESCAPES[char])
}

/** Preenche os metadados do index.html a partir de src/config/site.js. */
function siteMetadata() {
  const { url, shareImage } = siteConfig
  const values = {
    SITE_TITLE: `${siteConfig.name} | ${siteConfig.tagline}`,
    SITE_DESCRIPTION: siteConfig.description,
    SITE_URL: url,
    SITE_IMAGE: new URL(shareImage.path, url).href,
    SITE_IMAGE_WIDTH: shareImage.width,
    SITE_IMAGE_HEIGHT: shareImage.height,
    SITE_IMAGE_ALT: shareImage.alt,
  }

  return {
    name: 'site-metadata',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) =>
        html.replace(/%(SITE_[A-Z_]+)%/g, (match, key) =>
          key in values ? escapeHtml(values[key]) : match,
        ),
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  // No GitHub Pages o site é servido em /<repositório>/; o workflow define VITE_BASE_PATH.
  base: process.env.VITE_BASE_PATH ?? '/',
  plugins: [react(), siteMetadata()],
  test: {
    environment: 'node',
    include: ['src/**/*.test.js'],
  },
})
