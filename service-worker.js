// FrankPass Service Worker v2.3.2 - PWA Offline Caching
const CACHE_NAME = 'frankpass-v2.3.2';
const CACHED_URLS = [
    './',
    'index.html',
    'about-us.html',
    'faq.html',
    'docs.html',
    'legal.html',
    'get-started.html',
    'pro.html',
    'style.css',
    'frankpass-config.js',
    'frankpass-utils.js',
    'footer.js',
    'frankpass-core.js',
    'crypto-worker.js',
    'platforms.js',
    'translations.js',
    'country-data.js',
    'country-dropdown.js',
    'manifest.json',
    'icons/favicon.png'
];

// Install: Cache all existing core assets cleanly
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(CACHED_URLS);
        })
    );
    self.skipWaiting();
});

// Activate: Clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        })
    );
    self.clients.claim();
});

// Fetch: Offline-first cache strategy with network fallback
self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).catch(() => {
                return caches.match(event.request) || caches.match('index.html') || caches.match('./');
            })
        );
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request);
        })
    );
});
