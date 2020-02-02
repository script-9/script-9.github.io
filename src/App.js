import React, { useState } from 'react'
import { Router } from '@reach/router'
import Home from './components/Home'
import Code from './components/Code'
import Shelf from './components/Shelf'
import { loadState } from './utils/localStorage'

import './styl/App.css'

const App = () => {
  const { token } = loadState()
  const [gist, setGist] = useState(null)
  const [cassette, setCassette] = useState(null)
  const props = {
    token,
    gist,
    setGist: gist => {
      setCassette(gist ? gist.files['cassette.json'].content : null)
      setGist(gist)
    },
    cassette,
    setCassette,
  }
  return (
    <div className="App">
      <Router>
        <Home path="/" {...props} />
        <Code path="/code" {...props} />
        <Shelf path="/shelf" {...props} />
      </Router>
    </div>
  )
}

export default App
