import React from 'react'
import Nav from './Nav'
import Output from './Output'

const Run = props => {
  return (
    <div className="Run">
      <Nav {...props} />
      <Output {...props} />
    </div>
  )
}

export default Run
