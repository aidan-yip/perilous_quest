const CACHE_NAME = "static_cache"
const STATIC_ASSETS = [
    '/index.html',
    '/start.css',
    '/app_start.js',
    '/manifest.json',
    '/read/index.html',
    '/public/perilous_quest/index.html',
    '/public/perilous_quest/styles.css',
    '/public/perilous_quest/script.js',
    '/public/perilous_quest/dark_mode.css',
    '/public/favicon.ico',
    '/public/wonder.wav',
    '/public/lovely_town.wav',
    'public/boss_theme.wav',
    '/public/selectfx.wav',
    '/public/select_null.wav',
    '/public/lose.wav',
]

async function preCache() {
    const cache = await caches.open(CACHE_NAME)
    return cache.addAll(STATIC_ASSETS)
}

self.addEventListener('install', event => {
    console.log("[SW] installed");
    self.skipWaiting()
    event.waitUntil(preCache())
})

self.addEventListener("fetch", (event) => {
    event.respondWith(
      (async () => {
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) return cachedResponse;
        return fetch(event.request);
      })(),
    );
  });

async function cleanupCache() {
    const keys = await caches.keys()
    const keysToDelete = keys.map(key => {
        if (key !== CACHE_NAME) {
            return caches.delete(key)
        }
    })

    return Promise.all(keysToDelete)

}

self.addEventListener('activate', event => {
    console.log("[SW] activated");
    event.waitUntil(cleanupCache())
})

async function fetchAssets(event) {
    try {
        const response = await fetch(event.request)
        return response
    } catch (err) {
        const cache = await caches.open(CACHE_NAME)
        return cache.match(event.request)
    }
}

self.addEventListener('fetch', event => {
    console.log("[SW] fetched");
    event.respondWith(fetchAssets(event))
})
