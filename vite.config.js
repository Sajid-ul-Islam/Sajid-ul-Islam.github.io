import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

function copyStaticAssetsPlugin() {
  return {
    name: 'copy-static-assets',
    closeBundle() {
      const distDir = path.resolve(process.cwd(), 'dist');
      const itemsToCopy = ['assets', 'img', 'sounds', 'manifest.json', 'sw.js'];
      for (const item of itemsToCopy) {
        const srcPath = path.resolve(process.cwd(), item);
        const destPath = path.resolve(distDir, item);
        if (fs.existsSync(srcPath)) {
          fs.cpSync(srcPath, destPath, { recursive: true, force: true });
        }
      }
    }
  };
}

export default defineConfig({
  root: '.',
  publicDir: false,
  plugins: [
    copyStaticAssetsPlugin(),
    {
      name: 'disable-stdin-shortcuts',
      configureServer(server) {
        process.stdin.pause();
        process.stdin.on('error', (err) => {
          console.warn('[VITE] Suppressed stdin error:', err.message);
        });
        process.on('uncaughtException', (err) => {
          if (err && (err.code === 'UNKNOWN' || err.syscall === 'read')) {
            console.warn('[VITE] Suppressed filesystem read stream error:', err.message);
          } else {
            console.error('[VITE] Uncaught Exception:', err);
          }
        });
      }
    }
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        themeLamplight: 'theme-lamplight.html',
        themeTactical: 'theme-tactical.html',
        themeIronforge: 'theme-ironforge.html',
        themeSketchbook: 'theme-sketchbook.html',
        resume: 'resume.html'
      },
    },
  },
  css: {
    devSourcemap: true,
  },
  server: {
    port: 3000,
    open: true,
    watch: {
      usePolling: true,
      interval: 500,
      ignored: [
        '**/.git/**',
        '**/node_modules/**',
        '**/.idea/**',
        '**/.vscode/**',
        '**/*.tmp',
        '**/~*'
      ]
    }
  },
});
