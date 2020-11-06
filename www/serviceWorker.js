const staticDevCoffee = "WhatsApp AS";
const assets = [
    "/",
    "/index.html",
    "/css/style.css",
    "/js/main.js",
    "https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css",
    "https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js",
    "https://code.jquery.com/jquery-3.5.1.min.js",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.googleapis.com/css?family=Nunito:400,700&display=swap",
    "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
    "https://fonts.gstatic.com/s/nunito/v14/XRXV3I6Li01BKofINeaB.woff2"
]
//https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker
self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticDevCoffee).then(cache => {
            cache.addAll(assets)
        })
    )
});
// self.addEventListener("fetch", fetchEvent => {
//     fetchEvent.respondWith(
//         caches.match(fetchEvent.request).then(res => {
//             return res || fetch(fetchEvent.request)
//         })
//     )
// });

self.addEventListener('fetch', function (event) {
    event.respondWith(
        fetch(event.request).catch(function () {
            return caches.match(event.request);
        })
    );
});
