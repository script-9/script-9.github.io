/* eslint no-eval: 0 */
/* eslint no-new-func: 0 */

this.importScripts('./lib/d3-timer.min.js')
this.importScripts('./makePixelData.js')
this.importScripts('./colors.js')
this.importScripts('./canvasApi/alphabet.js')
this.importScripts('./canvasApi/circle.js')
this.importScripts('./canvasApi/line.js')
this.importScripts('./canvasApi/polyStroke.js')
this.importScripts('./canvasApi/print.js')
this.importScripts('./canvasApi/rect.js')
this.importScripts('./canvasApi/index.js')

// Helper function - eventually this will go away.
this.getRandomInt = max => Math.floor(Math.random() * Math.floor(max))

const log = false ? console.log : () => {}

// Setup the ArrayBuffer.
const pixelData = this.makePixelData()
const pixels = pixelData.pixels

// Create the canvas API,
const canvasApi = this.createCanvasApi({
  pixels,
  width: 128,
  height: 128,
})

// and expose all its methods to worker scope.
for (const func in canvasApi) {
  this[func] = canvasApi[func]
}

const noop = () => {}

let interval

const callback = () => {
  try {
    this.update(this.script8State)
    this.draw(this.script8State)
    postMessage(['draw', pixelData.pixelBytes])
  } catch (error) {
    log('worker: callback threw error. Stopping interval.')
    interval.stop()
    interval = null
    postMessage(['error', error])
  }
}

onmessage = function(e) {
  const userCode = e.data

  try {
    this.init = noop
    this.update = noop
    this.draw = noop

    const func = new Function(userCode || '')
    func()

    // Create the script8 state.
    this.script8State = {}

    // Initialize.
    this.init(this.script8State)

    if (!interval) {
      log('worker: Starting interval.')
      interval = this.d3.interval(callback, 1000 / 60)
    }
  } catch (error) {
    log('worker: onmessage threw error.')
    interval.stop()
    interval = null
    postMessage(['error', error])
  }
}
