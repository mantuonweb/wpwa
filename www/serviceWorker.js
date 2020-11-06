const staticDevCoffee = "WhatsApp AS"
const assets = [
    "/",
    "/index.html",
    "/css/style.css",
    "/js/main.js"
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
