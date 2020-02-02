import React, { useState, useEffect } from 'react'
import { navigate } from '@reach/router'
import Nav from './Nav'

const Shelf = props => {
  const { gist, setGist } = props
  const [cassettes, setCassettes] = useState([])

  useEffect(() => {
    setCassettes([
      { id: 'e4caf0c2cb95499341d1731912c240f8' },
      { id: '9b0be7b96b75be367d28b51ecb0a7e55' },
      { id: 'c212d83cfb18e58135ea17bc56afba87' },
    ])
  }, [])

  const loadGist = async gistId => {
    const url = `https://api.github.com/gists/${gistId}`
    const response = await fetch(url)
    if (response.status === 200) {
      const json = await response.json()
      setGist(json)
      navigate(`/code?id=${json.id}`)
    } else {
      console.log(response.statusText)
    }
  }

  return (
    <>
      <Nav {...props} />
      <div className="Shelf">
        <h1>Shelf</h1>
        <ul>
          {cassettes.map((cassette, i) => (
            <li key={i}>
              {cassette.id}{' '}
              <button
                disabled={gist && cassette.id === gist.id}
                onClick={() => loadGist(cassette.id)}
              >
                Load
              </button>{' '}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Shelf
