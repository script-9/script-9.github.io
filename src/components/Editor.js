import React, { useEffect, useRef } from 'react'
import getLintErrors from './../utils/getLintErrors'

const Editor = props => {
  const { cassette, setCassette } = props

  // The CodeMirror DOM node.
  const codeMirrorDivRef = useRef()

  // The CodeMirror instance.
  const codeMirrorRef = useRef()

  // The cassette prop, as a mutable Ref. This way we can access the latest
  // inside our CodeMirror.changes event.
  const cassetteCodeRef = useRef(cassette)

  // On mount, set CodeMirror on the DOM node.
  useEffect(() => {
    window.CodeMirror.registerHelper('lint', 'javascript', getLintErrors)
    codeMirrorRef.current = window.CodeMirror(codeMirrorDivRef.current, {
      mode: 'javascript',
      theme: 'nyx8',
      lint: true,
      lineNumbers: true,
      tabSize: 2,
      cursorBlinkRate: 0,
      scrollbarStyle: null,
    })

    // When CodeMirror fires a `changes` event,
    codeMirrorRef.current.on('changes', cm => {
      // if CodeMirror isn't equal to the mutable cassette Ref,
      const cmValue = cm.getValue()
      if (cmValue !== cassetteCodeRef.current) {
        // call setCassette with CodeMirror.
        console.log('setCassette(codeMirror)')
        setCassette((cassette = {}) => ({
          ...cassette,
          contents: {
            code: cm.getValue(),
          },
        }))
      }
    })
  }, [setCassette])

  // When cassette changes:
  useEffect(() => {
    // first, set the cassette's code to a mutable Ref.
    // This way we have access to the latest inside the event handler.
    cassetteCodeRef.current = cassette?.contents?.code

    // If the cassette and CodeMirror differ,
    // set cassette on CodeMirror.
    const cassetteCode = cassette?.contents?.code
    if (cassetteCode !== codeMirrorRef.current.getValue()) {
      console.log('codeMirror.setValue(cassette)')
      codeMirrorRef.current.setValue(cassetteCode)
    }
  }, [cassette])

  return (
    <div className="Editor">
      <div ref={codeMirrorDivRef} />
    </div>
  )
}

export default Editor
