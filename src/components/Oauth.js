import React, { useEffect } from 'react'
import network from '../utils/network'
import { navigate } from '@reach/router'

const Oauth = props => {
  const { location, setCommentsToken } = props

  useEffect(() => {
    const { search } = location
    const params = new window.URLSearchParams(search)
    const code = params.get('code')

    if (code) {
      // This means the user clicked login and was redirected here.
      // We now need to ask for access token.
      network
        .fetchGithubAppAccessToken(code)
        .then(json => {
          setCommentsToken(json.access_token)
          navigate('/')
        })
        .catch(error => {
          console.log({ error })
        })
    }
  }, [location, setCommentsToken])

  return (
    <>
      <div className="Oauth">
        <h1>Oauth</h1>
      </div>
    </>
  )
}

export default Oauth
