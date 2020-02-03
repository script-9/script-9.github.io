/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
  "/precache-manifest.8e5022f5473cdaf0be8b652cb7f9a2c2.js"
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/index.html"), {
  
  blacklist: [/^\/_/,/\/[^\/?]+\.[^\/]+$/],
});
workbox.routing.registerRoute(
  new RegExp('https://api\\.github\\.com.*'),
  new workbox.strategies.NetworkFirst({
    networkTimeoutSeconds: 5,
  }),
  'GET',
)

workbox.routing.registerRoute(
  new RegExp('https://api\\.github\\.com.*'),
  new workbox.strategies.NetworkOnly({
    networkTimeoutSeconds: 5,
    plugins: [
      new workbox.backgroundSync.Plugin('SCRIPT-9-POST', {
        maxRetentionTime: 24 * 60,
        onSync: async ({ queue }) => {
          const all = await queue.getAll()
          console.log(queue.getAll())
          console.log({ all })
          await queue.replayRequests()
          console.log('DONE')
        },
      }),
    ],
  }),
  'POST',
)

// TODO: what about PATCH?
