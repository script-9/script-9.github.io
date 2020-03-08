/* eslint no-eval: 0 */
/* eslint no-new-func: 0 */
// /* eslint no-restricted-globals: 0 */

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

let interval

const callback = elapsed => {
  try {
    this.update(this.script8State)
    this.draw(this.script8State)
    postMessage(['draw', this.payloadId, pixelData.pixelBytes, elapsed])
  } catch (error) {
    console.log('got error in worker catch')
    interval.stop()
    interval = null
    postMessage(['error', this.payloadId, error])
  }
}

onmessage = function(e) {
  const [userCode, payloadId] = e.data

  try {
    this.payloadId = payloadId

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
      console.log('calling interval callback')
      // eslint-disable-next-line no-undef
      interval = d3.interval(callback, 1000)
    }
  } catch (error) {
    console.log('got error in worker catch')
    interval.stop()
    interval = null
    postMessage(['error', payloadId, error])
  }
}
