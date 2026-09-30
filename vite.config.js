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
  const values = {
    SITE_TITLE: `${siteConfig.name} | ${siteConfig.tagline}`,
    SITE_DESCRIPTION: siteConfig.description,
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
  plugins: [react(), siteMetadata()],
  test: {
    environment: 'node',
    include: ['src/**/*.test.js'],
  },
})
