import React, { useRef, useEffect, useState, useCallback } from 'react'
import { interval } from 'd3-timer'
import Canvas from './Canvas'
import getLintErrors from './../utils/getLintErrors'
import getErrorLocation from './../utils/getErrorLocation'

const log = false ? console.log : () => {}

/*
Output tells the worker to initialize.
The worker then starts the timer.
This means that every tick, or every 16.6ms, the timer will run update+draw,
then send the ArrayNuffer to Output via postMessage.
This will continue forever.
If there is an error the worker will send that along as well.
What happens if the worker freezes? Back in Output, every time we get a
message back, we write down when we got it. And every 1s, we check:
has it been more than 1 second since we got a postMessage?
If yes, then we terminate the worker and start over.
*/

const Output = props => {
  const { cassette } = props

  const canvasRef = useRef()
  const workerRef = useRef()
  const pixelBytesRef = useRef()
  const intervalRef = useRef()
  const messageReceivedDateRef = useRef()
  const [codeError, setCodeError] = useState(null)
  const [isCodeTimedOut, setIsCodeTimedOut] = useState(false)
  // const [frameDuration, setFrameDuration] = useState(null)

  // This function initializes the web worker. It's run on mount,
  // and every time we restart the worker.
  const initWorker = useCallback(() => {
    console.log('Output: Initializing web worker.')

    // If we already have an interval, stop it.
    if (intervalRef.current) {
      log('Output: intervalRef exists. Stopping interval.')
      intervalRef.current.stop()
      intervalRef.current = null
    }

    // Initialize the worker.
    workerRef.current = new Worker('js/worker.js')

    // Handle getting messages from the worker.
    workerRef.current.onmessage = e => {
      // Store the timestamp when we got the message.
      // We'll use this later to see how long it's been
      // since we last got a message from the worker.
      messageReceivedDateRef.current = Date.now()

      // Get the data from the worker (thank you worker!)
      const [messageType, payload] = e.data

      // If the timer doesn't exist, create it.
      if (!intervalRef.current) {
        // Every 2 seconds, check: when was the last time
        // we got a message back from the worker?
        // Has it been too long?
        // If so, terminate the worker and initialize it again.
        log('Output: interval does not exist. Creating interval.')
        intervalRef.current = interval(() => {
          if (Date.now() - messageReceivedDateRef.current > 1000) {
            log('Output: worker is taking too long.')
            log('Output: restarting web worker.')
            workerRef.current.terminate()
            setIsCodeTimedOut(true)
            initWorker()
          } else {
            setIsCodeTimedOut(false)
          }
        }, 500)
      }

      switch (messageType) {
        // If message is 'draw',
        // store ArrayBuffer in pixelBytesRef,
        // and draw it.
        case 'draw': {
          log('Output: Received message `draw`.')
          pixelBytesRef.current = payload
          canvasRef.current.draw(pixelBytesRef.current)
          setCodeError(null)
          break
        }

        // If message is 'error',
        // let user know.
        // Also stop the interval timer. Otherwise we will
        // think it's been too long, and then
        // we'll incorrectly restart the worker.
        case 'error': {
          log('Output: Received message `error`.')

          log('Output: Stopping interval.')
          intervalRef.current.stop()
          intervalRef.current = null

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
  }, [])

  // On load,
  // create the worker.
  useEffect(() => {
    initWorker()
  }, [initWorker])

  // When the cassette code changes,
  useEffect(() => {
    const code = cassette?.contents?.code
    // If we have a webworker, code, and no lint errors,
    // we are ready to send code to the worker.
    if (workerRef.current && code && !getLintErrors(code).length) {
      // If the timer doesn't exist, create it.
      if (!intervalRef.current) {
        // Every 2 seconds, check: when was the last time
        // we got a message back from the worker?
        // Has it been too long?
        // If so, terminate the worker and initialize it again.
        log('Output: interval does not exist. Creating interval.')
        intervalRef.current = interval(() => {
          if (Date.now() - messageReceivedDateRef.current > 1000) {
            log('Output: worker is taking too long.')
            log('Output: restarting web worker.')
            workerRef.current.terminate()
            setIsCodeTimedOut(true)
            initWorker()
          } else {
            setIsCodeTimedOut(false)
          }
        }, 500)
      }

      workerRef.current.postMessage(code)
    }
  }, [cassette, initWorker])

  return (
    <div className="Output">
      <Canvas ref={canvasRef} />
      <div className="messages">
        {/* <div className="log">1 frame takes {frameDuration}ms</div> */}
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
// const intervalCallback = useCallback(() => {
//   if (Date.now() - messageReceivedDateRef.current > 1000) {
//     log('Output: worker is taking too long.')
//     log('Output: restarting web worker.')
//     workerRef.current.terminate()
//     setIsCodeTimedOut(true)
//     initWorker()
//   } else {
//     setIsCodeTimedOut(false)
//   }
// }, [initWorker])
