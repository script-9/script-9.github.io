import React from 'react'

const Editor = props => {
  const { cassette, setCassette } = props

  const handleTextareaChange = e => {
    setCassette(e.target.value)
  }

  return (
    <div className="Editor">
      <h1>Editor</h1>
      <textarea
        value={cassette || ''}
        onChange={handleTextareaChange}
      ></textarea>
    </div>
  )
}

export default Editor
