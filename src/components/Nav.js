import React from 'react'
import NavLink from './NavLink'
import demoCode from './../utils/demoCode'
// import GistFetcher from './GistFetcher'
// import getIdFromLocation from './../utils/getIdFromLocation'

// import * as idb from 'idb-keyval'
// import uuid from './../utils/uuid'
// import network from './../utils/network'
// import usePrevious from './../utils/usePrevious'
// import isCassetteDirty from './../utils/isCassetteDirty'

const Nav = props => {
  const { cassette, setCassette } = props
  // const { location, cassette, setCassette } = props
  // const [, setIsDirty] = useState(false)

  // useEffect(
  //   () => {
  //     if (cassette?.gist) {
  //       navigate(`${path}?id=${cassette.gist.id}`)
  //     } else {
  //       navigate(`${path}`)
  //     }
  //   },
  //   [cassette, path],
  // )

  // useEffect(
  //   () => {
  //     isCassetteDirty(cassette).then(setIsDirty)
  //   },
  //   [cassette],
  // )

  // const handleNew = () => {
  //   setCassette(null)
  // }

  // const handleSave = async () => {
  //   try {
  //     // If save goes through:
  //     // - remove cassette from idb
  //     // - remove its idbId
  //     const gist = await network.saveGist({ cassette, token })
  //     if (cassette.idbId) {
  //       await idb.del(cassette.idbId)
  //     }
  //     const updatedCassette = {
  //       ...cassette,
  //       gist,
  //       idbId: null,
  //     }
  //     setCassette(updatedCassette)
  //   } catch (error) {
  //     // If save fails:
  //     // - give cassette an idbId
  //     // - remove the gist part, but keep gistId
  //     // - put cassette in idb
  //     const updatedCassette = {
  //       ...cassette,
  //       idbUpdatedAt: Date.now(),
  //       idbId: cassette.idbId || uuid(),
  //       gist: null,
  //       gistId: (cassette.gist?.id) || null,
  //     }
  //     await idb.set(updatedCassette.idbId, updatedCassette)
  //     setCassette(updatedCassette)
  //   }
  // }

  // const isNew = !cassette || !(cassette.contents?.code)
  // const canSave = (!isNew && isDirty) || (!isNew && cassette.idbId)

  // const gistId = getIdFromLocation(location)

  return (
    <nav>
      {/* <GistFetcher gistId={gistId} setCassette={setCassette} /> */}
      <div className="pages">
        <ul>
          <li>
            <NavLink to={cassette?.gist ? `/?id=${cassette.gist.id}` : '/'}>
              SCRIPT-8
            </NavLink>
          </li>
          <li>
            <NavLink
              to={cassette?.gist ? `/code?id=${cassette.gist.id}` : '/code'}
            >
              Code
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to={
                cassette && cassette.gist
                  ? `/shelf?id=${cassette.gist.id}`
                  : '/shelf'
              }
            >
              Shelf
            </NavLink>
          </li> */}
          <li>
            <NavLink
              to={cassette?.gist ? `/run?id=${cassette.gist.id}` : '/run'}
            >
              Run
            </NavLink>
          </li>
          <li>
            <button
              onClick={() => {
                setCassette((cassette = {}) => ({
                  ...cassette,
                  contents: {
                    code: demoCode(),
                  },
                }))
              }}
            >
              Load test code
            </button>
          </li>
          {/* <li>
            <a href={`${process.env.REACT_APP_NOW}/api/oauth-authorize`}>
              comments-login
            </a>
          </li> */}
        </ul>
      </div>
      {/* {<div>v{version}</div>} */}
      {/* <div className="buttons">
        <ul>
          {isDirty && <li>*</li>}
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
        </ul>
      </div> */}
    </nav>
  )
}

export default Nav
