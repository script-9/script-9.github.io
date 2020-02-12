import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from 'react'

const Canvas = forwardRef((props, ref) => {
  const canvasRef = useRef()
  const _pixelData = useRef()

  useEffect(() => {
    _pixelData.current = new ImageData(128, 128)
  }, [])

  useImperativeHandle(ref, () => ({
    draw: _pixelBytes => {
      _pixelData.current.data.set(_pixelBytes)
      const ctx = canvasRef.current.getContext('2d')
      ctx.putImageData(_pixelData.current, 0, 0)
    },
  }))
  return <canvas width={128} height={128} ref={canvasRef} />
})

export default Canvas
