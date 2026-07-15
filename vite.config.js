import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: false,
  plugins: [
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
