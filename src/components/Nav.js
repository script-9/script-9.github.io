import React, { useEffect, useState } from 'react'
import { navigate } from '@reach/router'
import { Link } from '@reach/router'
import * as idb from 'idb-keyval'
import uuid from './../utils/uuid'
import isCassetteDirty from './../utils/isCassetteDirty'
import getIdbValues from './../utils/getIdbValues'

const Nav = props => {
  const { gist, path, cassette, setCassette, isOnline, setCovers } = props
  const [isDirty, setIsDirty] = useState(false)

  useEffect(() => {
    if (cassette) {
      navigate(`${path}?idbId=${cassette.idbId}`)
    } else {
      navigate(`${path}`)
    }
  }, [cassette, path])

  useEffect(() => {
    isCassetteDirty(cassette).then(setIsDirty)
  }, [cassette])

  const handleNew = () => {
    setCassette(null)
  }

  const handleSave = async () => {
    const updatedCassette = {
      ...cassette,
      updatedAt: Date.now(),
      idbId: cassette.idbId || uuid(),
    }

    await idb.set(updatedCassette.idbId, updatedCassette)
    setCassette(updatedCassette)
    const idbValues = await getIdbValues()
    setCovers(idbValues)
  }

  const handleDelete = async () => {
    await idb.del(cassette.idbId)
    setCassette(null)
    const idbValues = await getIdbValues()
    setCovers(idbValues)
  }

  const isNew = !cassette || !cassette.contents.code
  const canSave = isDirty && cassette.contents.code
  const canDelete = cassette

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
            <button disabled={!canSave} onClick={handleSave}>
              Save
            </button>
          </li>
          <li>
            <button disabled={!canDelete} onClick={handleDelete}>
              Delete
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav

// if (!cassette.uuid) {
// setCassette((cassette = {}) => ({
//   ...cassette,
//   uuid: uuid(),
// }))
// }
// const _handleSave = async () => {
// if (gist) {
//   try {
//     const json = await network.editGist({ gist, cassette, token })
//     setGist(json)
//   } catch (error) {}
// } else {
//   try {
//     const json = await network.createGist({ cassette, token })
//     setGist(json)
//     navigate(`${path}?id=${json.id}`)
//   } catch (error) {
//     // If we got a TypeError,
//     if (error.name === 'TypeError') {
//       try {
//         // and trying to fetch favicon errors out,
//         await network.fetchFavicon()
//       } catch (error) {
//         // then we'll assume this happened because we were offline.
//         const newCassette = {
//           ...cassette,
//           idbId: uuid(),
//         }
//         setCassette(newCassette)
//         // Put the cassette in idb.
//         try {
//           await idb.set(newCassette.idbId, newCassette)
//         } catch (error) {
//           console.error(error)
//         }
//       }
//     }
//   }
// }
// }

// const loadGist = async gistId => {
//   try {
//     const json = await network.fetchGist(gistId)
//     setGist(json)
//   } catch (error) {
//     console.log(error)
//   }
// }

// useEffect(() => {
//   const { search } = window.location
//   const params = new window.URLSearchParams(search)
//   const id = params.get('id')
//   if (!gist && id) {
//     console.log('fetching id')
//     loadGist(id)
//   }
// }, [])
// {
//   /* <li>
// <Link to={gist ? `/shelf?id=${gist.id}` : '/shelf'}>Shelf</Link>
// </li> */
// }
