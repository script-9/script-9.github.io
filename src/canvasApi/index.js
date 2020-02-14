// import { get } from 'lodash'
import colors from '../utils/colors'
import drawLine from './line'
import drawPolyStroke from './polyStroke'
import { drawRectStroke, drawRectFill } from './rect'
import drawCircle from './circle'
// import drawSprite from './sprite'
import drawText from './print'

const backgroundColor = 7

// This function is used in the hover highlight functionality. It is stored on the user inaccessible _script8 global
// variable and takes as argument a lambda wrapping some user expression. The flag `shouldHighlight` is then set to true
// while the passed in code is running and returned to false when it finishes. `shouldHighlight` is used to modify
// colors while true to indicate to the user how a given function call effects the drawing on the screen
export let shouldHighlight = false
export const injectHighlight = code => {
  shouldHighlight = true
  let result = code()
  shouldHighlight = false
  return result
}

const canvasApi = ({
  pixels,
  width: canvasWidth,
  height: canvasHeight,
  // sprites,
  // Rename to initialMap, since we have a function named map.
  map: initialMap = [],
}) => {
  console.log('MAKING CanvasApi')
  let _runningMap = JSON.parse(JSON.stringify(initialMap))
  let _cameraX = 0
  let _cameraY = 0
  let _colorSwaps = [...Array(8)]

  const camera = (x = 0, y = 0) => {
    _cameraX = Math.floor(x)
    _cameraY = Math.floor(y)
  }

  const clear = (c = 7) => {
    pixels.fill(colors.int(c))
  }

  const colorSwap = (from, to) => {
    if (from === undefined && to === undefined) {
      _colorSwaps = [...Array(8)]
    } else {
      _colorSwaps[from] = to
    }
  }

  const setPixel = (x, y, c = 0) => {
    x = Math.floor(x - _cameraX)
    y = Math.floor(y - _cameraY)
    if (x < 0 || x >= canvasWidth || y < 0 || y >= canvasHeight) return

    const newColor = _colorSwaps[c] || c
    const newColorInt = colors.int(newColor)
    pixels[y * canvasWidth + x] = newColorInt
  }

  const getPixel = (x, y) => {
    x = Math.floor(x - _cameraX)
    y = Math.floor(y - _cameraY)
    if (x < 0 || x >= canvasWidth || y < 0 || y >= canvasHeight)
      return backgroundColor
    return colors.lookupInt(pixels[y * canvasHeight + x])
  }

  const line = (x1, y1, x2, y2, c = 0) => {
    drawLine({ x1, y1, x2, y2, setPixel, color: c })
  }

  const polyStroke = (points, ...args) => {
    drawPolyStroke({ points, args, line })
  }

  const rectStroke = (x, y, w, h, c = 0) => {
    drawRectStroke({
      x,
      y,
      w,
      h,
      c,
      line,
    })
  }

  const rectFill = (x, y, w, h, c = 0) => {
    drawRectFill({
      x,
      y,
      w,
      h,
      c,
      line,
    })
  }

  const circStroke = (x, y, r, c = 0) => {
    drawCircle({
      cx: Math.floor(x),
      cy: Math.floor(y),
      radius: Math.floor(r),
      color: c,
      onlyStroke: true,
      setPixel,
      line,
    })
  }

  const circFill = (x, y, r, c = 0) => {
    drawCircle({
      cx: Math.floor(x),
      cy: Math.floor(y),
      radius: Math.floor(r),
      color: c,
      setPixel,
      line,
    })
  }

  const print = (x, y, letters, c = 0) => {
    drawText({
      x,
      y,
      letters,
      c,
      setPixel,
    })
  }

  // const sprite = (
  //   x,
  //   y,
  //   spriteIndex,
  //   darken = 0,
  //   flipH = false,
  //   flipV = false,
  // ) => {
  //   if (x - _cameraX < -8 || x - _cameraX > canvasWidth) return
  //   if (y - _cameraY < -8 || y - _cameraY > canvasHeight) return

  //   drawSprite({
  //     x,
  //     y,
  //     spriteIndex,
  //     darken,
  //     flipH,
  //     flipV,
  //     setPixel,
  //     sprites,
  //   })
  // }

  // const getTile = (mx, my) => {
  //   const tile = get(_runningMap, [my, mx], null)
  //   const result = tile !== null ? sprites[tile] : null
  //   if (result) {
  //     result.type = result[8] || 0
  //     result.number = tile
  //   }
  //   return result
  // }

  const setTile = (mx, my, spriteNumber) => {
    _runningMap[my][mx] = spriteNumber
  }

  // const map = (x = 0, y = 0) => {
  //   // Loop over every element in the map
  //   _runningMap.forEach((row, rowNumber) => {
  //     row.forEach((spriteIndex, colNumber) => {
  //       // If the element has a sprite index,
  //       if (spriteIndex !== null) {
  //         // Render at the correct offset position
  //         const dx = (colNumber + x) * 8
  //         const dy = (rowNumber + y) * 8
  //         sprite(dx, dy, spriteIndex)
  //       }
  //     })
  //   })
  // }

  const resetMap = () => {
    _runningMap = JSON.parse(JSON.stringify(initialMap))
  }

  return {
    camera,
    clear,
    colorSwap,
    setPixel,
    getPixel,
    line,
    polyStroke,
    rectStroke,
    rectFill,
    circStroke,
    circFill,
    print,
    // sprite,
    // getTile,
    setTile,
    // map,
    resetMap,
  }
}

export default canvasApi
