import React from 'react'

const Editor = props => {
  const { cassette, setCassette } = props

  const handleTextareaChange = e => {
    e.persist() // TODO: why is this necessary again?
    setCassette((cassette = {}) => ({
      ...cassette,
      contents: {
        code: e.target.value,
      },
    }))
  }

  return (
    <div className="Editor">
      <h1>Editor</h1>
      <textarea
        value={(cassette && cassette.contents && cassette.contents.code) || ''}
        onChange={handleTextareaChange}
      ></textarea>
    </div>
  )
}

export default Editor
