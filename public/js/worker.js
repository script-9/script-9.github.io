/* eslint no-restricted-globals: 1 */
self.importScripts('./colors.js')
self.importScripts('./makePixelData.js')
self.importScripts('./setPixel.js')

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max))

const pixelData = self.makePixelData()
self.pixels = pixelData.pixels

console.log(self.pixels)

onmessage = function(e) {
  const xs = [...Array(e.data[0])]
  xs.forEach((_, x) => {
    xs.forEach((_, y) => {
      const c = getRandomInt(8)
      if (x < 0 || x >= 128 || y < 0 || y >= 128) return
      const int = self.colors.int(c)
      if (int) {
        const newColor = int
        const index = y * 128 + x
        self.pixels[index] = newColor
      }
      // self.setPixel(x, y, 0)
      // self.setPixel(x, y, getRandomInt(8))
    })
  })

  // console.log(self.pixels)

  postMessage(pixelData._pixelBytes)
}
