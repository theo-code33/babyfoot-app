var CACHE_NAME = 'babyfoot-app-pwa';
var urlsToCache = [
    '/',
]

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    )
})

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if(response) {
                    return response;
                }
                return fetch(event.request);
            })
    )
})

self.addEventListener('activate', (event) => {
    var cacheWhiteList = ['babyfoot-app-pwa'];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if(cacheWhiteList.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
})