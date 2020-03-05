import React, { useRef, useEffect, useState } from 'react'
import Canvas from './Canvas'
import getLintErrors from './../utils/getLintErrors'
import getErrorLocation from './../utils/getErrorLocation'

const Output = props => {
  const { cassette } = props

  const canvasRef = useRef()
  const workerRef = useRef()
  const pixelBytesRef = useRef()
  const sentIdRef = useRef()
  const receivedIdsRef = useRef([])
  const setTimeoutIdRef = useRef()

  const [frameDuration, setFrameDuration] = useState(null)
  const [codeError, setCodeError] = useState(null)

  const initWorker = () => {
    console.log('Initializing web worker.')
    workerRef.current = new Worker('js/worker.js')
    workerRef.current.onmessage = e => {
      const [messageType, receivedId, payload] = e.data

      // The webworker returned receivedId (which we sent originally).
      // Store receivedId in receivedIdsRef.
      receivedIdsRef.current.push(receivedId)
      setFrameDuration(Date.now() - receivedId)

      switch (messageType) {
        // If message is 'draw',
        // store ArrayBuffer in pixelBytesRef,
        // and draw it.
        case 'draw': {
          console.log('Received message: draw')
          pixelBytesRef.current = payload
          canvasRef.current.draw(pixelBytesRef.current)
          setCodeError(null)
          break
        }
        // If message is 'error',
        // let user know.
        case 'error': {
          const location = getErrorLocation(payload)
          setCodeError({
            message: payload.message,
            ...location,
          })
          break
        }
        default: {
        }
      }
    }
  }

  // On load,
  // create the worker.
  useEffect(() => {
    initWorker()
  }, [])

  // When the cassette code changes,
  useEffect(() => {
    const code = cassette?.contents?.code
    // If we have a webworker, code, and no lint errors,
    // we are ready to send code to the worker.
    if (workerRef.current && code && !getLintErrors(code).length) {
      // Send over a unique id, and save it in sentId.
      // This means this unique id will always be associated with the
      // most recent code we sent over.
      sentIdRef.current = Date.now()
      workerRef.current.postMessage([code, sentIdRef.current])

      // Now for the timer logic.
      // First: if we have a timer already, cancel it.
      if (setTimeoutIdRef.current) {
        clearInterval(setTimeoutIdRef.current)
      }

      // Create the timer.
      // One second after we sent the frame, check:
      // is sentId in receivedIds? If so, all good. Cleanup/etc.
      // If not, terminate, restart, and let user know.
      setTimeoutIdRef.current = setTimeout(() => {
        if (receivedIdsRef.current.includes(sentIdRef.current)) {
          receivedIdsRef.current = []
        } else {
          workerRef.current.terminate()
          console.log('TERMINATE web worker')
          initWorker()
        }
      }, 1000)
    }
  }, [cassette])

  return (
    <div className="Output">
      <Canvas ref={canvasRef} />
      <div>1 frame takes {frameDuration}ms</div>
      {codeError?.message && <div>{codeError.message}</div>}
    </div>
  )
}

export default Output
