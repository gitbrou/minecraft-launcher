import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { readFileSync } from 'node:fs'

const pkg = JSON.parse(readFileSync(path.join(__dirname, 'package.json'), 'utf8'))

// Сборка только renderer-части для встраивания в Android WebView.
// Electron-плагин тут не нужен, ассеты должны открываться с file://.
export default defineConfig({
  base: './',
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version)
  },
  plugins: [react()],
  build: {
    outDir: 'dist-web',
    emptyOutDir: true,
    rollupOptions: {
      input: path.join(__dirname, 'index.html')
    }
  }
})
