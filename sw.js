const CACHE_NAME = "fokus-cache-v1";

const ASSETS = [
  "./",
  "./manifest.json",
  "./pages/index.html",
  "./pages/pomodoro.html",
  "./style/start.css",
  "./style/pomodoro.css",
  "./js/pomodoro.js",
  "./img/icons/apple-touch-icon.png",
  "./img/logo.svg",
  "./img/back.svg",
  "./img/edit.svg",
  "./img/layout.svg",
  "./img/notes.svg",
  "./img/projects.svg",
  "./img/quote.svg",
  "./img/settings.svg",
  "./img/stats.svg",
  "./img/streak.svg",
  "./img/timer.svg",
  "./img/todo.svg",
  "./img/icons/icon-192.png",
  "./img/icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(ASSETS.map((p) => new URL(p, self.registration.scope).toString()))
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const isHTML = req.mode === "navigate" || req.headers.get("accept")?.includes("text/html");

  if (isHTML) {
    // Netzwerk zuerst, damit Nutzer immer die neueste Seite bekommen; bei Offline aus dem Cache.
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((res) => res || caches.match("./pages/pomodoro.html")))
    );
    return;
  }

  // Statische Assets: Cache zuerst, im Hintergrund aktualisieren.
  event.respondWith(
    caches.match(req).then((cached) => {
      const fetchPromise = fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
