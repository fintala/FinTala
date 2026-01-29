self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("fintala-v0.0.4").then(cache =>
      cache.addAll([
        "./",
        "./index.html",
        "./css/dashboard.css",
        "./css/main.css"
      ])
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});
