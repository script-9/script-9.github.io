/* eslint no-eval: 0 */
/* eslint no-new-func: 0 */
// /* eslint no-restricted-globals: 0 */

this.importScripts('./makePixelData.js')
this.importScripts('./colors.js')
this.importScripts('./canvasApi/alphabet.js')
this.importScripts('./canvasApi/circle.js')
this.importScripts('./canvasApi/line.js')
this.importScripts('./canvasApi/polyStroke.js')
this.importScripts('./canvasApi/print.js')
this.importScripts('./canvasApi/rect.js')
this.importScripts('./canvasApi/index.js')

this.getRandomInt = max => Math.floor(Math.random() * Math.floor(max))

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

const noop = () => {}

onmessage = function(e) {
  const [userCode, startDate] = e.data

  try {
    this.init = noop
    this.update = noop
    this.draw = noop

    const func = new Function(userCode || '')
    func()

    // Create the script8 state.
    const state = {}

    // Now that we have init/update/draw on the worker scope,
    // we can call them.
    this.init(state)
    this.update(state)
    this.draw(state)

    postMessage(['draw', startDate, pixelData.pixelBytes])
  } catch (error) {
    postMessage(['error', startDate, error])
  }
}
