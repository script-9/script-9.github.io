import React from 'react'
import Nav from './Nav'
import Output from './Output'

const Run = props => {
  return (
    <>
      <Nav {...props} />
      <div className="Run">
        <Output />
      </div>
    </>
  )
}

export default Run
