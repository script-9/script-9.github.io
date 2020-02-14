import React, { useRef, useEffect, useState } from 'react'
import Canvas from './Canvas'
import Nav from './Nav'

const Run = props => {
  const canvasRef = useRef()
  const workerRef = useRef()
  const _pixelBytesRef = useRef()
  const [duration, setDuration] = useState(null)
  const [roundtrips, setRoundtrips] = useState(null)

  useEffect(() => {
    workerRef.current = new Worker('./../workers/worker.js', {
      type: 'module',
    })
  }, [])

  const handleClick = method => {
    const before = Date.now()
    setRoundtrips(null)
    setDuration(null)

    // workerRef.current.postMessage(method)

    let _roundtrips = 0
    let stop = false
    const intervalId = setInterval(() => {
      workerRef.current.postMessage(method)

      workerRef.current.onmessage = function(e) {
        if (!stop) {
          _pixelBytesRef.current = e.data
          canvasRef.current.draw(_pixelBytesRef.current)
          _roundtrips++
          const after = Date.now()
          const delta = after - before
          if (delta > 1000 * 5) {
            stop = true
            clearInterval(intervalId)
            setRoundtrips(_roundtrips)
            setDuration(delta)
          }
        }
      }
    }, 0)
  }

  return (
    <>
      <Nav {...props} />
      <div className="Run">
        <Canvas ref={canvasRef} />
        <div className="buttons">
          {['inline', 'eval', 'Function'].map(method => (
            <button key={method} onClick={() => handleClick(method)}>
              {method}
            </button>
          ))}
        </div>
        <div>Duration: {duration}ms</div>
        <div>Roundtrips: {roundtrips}</div>
        <div>1 frame takes {duration / roundtrips}ms</div>
      </div>
    </>
  )
}

export default Run
