import React, { useEffect } from 'react'
import { Link, navigate } from '@reach/router'
import network from './../utils/network'
import { saveState } from './../utils/localStorage'

const Nav = props => {
  const { gist, setGist, path, cassette, token, isOnline } = props

  const handleNew = () => {
    setGist(null)
    navigate(path)
  }

  const handleSave = async () => {
    if (gist) {
      try {
        const json = await network.editGist({ gist, cassette, token })
        setGist(json)
      } catch (error) {}
    } else {
      try {
        const json = await network.createGist({ cassette, token })
        setGist(json)
        navigate(`${path}?id=${json.id}`)
      } catch (error) {
        // If we got a TypeError,
        if (error.name === 'TypeError') {
          try {
            await network.fetchFavicon()
          } catch (error) {
            // and trying to fetch favicon errors out,
            // then we'll assume this happened because we were offline.
            // Put the cassette in localStorage.
          }
        }
      }
    }
  }

  const loadGist = async gistId => {
    try {
      const json = await network.fetchGist(gistId)
      setGist(json)
    } catch (error) {
      console.log(error)
    }
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
    cassette &&
    (!gist || gist.files['cassette.json'].content !== cassette.content)

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
      {!isOnline && <div>OFFLINE</div>}
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
