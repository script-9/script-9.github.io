/* eslint no-eval: 0 */
/* eslint no-new-func: 0 */
/* eslint no-restricted-globals: 0 */

import createPixelData from './../frameBuffer/createPixelData'
import makeSetPixel from './../frameBuffer/makeSetPixel'
import userCode from './../utils/testFunction'

const pixelData = createPixelData({ width: 128, height: 128 })
const setPixel = makeSetPixel(pixelData.pixels)

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max))

addEventListener('message', e => {
  switch (e.data) {
    case 'inline': {
      const xs = [...Array(128)]
      xs.forEach((_, x) => {
        xs.forEach((_, y) => {
          setPixel(x, y, getRandomInt(8))
        })
      })
      break
    }
    case 'Function': {
      self.setPixel = setPixel
      self.getRandomInt = getRandomInt

      self.init = () => {}
      self.update = () => {}
      self.draw = () => {}

      const func = new Function(userCode)
      func.call(self)

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
