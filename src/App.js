import React, { useState } from 'react'
import { Router } from '@reach/router'
import Home from './components/Home'
import Code from './components/Code'
import Run from './components/Run'
import Shelf from './components/Shelf'
import Oauth from './components/Oauth'
import useStateWithLocalStorage from './utils/useStateWithLocalStorage'
import demoCode from './utils/demoCode'
import { version } from './../package.json'
import { timestamp } from './utils/timestamp.json'
import './styl/App.css'

const App = () => {
  const token = null
  const [commentsToken, setCommentsToken] = useStateWithLocalStorage(
    'comments-token',
  )
  const [cassette, setCassette] = useState({
    contents: {
      code: demoCode,
    },
  })

  const props = {
    timestamp,
    version,
    token,
    cassette,
    setCassette,
    commentsToken,
    setCommentsToken,
  }
  return (
    <div className="App">
      <Router>
        <Home path="/" {...props} />
        <Code path="/code" {...props} />
        <Run path="/run" {...props} />
        <Oauth path="/oauth-comments" {...props} />
        <Shelf path="/shelf" {...props} />
      </Router>
    </div>
  )
}

export default App
