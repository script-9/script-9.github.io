import React, { useRef, useEffect, useState } from 'react'
import Canvas from './Canvas'
import Nav from './Nav'

// eslint-disable-next-line import/no-webpack-loader-syntax
import worker from 'workerize-loader!./../workers/worker'

const Run = props => {
  const canvasRef = useRef()
  const workerRef = useRef()
  const [duration, setDuration] = useState(null)

  useEffect(() => {
    workerRef.current = worker()
  }, [])

  const handleClick = async count => {
    const before = Date.now()
    const bytes = await workerRef.current.computePixelBytes(count)
    canvasRef.current.draw(bytes)
    setDuration(Date.now() - before)
  }

  return (
    <>
      <Nav {...props} />
      <div className="Run">
        <Canvas ref={canvasRef} />
        <div className="buttons">
          {[2, 4, 8, 16, 32, 64, 128].map((value, index) => (
            <button
              key={index}
              onClick={() => {
                handleClick(value)
              }}
            >
              {!index && 'Draw'} {value}
            </button>
          ))}
        </div>
        <span>Duration: {duration}ms</span>
      </div>
    </>
  )
}

export default Run
