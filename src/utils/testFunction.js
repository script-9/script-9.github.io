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
  rectFill(state.x, state.y, state.w, state.h, state.c)
}
`

export default script8
