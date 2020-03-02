const getIdFromLocation = (location = {}) => {
  const { search } = location
  const params = new window.URLSearchParams(search)
  const id = params.get('id')
  return id
}

export default getIdFromLocation
