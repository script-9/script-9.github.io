import React, { useRef, useEffect, useState } from 'react'
import Canvas from './Canvas'
import Nav from './Nav'

const Run = props => {
  const canvasRef = useRef()
  const workerRef = useRef()
  const _pixelBytesRef = useRef()
  const [duration, setDuration] = useState(null)

  useEffect(() => {
    workerRef.current = new Worker('js/worker.js')
  }, [])

  const handleClick = count => {
    // console.log('Posting message to worker.')
    const before = Date.now()
    workerRef.current.postMessage([count, _pixelBytesRef.current])

    workerRef.current.onmessage = function(e) {
      // console.log(`Received message from worker: ${e.data}`)
      setDuration(Date.now() - before)
      _pixelBytesRef.current = e.data
      canvasRef.current.draw(_pixelBytesRef.current)
    }
  }

  // Create an instance web worker.
  // On load, ask it to give us the data.
  // Then draw it.

  return (
    <>
      <Nav {...props} />
      <div className="Run">
        <Canvas ref={canvasRef} />
        <div className="buttons">
          {[2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048].map(
            (value, index) => (
              <button
                key={index}
                onClick={() => {
                  handleClick(value)
                }}
              >
                {!index && 'Draw'} {value}
              </button>
            ),
          )}
        </div>
        <span>Duration: {duration}ms</span>
      </div>
    </>
  )
}

export default Run
