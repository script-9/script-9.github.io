import { detect } from 'detect-browser'

const browser = detect()

const regexLookup = {
  /* Chrome Stack Trace Example:

    ReferenceError: cle is not defined
        at eval (eval at onmessage (worker.js:40), <anonymous>:11:9)
        at test (eval at onmessage (worker.js:40), <anonymous>:3:27)
        at eval (eval at onmessage (worker.js:40), <anonymous>:10:7)
        at test (eval at onmessage (worker.js:40), <anonymous>:3:27)
        at eval (eval at onmessage (worker.js:40), <anonymous>:9:5)
        at test (eval at onmessage (worker.js:40), <anonymous>:3:27)
        at draw (eval at onmessage (worker.js:40), <anonymous>:8:3)
        at onmessage (worker.js:50)
  */
  chrome: /\(eval at onmessage .*, <anonymous>:(\d+):(\d+)\)/,
  /* Firefox Stack Trace Example:
  */
  // firefox: /line \d+ > eval line \d+ > eval:(\d+):(\d+)/,
  /* Edge Stack Trace Example:
  */
  // edge: /\(eval code:(\d+):(\d+)\)/,
}

const getErrorLocation = error => {
  const regex = regexLookup[browser.name]
  if (regex && error.stack) {
    const match = regex.exec(error.stack)
    if (match) {
      return {
        line: match[1],
        column: match[2],
      }
    }
  } else if (browser.name === 'safari') {
    return {
      line: error.line,
      column: error.column,
    }
  }
}

export default getErrorLocation
