/**
 * PWA LOADER
 * Service Worker registration and PWA support
 * Now exported as ES module.
 */

export function initPWA() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    const installingWorker = registration.installing;
                    if (installingWorker) {
                        installingWorker.addEventListener('statechange', (e) => {
                            if (e.target.state === 'installed' && navigator.serviceWorker.controller) {
                                if (window.confirm('New content available! Reload to update?')) {
                                    window.location.reload();
                                }
                            }
                        });
                    }
                })
                .catch(() => {
                    // SW registration failed
                });
        });
    }
}
