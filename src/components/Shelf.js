import React, { useState, useEffect } from 'react'
import { navigate } from '@reach/router'
import Nav from './Nav'
import throwError from '../utils/throwError'

const Shelf = props => {
  const { gist, setGist } = props
  const [cassettes, setCassettes] = useState([])

  useEffect(() => {
    // window
    //   .fetch(
    //     'https://api.github.com/users/gabrielflorit/gists?since=2020-02-01T21:52:00Z',
    //   )
    //   .then(
    //     response => response.json(),
    //     error =>
    //       throwError({
    //         error,
    //         message: `Could not fetch list of gists.`,
    //       }),
    //   )
    //   .then(json => {
    //     setCassettes(json)
    //   })
    //   .catch(error => {
    //     console.log({ error })
    //   })
    setCassettes([
      { id: 'e4caf0c2cb95499341d1731912c240f8' },
      { id: '9b0be7b96b75be367d28b51ecb0a7e55' },
      { id: 'c212d83cfb18e58135ea17bc56afba87' },
    ])
  }, [])

  const loadGist = gistId => {
    window
      .fetch(`https://api.github.com/gists/${gistId}`)
      .then(
        response => response.json(),
        error =>
          throwError({
            error,
            message: `Could not fetch gist.`,
          }),
      )
      .then(json => {
        setGist(json)
        navigate(`/code?id=${json.id}`)
      })
      .catch(error => {
        console.log({ error })
      })
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
