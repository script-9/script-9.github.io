import _ from 'lodash'
import React, { useRef, useState, useEffect } from 'react'
import Canvas from './Canvas'
import makePixelData from './../frameBuffer/pixelData'
import makeSetPixel from './../frameBuffer/makeSetPixel'
// eslint-disable-next-line import/no-webpack-loader-syntax
import worker from 'workerize-loader!../workers/worker'

const Output = () => {
  const canvasRef = useRef()
  const pixelDataRef = useRef()
  const setPixelRef = useRef()
  const workerRef = useRef()
  const [duration, setDuration] = useState(null)

  useEffect(() => {
    pixelDataRef.current = makePixelData()
    setPixelRef.current = makeSetPixel(pixelDataRef.current.pixels)
    workerRef.current = worker()
  }, [])

  const handleOnClick = count => {
    const before = Date.now()
    _.range(count).forEach(x => {
      _.range(count).forEach(y => {
        setPixelRef.current(x, y, _.random(0, 7))
      })
    })
    canvasRef.current.draw(pixelDataRef.current)

    const uint8ClampedArray = pixelDataRef.current.getUint8ClampedArray()

    workerRef.current.run(uint8ClampedArray).then(value => {
      console.log(value.length)
      const after = Date.now()
      setDuration(`${after - before}ms`)
    })
  }

  return (
    <div className="Output">
      <Canvas ref={canvasRef} />
      <div className="buttons-and-duration">
        <div className="buttons">
          {[2, 4, 8, 16, 32, 64, 128].map((value, index) => {
            return (
              <button
                key={index}
                onClick={() => {
                  handleOnClick(value)
                }}
              >
                {!index && 'Draw'} {value}
              </button>
            )
          })}
        </div>
        <div className="duration">
          {duration && <button>{duration}</button>}
        </div>
      </div>
    </div>
  )
}

export default Output
