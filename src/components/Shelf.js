import React, { useState, useEffect } from 'react'
import * as idb from 'idb-keyval'
import _ from 'lodash'
import timeAgo from './../utils/timeAgo'
import Nav from './Nav'
import { navigate } from '@reach/router'

const OfflineCassettes = props => {
  const { cassette, setCassette } = props
  const [offlineCassettes, setOfflineCassettes] = useState([])

  useEffect(() => {
    idb
      .keys()
      .then(keys => Promise.all(keys.map(key => idb.get(key))))
      .then(setOfflineCassettes)
  }, [])

  const handleLoad = async idbId => {
    const cassette = await idb.get(idbId)
    await navigate('/code')
    setCassette(cassette)
  }

  const now = Date.now()

  return (
    <>
      <h2>Offline cassettes</h2>
      <ul className="OfflineCassettes">
        {_(offlineCassettes)
          .sortBy(['idbUpdatedAt'])
          .reverse()
          .map((offlineCassette, i) => (
            <li key={i}>
              <div>
                <span className="time-ago">
                  {timeAgo({ now, before: offlineCassette.idbUpdatedAt })}
                </span>
                <button
                  disabled={
                    cassette && offlineCassette.idbId === cassette.idbId
                  }
                  onClick={() => handleLoad(offlineCassette.idbId)}
                >
                  Load
                </button>
                <span>{offlineCassette.contents.code}</span>
              </div>
            </li>
          ))
          .value()}
      </ul>
    </>
  )
}

const Shelf = props => {
  return (
    <>
      <Nav {...props} />
      <div className="Shelf">
        <h1>Shelf</h1>
        <OfflineCassettes {...props} />
      </div>
    </>
  )
}

export default Shelf
