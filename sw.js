// Travel Wallet service worker: works offline and shows the nightly notification.
const CACHE = 'tw-app-v2';
const SHELL = ['./', 'index.html', 'styles.css', 'app.js', 'config.js', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];

self.addEventListener('install', (e) => {
  // Cache each file on its own, so one missing file can't stop the app from installing.
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(SHELL.map((f) => c.add(f).catch(() => null)))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith('tw-app-') && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

// Network first for our own files (so updates show up), cache when offline.
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (!sameOrigin && !isFont) return;
  if (url.pathname.endsWith('/tw-summary')) return;
  e.respondWith(
    fetch(req).then((res) => {
      if (res && (res.ok || res.type === 'opaque')) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then((hit) => hit || caches.match('index.html')))
  );
});

self.addEventListener('push', (e) => {
  let data = {};
  try { data = e.data ? e.data.json() : {}; } catch (err) { data = { body: e.data ? e.data.text() : '' }; }
  const title = data.title || 'Back at the hotel? Check your wallet';
  const show = (body) => self.registration.showNotification(title, {
    body: body || data.body || 'Tap to confirm the cash left in your wallet.',
    tag: data.tag || 'tw-nightly',
    icon: 'icons/icon-192.png',
    badge: 'icons/icon-192.png',
    data: { url: data.url || './?check=1' }
  });
  e.waitUntil(
    (data.tag === 'tw-test' ? Promise.resolve(null) : caches.open('tw-meta').then((c) => c.match(new URL('./tw-summary', self.registration.scope).href)).then((r) => (r ? r.json() : null)).catch(() => null))
      .then((s) => show(s && s.text ? s.text : ''))
  );
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const target = new URL((e.notification.data && e.notification.data.url) || './?check=1', self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
    for (const c of list) {
      if (c.url.startsWith(self.registration.scope)) { c.postMessage({ type: 'open-check' }); return c.focus(); }
    }
    return self.clients.openWindow(target);
  }));
});
