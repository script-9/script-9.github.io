/* eslint no-eval: 0 */
/* eslint no-new-func: 0 */
// /* eslint no-restricted-globals: 0 */

this.importScripts('./makePixelData.js')
this.importScripts('./colors.js')
this.importScripts('./canvasApi/index.js')
this.importScripts('./userCode.js')

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max))

const pixelData = this.makePixelData()
const pixels = pixelData.pixels

const canvasApi = this.createCanvasApi({
  pixels,
  width: 128,
  height: 128,
})

for (const func in canvasApi) {
  this[func] = canvasApi[func]
}

onmessage = function(e) {
  switch (e.data) {
    case 'inline': {
      const xs = [...Array(128)]
      xs.forEach((_, x) => {
        xs.forEach((_, y) => {
          this.setPixel(x, y, getRandomInt(8))
        })
      })
      break
    }
    case 'Function': {
      const func = new Function(this.userCode)
      func()

      // Create the script8 state.
      const state = {}

      // Now that we have init/update/draw on the worker scope,
      // we can call them.
      this.init(state)
      this.update(state)
      this.draw(state)

      break
    }
    case 'eval': {
      eval(this.userCode)

      // Create the script8 state.
      const state = {}

      // Now that we have init/update/draw on the worker scope,
      // we can call them.
      this.init(state)
      this.update(state)
      this.draw(state)

      break
    }
    default: {
    }
  }

  postMessage(pixelData.pixelBytes)
}
