import React, { useEffect, useRef } from 'react'
import getLintErrors from './../utils/getLintErrors'

const Editor = props => {
  const { cassette, setCassette } = props

  const codeMirrorDiv = useRef()
  const codeMirrorRef = useRef()

  useEffect(() => {
    window.CodeMirror.registerHelper('lint', 'javascript', getLintErrors)
    codeMirrorRef.current = window.CodeMirror(codeMirrorDiv.current, {
      value: cassette?.contents?.code || '',
      mode: 'javascript',
      theme: 'nyx8',
      lint: true,
      lineNumbers: true,
      tabSize: 2,
      cursorBlinkRate: 0,
      scrollbarStyle: null,
    })

    codeMirrorRef.current.on('changes', cm => {
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
