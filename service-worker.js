// ===============================
// FinTala Service Worker
// Stable, update-safe, PWA-friendly
// ===============================

const CACHE_NAME = 'v0.0.5.6.7';

// -------------------------------
// INSTALL
// -------------------------------
self.addEventListener('install', event => {
  // Activate new service worker immediately
  self.skipWaiting();
});

// -------------------------------
// ACTIVATE
// -------------------------------
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );

  // Take control of all pages immediately
  self.clients.claim();
});

// -------------------------------
// FETCH
// -------------------------------
self.addEventListener('fetch', event => {
  const request = event.request;

  // 1. HTML / navigation requests → NETWORK FIRST
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          return response;
        })
        .catch(() => {
          // Offline fallback: root index
          return caches.match('./');
        })
    );
    return;
  }

  // 2. Static assets → CACHE FIRST, then NETWORK
  event.respondWith(
    caches.match(request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request)
        .then(networkResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // Optional: return nothing if both fail
          return;
        });
    })
  );
});
