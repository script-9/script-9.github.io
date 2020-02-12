// import _ from 'lodash'
// import React, { useRef, useState, useEffect } from 'react'
import React, { useRef } from 'react'
import Canvas from './Canvas'
// import makePixelData from './../frameBuffer/pixelData'
// import makeSetPixel from './../frameBuffer/makeSetPixel'
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import worker from 'workerize-loader!../workers/worker'

const Output = () => {
  const canvasRef = useRef()
  // const pixelDataRef = useRef()
  // const setPixelRef = useRef()
  // const workerRef = useRef()

  // useEffect(() => {
  //   pixelDataRef.current = makePixelData()
  //   setPixelRef.current = makeSetPixel(pixelDataRef.current.pixels)
  //   workerRef.current = worker()
  // }, [])

  //   canvasRef.current.draw(pixelDataRef.current)

  //   const uint8ClampedArray = pixelDataRef.current.getUint8ClampedArray()

  //   workerRef.current.run(uint8ClampedArray).then(value => {
  //     console.log(value.length)
  //     const after = Date.now()
  //     setDuration(`${after - before}ms`)
  //   })
  // }

  return (
    <div className="Output">
      <Canvas ref={canvasRef} />
    </div>
  )
}

export default Output
