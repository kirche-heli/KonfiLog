/*
  Service Worker für KonfiLog

  Dieser Service Worker implementiert eine einfache Cache‑Strategie, um die
  Anwendung offline verfügbar zu machen. Beim Installationsereignis werden
  grundlegende Dateien in den Cache geschrieben. Bei jedem Abrufversuch wird
  zunächst geprüft, ob die Ressource im Cache liegt; andernfalls wird sie
  aus dem Netzwerk geladen. In einer produktiven Umgebung kann diese
  Strategie weiterentwickelt werden (z. B. mit Stale‑While‑Revalidate).
*/

const CACHE_NAME = 'konfilog-cache-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/sw.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});