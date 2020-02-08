import React from 'react'

/*
- On save, if save fails and then we check we're offline:
  - put cassette in idb
  - give cassette an idbId
  - remove from URL
  - remove the gist part, but keep gistId
- On save, if save goes through:
  - remove cassette from idb
  - remove its idbId
  - set id on URL
  - set gistId
*/

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
        value={(cassette && cassette.contents.code) || ''}
        onChange={handleTextareaChange}
      ></textarea>
    </div>
  )
}

export default Editor
