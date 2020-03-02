import React, { useEffect } from 'react'
import network from './../utils/network'
import usePrevious from './../utils/usePrevious'

// If the id is different than the previous one,
// fetch the gist.
const GistFetcher = props => {
  const { gistId, setCassette } = props
  const previousGistId = usePrevious(gistId)

  useEffect(
    () => {
      const fetchData = async () => {
        console.log('GistFetcher: fetching data')
        const gist = await network.fetchGist(gistId)

        try {
          setCassette((cassette = {}) => ({
            ...cassette,
            gist,
            contents: {
              code: gist.files['code.json'].content,
            },
          }))
        } catch (error) {
          // TODO: can we make this more useful to the user?
          console.log({ error })
        }
      }

      if (gistId && gistId !== previousGistId) {
        fetchData()
      }
    },
    [gistId, previousGistId, setCassette],
  )

  return <>a</>
}

export default GistFetcher
