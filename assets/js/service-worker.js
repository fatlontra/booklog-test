const CACHE_NAME = 'book-log-pwa-cache-v1'; 
const FILES_TO_CACHE = [ 
    '/booklog-test/', 
    '/booklog-test/assets/html/index.html', 
    '/booklog-test/assets/html/book.html',
    '/booklog-test/assets/css/style.css', 
    '/booklog-test/manifest.json', 
    '/booklog-test/assets/icons/icon-128.png', 
    '/booklog-test/assets/icons/icon-512.png' 
]; 
 
self.addEventListener('install', (event) => { 
    event.waitUntil( 
        caches.open(CACHE_NAME) 
            .then((cache) => cache.addAll(FILES_TO_CACHE)) 
    ); 
}); 
 
self.addEventListener('fetch', (event) => { 
    event.respondWith( 
        caches.match(event.request) 
            .then((response) => response || fetch(event.request)) 
    ); 
});