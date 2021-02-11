// eslint-disable-next-line no-undef
importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

// eslint-disable-next-line no-undef
workbox.core.setCacheNameDetails({prefix: "workaholic-timer"});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
// eslint-disable-next-line no-undef
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// ここまでオリジナル

import {channel} from "../src/common/broadcast";

self.addEventListener('notificationclick', function (event) {
    channel.postMessage({'type': 'notificationclick', 'data': event.notification.data})
});
