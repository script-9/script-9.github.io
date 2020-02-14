const script8 = `
init = state => {
  state.x = 0
  state.y = 0
  state.w = 10
  state.h = 10
  state.c = 1
}

update = (state, input, elapsed) => {
}

draw = state => {
  const xs = [...Array(128)]
  xs.forEach((_, x) => {
    xs.forEach((_, y) => {
      setPixel(x, y, getRandomInt(8))
    })
  })
}
`

export default script8
