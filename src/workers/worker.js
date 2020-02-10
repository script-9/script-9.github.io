// block for `time` ms, then return the number of loops we could run in that time:
export function expensive(time) {
  let start = Date.now()
  let count = 0
  while (Date.now() - start < time) count++
  return count
}

const gabriel = () => {
  return 'florit'
}

export function hello() {
  const fun = new Function(`
  
  console.log(gabriel);
  return 5

  `)
  const value = fun()
  return [2, value]
}
