import React, { useEffect, useRef } from 'react'

const Editor = props => {
  const { cassette, setCassette } = props

  const codeMirrorDiv = useRef()
  const codeMirrorRef = useRef()

  useEffect(() => {
    codeMirrorRef.current = window.CodeMirror(codeMirrorDiv.current, {
      value: cassette?.contents?.code || '',
      mode: 'javascript',
      theme: 'nyx8',
      lineNumbers: true,
      tabSize: 2,
      cursorBlinkRate: 0,
      scrollbarStyle: null,
    })

    codeMirrorRef.current.on('change', cm => {
      const content = cm.getValue()
      setCassette((cassette = {}) => ({
        ...cassette,
        contents: {
          code: content,
        },
      }))
    })
  }, [])

  return (
    <div className="Editor">
      <div ref={codeMirrorDiv} />
    </div>
  )
}

export default Editor
