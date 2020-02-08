const fetchFavicon = async () => {
  try {
    const response = fetch('/img/favicon.co')
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response
  } catch (e) {
    throw e
  }
}

const fetchGist = async gistId => {
  const url = `https://api.github.com/gists/${gistId}`
  const response = await fetch(url)
  if (response.status === 200) {
    const json = await response.json()
    return json
  } else {
    throw new Error(response.statusText)
  }
}

const assembleGistPayload = cassette => ({
  public: true,
  description: 'SCRIPT-9',
  files: {
    'code.json': {
      content: cassette.contents.code,
    },
  },
})

const editGist = async ({ cassette, token }) => {
  const payload = assembleGistPayload(cassette)
  const options = {
    headers: {
      Authorization: `token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }
  const { id } = cassette.gist
  const url = `https://api.github.com/gists/${id}`
  options.method = 'PATCH'
  const response = await fetch(url, options)
  if (response.status === 200) {
    const json = await response.json()
    return json
  } else {
    throw new Error(response.statusText)
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
    // edit
    const response = await editGist({ cassette, token })
    return response
  } else {
    // create
    const response = await createGist({ cassette, token })
    return response
  }
}

export default { fetchGist, editGist, createGist, saveGist, fetchFavicon }
