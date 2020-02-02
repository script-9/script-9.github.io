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
          console.log(queue.getAll())
          await queue.replayRequests()
          console.log('DONE')
        },
      }),
    ],
  }),
  'POST',
)

// TODO: what about PATCH?
