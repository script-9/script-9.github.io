/* eslint no-eval: 0 */
/* eslint no-new-func: 0 */
/* eslint no-restricted-globals: 0 */

import createPixelData from './../canvasApi/createPixelData'
import createCanvasApi from './../canvasApi/index'

import userCode from '../utils/testFunction'

const pixelData = createPixelData({ width: 128, height: 128 })
const canvasApi = createCanvasApi({
  width: 128,
  height: 128,
  pixels: pixelData.pixels,
})

for (const func in canvasApi) {
  self[func] = canvasApi[func]
}

self.getRandomInt = max => Math.floor(Math.random() * Math.floor(max))

addEventListener('message', e => {
  switch (e.data) {
    case 'inline': {
      const xs = [...Array(128)]
      xs.forEach((_, x) => {
        xs.forEach((_, y) => {
          self.setPixel(x, y, self.getRandomInt(8))
        })
      })
      break
    }
    case 'Function': {
      self.init = () => {}
      self.update = () => {}
      self.draw = () => {}

      const func = new Function(userCode)
      func()

      // Create the script8 state.
      const state = {}

      // Now that we have init/update/draw on the worker scope,
      // we can call them.
      self.init(state)
      self.update(state)
      self.draw(state)
      break
    }
    case 'eval': {
      self.init = () => {}
      self.update = () => {}
      self.draw = () => {}

      eval(userCode)

      // Create the script8 state.
      const state = {}

      // Now that we have init/update/draw on the worker scope,
      // we can call them.
      self.init(state)
      self.update(state)
      self.draw(state)
      break
    }
    default: {
    }
  }
  postMessage(pixelData.pixelBytes)
})
