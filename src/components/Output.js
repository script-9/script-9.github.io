import React, { useRef, useEffect, useState } from 'react'
import Canvas from './Canvas'
import getLintErrors from './../utils/getLintErrors'

const Output = props => {
  const { cassette } = props

  const canvasRef = useRef()
  const workerRef = useRef()
  const pixelBytesRef = useRef()
  const sentAtRef = useRef()

  const [duration, setDuration] = useState(null)

  const initWorker = () => {
    console.log('initing')
    workerRef.current = new Worker('js/worker.js')
    workerRef.current.onmessage = function(e) {
      if (e.data[0]) {
        pixelBytesRef.current = e.data[0]
        canvasRef.current.draw(pixelBytesRef.current)
        setDuration(Date.now() - e.data[1])
        console.log({
          m: 'received',
          sentAtRef: sentAtRef.current,
          received: e.data[1],
        })
        if (e.data[1] === sentAtRef.current) {
          sentAtRef.current = null
        }
      } else {
        // We got an error!
        console.log({ m: 'error', error: e.data[2] })
        if (e.data[1] === sentAtRef.current) {
          sentAtRef.current = null
        }
      }
    }
  }

  useEffect(() => {
    initWorker()
  }, [])

  // When the cassette changes,
  useEffect(() => {
    // if we have cassette code and a webworker,
    const code = cassette?.contents?.code
    if (workerRef.current && code) {
      // see if the code has lint errors.
      const errors = getLintErrors(code)
      // If it doesn't,
      if (!errors.length) {
        console.log({ cassette })
        // send the code to the webworker,
        // and in order to stop the worker if it's taking too long,
        // we need to know when we sent this message.
        // Send the timestamp but also keep it here.
        sentAtRef.current = Date.now()
        workerRef.current.postMessage([code, sentAtRef.current])
        console.log({ m: 'sent message:', sentAtRef: sentAtRef.current })
        console.log('waiting for timeout')
        setTimeout(() => {
          if (sentAtRef.current) {
            console.log({ m: 'terminating', sentAtRef: sentAtRef.current })
            workerRef.current.terminate()
            initWorker()
            // terminate worker
          }
        }, 2000)
      }
    }
  }, [cassette])

  return (
    <div className="Output">
      <Canvas ref={canvasRef} />
      <div>1 frame takes {duration}ms</div>
    </div>
  )
}

export default Output
// const handleClick = method => {
//   const before = Date.now()
//   setRoundtrips(null)
//   setDuration(null)

//   let _roundtrips = 0
//   let stop = false
//   const intervalId = setInterval(() => {
//     workerRef.current.postMessage(method)

//     workerRef.current.onmessage = function(e) {
//       if (!stop) {
//         pixelBytesRef.current = e.data
//         canvasRef.current.draw(pixelBytesRef.current)
//         _roundtrips++
//         const after = Date.now()
//         const delta = after - before
//         if (delta > 1000 * 5) {
//           stop = true
//           clearInterval(intervalId)
//           setRoundtrips(_roundtrips)
//           setDuration(delta)
//         }
//       }
//     }
//   }, 0)
