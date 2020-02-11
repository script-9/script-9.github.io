import React, { useRef, useImperativeHandle, forwardRef } from 'react'

const Canvas = forwardRef((props, ref) => {
  const canvasRef = useRef()
  useImperativeHandle(ref, () => ({
    draw: pixelData => {
      pixelData.writePixelDataToCanvas(canvasRef.current.getContext('2d'))
    },
  }))
  return <canvas width={128} height={128} ref={canvasRef} />
})

export default Canvas
