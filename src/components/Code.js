import React from 'react'
import Editor from './Editor'
import Output from './Output'
import Nav from './Nav'
import Shelf from './Shelf'

const Code = props => {
  return (
    <>
      <Nav {...props} />
      <div className="Code">
        <h1>Code</h1>
        <Editor {...props} />
        <Output {...props} />
        <Shelf {...props} />
      </div>
    </>
  )
}

export default Code
