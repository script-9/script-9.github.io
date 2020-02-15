import * as acorn from 'acorn'

const parseOptions = {
  ecmaVersion: 10,
  sourceType: 'script',
  locations: true,
}

const getLintErrors = text => {
  const errors = []
  try {
    acorn.parse(text, parseOptions)
  } catch (error) {
    errors.push({
      from: {
        line: error.loc.line - 1,
        ch: error.loc.column,
      },
      to: {
        line: error.loc.line - 1,
        ch: error.raisedAt,
      },
      message: error.message.replace(/ \(\d+:\d+\)$/, ''),
      severity: 'error',
    })
  }

  return errors
}

export default getLintErrors
