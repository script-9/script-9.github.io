/* eslint no-restricted-globals: 1 */
/* eslint no-new-func: 0 */

export function run(something) {
  // console.log(something)
  return 'this is the function string'
}

// export function run(functionString) {
//   // Add API to worker scope.
//   self.setPixel = makeSetPixel([])

//   // Create Function and set its scope to worker scope.
//   const userFunction = new Function(functionString)
//   // Call Function.
//   userFunction.call(self)

//   // Create the script8 state.
//   const state = {}

//   // Now that we have init/update/draw on the worker scope,
//   // we can call them.
//   self.init(state)
//   self.update(state)
//   self.draw(state)

//   return true
// }
