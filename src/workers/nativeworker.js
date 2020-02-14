/* eslint no-eval: 0 */
/* eslint no-new-func: 0 */

this.importScripts('./colors.js')
this.importScripts('./makePixelData.js')
this.importScripts('./setPixel.js')
this.importScripts('./testFunction.js')

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max))

const pixelData = this.makePixelData()
this.pixels = pixelData.pixels

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
      const func = new Function(this.testFunction)
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
      eval(this.testFunction)

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

  postMessage(pixelData._pixelBytes)
}
