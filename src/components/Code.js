import React from 'react'
import Editor from './Editor'
import Output from './Output'
import Nav from './Nav'

const Code = props => {
  return (
    <div className="Code">
      <Nav {...props} />
      <Editor {...props} />
      <Output {...props} />
    </div>
  )
}

export default Code
