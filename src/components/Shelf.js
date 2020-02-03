import React from 'react'
import _ from 'lodash'
import timeAgo from './../utils/timeAgo'
import * as idb from 'idb-keyval'
import { navigate } from '@reach/router'

const Covers = props => {
  const { covers, setCassette, cassette } = props
  const now = Date.now()

  const handleLoad = async idbId => {
    const value = await idb.get(idbId)
    setCassette(value)
    navigate(`/code`)
  }

  return (
    <ul className="Covers">
      {_(covers)
        .sortBy(['updatedAt'])
        .reverse()
        .map((cover, i) => (
          <li key={i}>
            <div>
              <span className="time-ago">
                {timeAgo({ now, before: cover.updatedAt })}
              </span>
              <button
                disabled={cassette && cover.idbId === cassette.idbId}
                onClick={() => handleLoad(cover.idbId)}
              >
                Load
              </button>
              <span>{cover.contents.code}</span>
            </div>
          </li>
        ))
        .value()}
    </ul>
  )
}

const Shelf = props => {
  return (
    <>
      <div className="Shelf">
        <h1>Shelf</h1>
        <Covers {...props} />
      </div>
    </>
  )
}

export default Shelf

// useEffect(() => {
// Try getting offline cassettes.
// idb
//   .keys()
//   .then(keys => Promise.all(keys.map(key => idb.get(key))))
//   .then(things => {
//     console.log({ things })
//   })
//     // Take an array of promises and wait on them all
// return Promise.all(
//   // Map our array of chapter urls to
//   // an array of chapter json promises
//   story.chapterUrls.map(getJSON)
// );
// setCovers([
//   ...keys.map(key => ({
//     id: key,
//     isIdbCassette: true,
//   })),
// ])
//   setCassettes([
//     { id: 'e4caf0c2cb95499341d1731912c240f8' },
//     { id: '9b0be7b96b75be367d28b51ecb0a7e55' },
//     { id: 'c212d83cfb18e58135ea17bc56afba87' },
//   ])
// })
// }, [])

// const loadGist = async gistId => {
//   try {
//     const json = await network.fetchGist(gistId)
//     setGist(json)
//     navigate(`/code?id=${json.id}`)
//   } catch (error) {
//     console.log(error)
//   }
// }
// import React, { useState, useEffect } from 'react'
// import { navigate } from '@reach/router'
// import * as idb from 'idb-keyval'
// import network from './../utils/network'
// import Nav from './Nav'

// const nullCassette = null

// const newCassetteNotSaved = {
//   contents: {
//     code: {},
//     // also art, music, etc
//   },
// }

// const newCassetteSavedOffline = {
//   idbId: 'uuid',
//   contents: {
//     code: {},
//     // also art, music, etc
//   },
// }

// // As soon as we're back online, the offline-only cassette is saved
// // to GitHub. Once all the saving is done,
// // if we go to SHELF, we get all the GitHub gists.
// // Initially we'll have duplicates:
// // the GitHub-saved one along with the one in idb.

// const newCassetteSavedOfflineAndThenSyncd1stStep = {
//   idbId: 'uuid',
//   gist: {},
//   contents: {
//     code: {},
//     // also art, music, etc
//   },
// }

// const newCassetteSavedOfflineAndThenSyncd2ndStep = {
//   gist: {},
//   contents: {
//     code: {},
//     // also art, music, etc
//   },
// }

// const onlineCassetteSavedOffline = {
//   idbId: 'uuid',
//   gist: {},
//   contents: {
//     code: {},
//     // also art, music, etc
//   },
// }

// From this it is obvious that, if a cassette has a idbId,
// {/* <button>Load</button>
// {c.id}{' '}
// <button
//   disabled={gist && cassette.id === gist.id}
//   onClick={() => loadGist(cassette.id)}
// >
//   Load
// </button>{' '} */}
