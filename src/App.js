import React, { useState } from 'react'
import { Router } from '@reach/router'
import Home from './components/Home'
import Code from './components/Code'
import Shelf from './components/Shelf'
// import { loadState } from './utils/localStorage'
import useInterval from './utils/useInterval'
import './styl/App.css'
import network from './utils/network'

const App = () => {
  // const { token } = loadState() || { token: process.env.REACT_APP_T }
  const token = process.env.REACT_APP_T
  const [gist, setGist] = useState(null)
  const [cassette, setCassette] = useState({})
  const [isOnline, setIsOnline] = useState(true)

  useInterval(() => {
    network
      .fetchFavicon()
      .then(() => {
        setIsOnline(true)
      })
      .catch(() => {
        setIsOnline(false)
      })
  }, 30000)

  const props = {
    token,
    isOnline,
    gist,
    setGist: gist => {
      setCassette(cassette => {
        return gist
          ? { ...cassette, content: gist.files['cassette.json'].content }
          : {}
      })
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
