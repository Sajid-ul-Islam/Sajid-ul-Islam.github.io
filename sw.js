/**
 * TACTICAL SERVICE WORKER V2
 * PWA Support for offline functionality with Network-First strategy for updates
 */

const CACHE_NAME = 'tactical-intel-v4';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/resume.html',
    '/css/modern-custom.css',
    '/css/tactical-hud.css',
    '/css/tactical-enhancements.css',
    '/css/deep-black-terminal.css',
    '/css/floating-widgets.css',
    '/css/github-feed.css',
    '/css/color-palette.css',
    '/css/shared-components.css',
    '/js/data/index.js',
    '/js/audio-engine.js',
    '/js/tactical-core.js',
    '/js/tactical-data.js',
    '/js/pwa-loader.js',
    '/js/tactical-widgets.js',
    '/js/tactical-enhancements.js',
    '/js/widgets.js',
    '/js/terminal.js',
    '/js/ai-bot.js',
    '/js/floating-widgets.js',
    '/js/github-feed.js',
    '/js/portfolio-bridge.js',
    '/js/command-palette.js',
    '/js/theme-accent.js',
    '/js/theme-init.js',
    '/js/theme-switcher-ripple.js',
    '/img/profile.jpg',
    '/manifest.json',
    '/sw.js'
];

// Install: Cache static assets
self.addEventListener('install', (event) => {
    console.log('[SW] Installing Tactical Service Worker V2...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate: Clean up old caches immediately
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating Tactical Service Worker V2...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => {
                        console.log('[SW] Deleting old cache:', name);
                        return caches.delete(name);
                    })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch: Network-First for navigation (HTML), Stale-While-Revalidate for others
self.addEventListener('fetch', (event) => {
    const isNavigation = event.request.mode === 'navigate';
    const isRoot = new URL(event.request.url).pathname === '/';

    if (isNavigation || isRoot) {
        // Network-First strategy for index.html/root
        event.respondWith(
            fetch(event.request)
                .then((networkResponse) => {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                    return networkResponse;
                })
                .catch(() => {
                    return caches.match(event.request) || caches.match('/index.html');
                })
        );
    } else {
        // Stale-While-Revalidate strategy for static assets
        event.respondWith(
            caches.match(event.request)
                .then((cachedResponse) => {
                    const fetchPromise = fetch(event.request)
                        .then((networkResponse) => {
                            if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                                const responseClone = networkResponse.clone();
                                caches.open(CACHE_NAME).then((cache) => {
                                    cache.put(event.request, responseClone);
                                });
                            }
                            return networkResponse;
                        });
                    return cachedResponse || fetchPromise;
                })
        );
    }
});

// Message handling for skip waiting
self.addEventListener('message', (event) => {
    if (event.data === 'skipWaiting') {
        self.skipWaiting();
    }
});

