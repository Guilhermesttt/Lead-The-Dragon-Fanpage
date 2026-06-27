import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const logoSrc = resolve('src/assets/Lead The Dragon Logo.jpg')
const faviconDest = resolve('public/favicon.jpg')

function copyFaviconPlugin(): Plugin {
  return {
    name: 'copy-favicon',
    buildStart() {
      if (!existsSync(logoSrc)) return
      copyFileSync(logoSrc, faviconDest)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [copyFaviconPlugin(), react(), tailwindcss()],
})
