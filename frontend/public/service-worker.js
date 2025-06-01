globalThis.addEventListener("install", (_event) => {
  globalThis.skipWaiting();
});

globalThis.addEventListener("activate", (_event) => {
  globalThis.clients.claim();
});

globalThis.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    }),
  );
});
