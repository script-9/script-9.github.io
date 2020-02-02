import React from 'react'

const Output = props => {
  const { cassette } = props
  return (
    <div className="Output">
      <h1>Output</h1>
      <pre>{cassette || null}</pre>
    </div>
  )
}

export default Output
