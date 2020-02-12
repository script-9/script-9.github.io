this.importScripts('./colors.js')
this.importScripts('./makePixelData.js')
this.importScripts('./setPixel.js')

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max))

const pixelData = this.makePixelData()
this.pixels = pixelData.pixels

onmessage = function(e) {
  const xs = [...Array(e.data[0])]
  xs.forEach((_, x) => {
    xs.forEach((_, y) => {
      this.setPixel(x, y, getRandomInt(8))
    })
  })

  postMessage(pixelData._pixelBytes)
}
