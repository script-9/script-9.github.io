const assembleGistPayload = cassette => ({
  public: true,
  description: 'SCRIPT-9',
  files: {
    'code.json': {
      content: cassette.contents.code,
    },
  },
})

const fetchFavicon = async () => {
  try {
    const response = fetch('/img/favicon.co')
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response
  } catch (error) {
    throw error
  }
}

const fetchGist = async gistId => {
  const url = `https://api.github.com/gists/${gistId}`
  const response = await fetch(url)
  if (response.status === 200) {
    const json = await response.json()
    return json
  } else {
    throw new Error(`${response.status}: ${response.statusText}`)
  }
}

const editGist = async ({ cassette, token }) => {
  const payload = assembleGistPayload(cassette)
  const options = {
    headers: {
      Authorization: `token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }
  const id = cassette.gist ? cassette.gist.id : cassette.gistId
  const url = `https://api.github.com/gists/${id}`
  options.method = 'PATCH'
  const response = await fetch(url, options)
  if (response.status === 200) {
    const json = await response.json()
    return json
  } else {
    throw new Error(`${response.status}: ${response.statusText}`)
  }
}

const createGist = async ({ cassette, token }) => {
  const payload = assembleGistPayload(cassette)
  const options = {
    headers: {
      Authorization: `token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }
  const url = `https://api.github.com/gists`
  options.method = 'POST'
  const response = await fetch(url, options)
  if (response.status === 201) {
    const json = await response.json()
    return json
  } else {
    throw new Error(`${response.status}: ${response.statusText}`)
  }
}

const saveGist = async ({ cassette, token }) => {
  if (cassette.gist || cassette.gistId) {
    return await editGist({ cassette, token })
  } else {
    return await createGist({ cassette, token })
  }
}

export default { fetchGist, saveGist, fetchFavicon }
