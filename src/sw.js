if ('function' === typeof importScripts) {
    importScripts(
        'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
    );
    /* global workbox */
    if (workbox) {
        console.log('Workbox is loaded');

        /* injection point for manifest files.  */
        workbox.precaching.precacheAndRoute([]);

        // self.addEventListener("install", (event) => {
        //     self.skipWaiting();
        // });

        self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
        self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

        // self.addEventListener(fetch, (event) => {
        //     console.log('Inside the fetch handler:', event);
        // });
        // self.addEventListener('fetch', (event) => {
        //     const url = new URL(event.request.url);
        //     // if (url.endsWith('.png')) {
        //     //     // Using the previously-initialized strategies will work as expected.
        //     //     const cacheFirst = new strategies.cacheFirst();
        //     //     event.respondWith(cacheFirst.handle({request: event.request}));
        //     // }
        //     console.log("fetchinf in offline");
        //     const cacheFirst = new workbox.strategies.cacheFirst();
        //     if (url.origin == location.origin && url.pathname == '/') {
        //         console.log("for  url : " + url);
        //         event.respondWith(cacheFirst.handle({request: event.request}));
        //     }
        // });
        // self.addEventListener('fetch', function(event) {
        //     console.log("in fetch: ");
        //     console.log(event.request.url);
        //     const url = new URL(event.request.url);
        //
        //     if (url.origin == location.origin && (url.pathname == '/index.html' || url.pathname == '/')) {
        //         event.respondWith(caches.match('/index.html'));
        //     }
        //     event.respondWith(
        //         caches.match(event.request).then(function(response) {
        //             return response || fetch(event.request);
        //         })
        //             .catch(()=>{
        //                 console.log("not found matching event");
        //                 return "Hello";
        //             } )
        //     );
        // });
        /* custom cache rules*/
        workbox.routing.registerNavigationRoute('/index.html', {
            blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/],
        });

        workbox.routing.registerRoute(
            /\.(?:png|gif|jpg|jpeg)$/,
            workbox.strategies.cacheFirst({
                cacheName: 'images',
                plugins: [
                    new workbox.expiration.Plugin({
                        maxEntries: 60,
                        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                    }),
                ],
            })
        );

    } else {
        console.log('Workbox could not be loaded. No Offline support');
    }
}
