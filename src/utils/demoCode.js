const demoCode = `draw = () => {

  [...Array(8)].forEach((_, i) => {
    const side = 128 - i * 16
    const xy = 64 - side / 2
    rectFill(xy, xy, side, side, i)
  })

  print(60, 61, 'hi.', 0, 7)
}`

export default demoCode
