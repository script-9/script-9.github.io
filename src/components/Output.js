import React, { useRef, useEffect, useState } from 'react'
import Canvas from './Canvas'

const Output = props => {
  const { cassette } = props

  const canvasRef = useRef()
  const workerRef = useRef()
  const pixelBytesRef = useRef()

  const [duration, setDuration] = useState(null)

  useEffect(() => {
    workerRef.current = new Worker('js/worker.js')
    workerRef.current.onmessage = function(e) {
      pixelBytesRef.current = e.data[0]
      canvasRef.current.draw(pixelBytesRef.current)
      setDuration(Date.now() - e.data[1])
    }
  }, [])

  useEffect(() => {
    if (workerRef.current && cassette?.contents?.code) {
      workerRef.current.postMessage([cassette.contents.code, Date.now()])
    }
  }, [cassette])

  return (
    <div className="Output">
      <Canvas ref={canvasRef} />
      <div>1 frame takes {duration}ms</div>
    </div>
  )
}

export default Output
// const handleClick = method => {
//   const before = Date.now()
//   setRoundtrips(null)
//   setDuration(null)

//   let _roundtrips = 0
//   let stop = false
//   const intervalId = setInterval(() => {
//     workerRef.current.postMessage(method)

//     workerRef.current.onmessage = function(e) {
//       if (!stop) {
//         pixelBytesRef.current = e.data
//         canvasRef.current.draw(pixelBytesRef.current)
//         _roundtrips++
//         const after = Date.now()
//         const delta = after - before
//         if (delta > 1000 * 5) {
//           stop = true
//           clearInterval(intervalId)
//           setRoundtrips(_roundtrips)
//           setDuration(delta)
//         }
//       }
//     }
//   }, 0)
