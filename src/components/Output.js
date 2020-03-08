import React, { useRef, useEffect, useState } from 'react'
import { timeout } from 'd3-timer'
import Canvas from './Canvas'
import getLintErrors from './../utils/getLintErrors'
import getErrorLocation from './../utils/getErrorLocation'

const Output = props => {
  const { cassette } = props

  const canvasRef = useRef()
  const workerRef = useRef()
  const pixelBytesRef = useRef()
  const payloadIdSendRef = useRef()
  const payloadIdsReceivedRef = useRef([])
  const timeoutRef = useRef()

  const [frameDuration, setFrameDuration] = useState(null)
  const [codeError, setCodeError] = useState(null)
  const [isCodeTimedOut, setIsCodeTimedOut] = useState(false)

  const initWorker = () => {
    console.log('Initializing web worker.')
    workerRef.current = new Worker('js/worker.js')
    workerRef.current.onmessage = e => {
      const [messageType, payloadId, payload, elapsed] = e.data

      console.log(elapsed)

      // The webworker returned payloadId (which we sent originally).
      // Store payloadId in payloadIdsReceivedRef.
      payloadIdsReceivedRef.current.push(payloadId)
      setFrameDuration(Date.now() - payloadId)

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
  useEffect(
    () => {
      const code = cassette?.contents?.code
      // If we have a webworker, code, and no lint errors,
      // we are ready to send code to the worker.
      if (workerRef.current && code && !getLintErrors(code).length) {
        // Send over a unique id, and save it in payloadIdSendRef.
        // This means this unique id will always be associated with the
        // most recent code we sent over.
        payloadIdSendRef.current = Date.now()
        workerRef.current.postMessage([code, payloadIdSendRef.current])

        // Now for the timer logic.
        // First: if we have a timer already, cancel it.
        if (timeoutRef.current) {
          timeoutRef.current.stop()
        }

        // Create the timer.
        // One second after we sent the frame, check:
        // is sentId in receivedIds? If so, all good. Cleanup/etc.
        // If not, terminate, restart, and let user know:
        // print a message in brightest color,
        // and clear it the next time we get a 'draw'/'error' payload.
        timeoutRef.current = timeout(() => {
          if (
            payloadIdsReceivedRef.current.includes(payloadIdSendRef.current)
          ) {
            payloadIdsReceivedRef.current = []
            setIsCodeTimedOut(false)
          } else {
            workerRef.current.terminate()
            console.log('TERMINATE web worker')
            setIsCodeTimedOut(true)
            initWorker()
          }
          // TODO: can we use 2000 on the first time, then 1000 afterwards?
          // The first time is pretty slow.
        }, 2000)
      }
    },
    [cassette],
  )

  return (
    <div className="Output">
      <Canvas ref={canvasRef} />
      <div className="messages">
        <div className="log">1 frame takes {frameDuration}ms</div>
        {codeError?.message && (
          <div className="error">Error: {codeError.message}</div>
        )}
        {isCodeTimedOut && (
          <div className="error">
            Error: code is taking too long. Check for infinite loops.
          </div>
        )}
      </div>
    </div>
  )
}

export default Output
