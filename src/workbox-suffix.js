workbox.routing.registerRoute(
  new RegExp('https://api\\.github\\.com.*'),
  new workbox.strategies.NetworkFirst({
    networkTimeoutSeconds: 5,
  }),
)
