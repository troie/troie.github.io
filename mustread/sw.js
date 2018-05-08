var cacheName = 'pwa-commits-v3';

var filesToCache = [
    './',
    './css/main.css',
//    './images/books.png',
//    './images/Home.svg',
//    './images/ic_refresh_white_24px.svg',
//    './images/profile.png',
//    './images/push-off.png',
//    './images/push-on.png',
//    './js/app.js',
//    './js/menu.js',
//    './js/offline.js',
//    './js/toast.js'
];

self.addEventListener('install', function(event) {

    console.log('Service Worker: Installing....');

    event.waitUntil(

        caches.open(cacheName).then(function(cache) {
            console.log('Service Worker: Caching App Shell at the moment......');

            // 将文件加入缓存
            return cache.addAll(filesToCache);
        })
    );
});

// 当service worker 运行时
self.addEventListener('activate', function(event) {

    console.log('Service Worker: Activating....');

    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(cacheNames.map(function(key) {
                if( key !== cacheName) {
                    console.log('Service Worker: Removing Old Cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function(event) {

    console.log('Service Worker: Fetch', event.request.url);

    console.log("Url", event.request.url);

    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});