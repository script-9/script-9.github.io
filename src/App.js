import React, { useState } from 'react'
import { Router } from '@reach/router'
import Home from './components/Home'
import Code from './components/Code'
import useInterval from './utils/useInterval'
import network from './utils/network'
import { version } from './../package.json'
import './styl/App.css'

const App = () => {
  const token = process.env.REACT_APP_TOKEN
  const [cassette, setCassette] = useState(null)
  const [isOnline, setIsOnline] = useState(true)
  const [offlineCassettes, setOfflineCassettes] = useState([])

  useInterval(() => {
    network
      .fetchFavicon()
      .then(() => {
        setIsOnline(true)
      })
      .catch(() => {
        setIsOnline(false)
      })
  }, 5000 * 100)

  const props = {
    version,
    token,
    isOnline,
    cassette,
    setCassette,
    offlineCassettes,
    setOfflineCassettes,
  }
  return (
    <div className="App">
      <Router>
        <Home path="/" {...props} />
        <Code path="/code" {...props} />
      </Router>
    </div>
  )
}

export default App
// const { token } = loadState() || { token: process.env.REACT_APP_T }
// setGist: gist => {
// setCassette(cassette => {
//   return gist
//     ? { ...cassette, content: gist.files['code.json'].content }
//     : {}
// })
// setGist(gist)
// },
