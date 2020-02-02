const fetchFavicon = () =>
  fetch('/img/favicon.co').then(response => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response
  })

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

const editGist = async ({ gist, cassette, token }) => {
  const payload = {
    public: true,
    description: 'SCRIPT-9',
    files: {
      'cassette.json': {
        content: cassette.content,
      },
    },
  }
  const options = {
    headers: {
      Authorization: `token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }

  const { id } = gist
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
  const payload = {
    public: true,
    description: 'SCRIPT-9',
    files: {
      'cassette.json': {
        content: cassette.content,
      },
    },
  }
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

export default { fetchGist, editGist, createGist, fetchFavicon }
