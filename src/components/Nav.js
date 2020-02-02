import React, { useEffect } from 'react'
import { Link, navigate } from '@reach/router'
import throwError from '../utils/throwError'

const Nav = props => {
  const { gist, setGist, path, cassette, token } = props

  const handleNew = () => {
    setGist(null)
    navigate(path)
  }

  const handleSave = async () => {
    const payload = {
      public: true,
      description: 'SCRIPT-9',
      files: {
        'cassette.json': {
          content: cassette,
        },
      },
    }
    const options = {
      headers: {
        Authorization: `token ${token.value}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }

    if (gist) {
      const { id } = gist
      const url = `https://api.github.com/gists/${id}`
      options.method = 'PATCH'

      const response = await fetch(url, options)
      if (response.status === 200) {
        const json = await response.json()
        setGist(json)
      } else {
        console.log(response.statusText)
      }
    } else {
      const url = `https://api.github.com/gists`
      options.method = 'POST'

      const response = await fetch(url, options)
      if (response.status === 201) {
        const json = await response.json()
        setGist(json)
        navigate(`${path}?id=${json.id}`)
      } else {
        console.log(response.statusText)
      }
    }
  }

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
      })
      .catch(error => {
        console.log({ error })
      })
  }

  useEffect(() => {
    const { search } = window.location
    const params = new window.URLSearchParams(search)
    const id = params.get('id')
    if (!gist && id) {
      console.log('fetching id')
      loadGist(id)
    }
  }, [])

  const isNew = !cassette && !gist
  const isDirty =
    cassette && (!gist || gist.files['cassette.json'].content !== cassette)

  return (
    <nav>
      <div className="pages">
        <ul>
          <li>
            <Link to={gist ? `/?id=${gist.id}` : '/'}>Home</Link>
          </li>
          <li>
            <Link to={gist ? `/code?id=${gist.id}` : '/code'}>Code</Link>
          </li>
          <li>
            <Link to={gist ? `/shelf?id=${gist.id}` : '/shelf'}>Shelf</Link>
          </li>
        </ul>
      </div>
      <div className="buttons">
        <ul>
          <li>
            <button disabled={isNew} onClick={handleNew}>
              New
            </button>
          </li>
          <li>
            <button disabled={!isDirty} onClick={handleSave}>
              Save
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav
