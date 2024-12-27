const CACHE_NAME = 'bhaktamar-cache-v1';
const urlsToCache = [
  '/Bhaktamar-stotra/',
  '/Bhaktamar-stotra/index.html',
  '/Bhaktamar-stotra/assets/' // Caching all files in the assets folder
];

// Cache assets and HTML during the installation phase
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Serve cached files during fetch requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Remove outdated caches during activation
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
