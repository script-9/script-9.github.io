import React, { useState, useEffect } from 'react'
import { Router } from '@reach/router'
import Home from './components/Home'
import Code from './components/Code'
import useInterval from './utils/useInterval'
import getIdbValues from './utils/getIdbValues'
import network from './utils/network'
import './styl/App.css'

const App = () => {
  const token = process.env.REACT_APP_T
  const [gist, setGist] = useState(null)
  const [cassette, setCassette] = useState(null)
  const [covers, setCovers] = useState([])
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    getIdbValues().then(setCovers)
  }, [])

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
    token,
    isOnline,
    gist,
    setGist,
    cassette,
    setCassette,
    covers,
    setCovers,
  }
  return (
    <div className="App">
      <Router>
        <Home path="/" {...props} />
        <Code path="/code" {...props} />
        {/* <Shelf path="/shelf" {...props} /> */}
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
