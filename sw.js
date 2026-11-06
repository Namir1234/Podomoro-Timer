const CACHE_NAME = "fokus-cache-v36";

const ASSETS = [
  "./",
  "./manifest.json",
  "./pages/index.html",
  "./pages/pomodoro.html",
  "./style/start.css",
  "./style/start-coral.css",
  "./style/pomodoro.css",
  "./style/pomodoro-original.css",
  "./style/lang-menu.css",
  "./js/i18n.js",
  "./js/design-boot.js",
  "./js/pomodoro.js",
  "./js/cloud.js",
  "./js/cloud-config.js",
  "./js/vendor/supabase.js",
  "./style/tokens.css",
  "./style/base.css",
  "./style/fonts/coral.css",
  "./style/fonts/general-sans-400.woff2",
  "./style/fonts/general-sans-500.woff2",
  "./style/fonts/general-sans-600.woff2",
  "./style/fonts/geist-mono-latin-400.woff2",
  "./style/fonts/geist-mono-latin-ext-400.woff2",
  "./style/fonts/inter.css",
  "./style/fonts/inter-1.woff2",
  "./style/fonts/inter-10.woff2",
  "./img/icons/apple-touch-icon.png",
  "./img/icons/apple-touch-icon-coral.png",
  "./img/logo.svg",
  "./img/back.svg",
  "./img/design.svg",
  "./img/edit.svg",
  "./img/expand.svg",
  "./img/language.svg",
  "./img/layout.svg",
  "./img/quote.svg",
  "./img/settings.svg",
  "./img/stats.svg",
  "./img/stopwatch.svg",
  "./img/streak.svg",
  "./img/timer.svg",
  "./img/todo.svg",
  "./img/user.svg",
  "./img/icons/icon-192.png",
  "./img/icons/icon-512.png",
  "./img/icons/icon-coral-192.png",
  "./img/icons/icon-coral-512.png",
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
  // Anfragen an andere Server (Supabase-Login und -Daten) nie aus dem Cache beantworten.
  if (new URL(req.url).origin !== self.location.origin) return;

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

// Klick auf die Mitteilung "Zeit ist um": offenes App-Fenster nach vorne holen, sonst die App öffnen.
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      const win = list.find((c) => c.url.includes("pomodoro.html")) || list[0];
      return win ? win.focus() : self.clients.openWindow(new URL("./pages/pomodoro.html", self.registration.scope).toString());
    })
  );
});
