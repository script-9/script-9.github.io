import createPixelData from './../frameBuffer/createPixelData'
import makeSetPixel from './../frameBuffer/makeSetPixel'

const pixelData = createPixelData({ width: 128, height: 128 })
const setPixel = makeSetPixel(pixelData.pixels)
const getRandomInt = max => Math.floor(Math.random() * Math.floor(max))

export async function computePixelBytes(count) {
  const xs = [...Array(count)]
  xs.forEach((_, x) => {
    xs.forEach((_, y) => {
      setPixel(x, y, getRandomInt(8))
    })
  })

  return pixelData.pixelBytes
}
// const computePixelBytes = async () => {
//   return 10
// }

// export async computePixelBytes

// export function expensive(time) {
//   let start = Date.now(),
//     count = 0
//   while (Date.now() - start < time) count++
//   return count
// }

// this.importScripts('./colors.js')
// this.importScripts('./makePixelData.js')
// this.importScripts('./setPixel.js')

// const pixelData = this.makePixelData()
// this.pixels = pixelData.pixels

// onmessage = function(e) {
//   const xs = [...Array(e.data[0])]
//   xs.forEach((_, x) => {
//     xs.forEach((_, y) => {
//       this.setPixel(x, y, getRandomInt(8))
//     })
//   })

//   postMessage(pixelData._pixelBytes)
// }
