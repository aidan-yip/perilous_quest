const CACHE_NAME = "static_cache"
const STATIC_ASSETS = [
    '/',
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
    '/public/wonder.mp3',
    '/public/lovely_town.mp3',
    'public/boss_theme.mp3',
    '/public/selectfx.mp3',
    '/public/select_null.mp3',
    '/public/lose.mp3',
    '/404.html',
    'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0',
    'https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap',
    'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap',
    '/public/perilous_quest/other_scripts/vanilla-tilt-min.js',
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
