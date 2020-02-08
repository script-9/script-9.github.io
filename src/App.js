import React, { useState } from 'react'
import { Router } from '@reach/router'
import Home from './components/Home'
import Code from './components/Code'
import Shelf from './components/Shelf'
import { version } from './../package.json'
import './styl/App.css'

const App = () => {
  const token = process.env.REACT_APP_TOKEN
  const [cassette, setCassette] = useState(null)

  const props = {
    version,
    token,
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
