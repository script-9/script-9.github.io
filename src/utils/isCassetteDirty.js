import * as idb from 'idb-keyval'

const isCassetteDirty = async cassette => {
  if (!cassette) {
    return false
  } else {
    if (cassette.idbId) {
      const idbCassette = await idb.get(cassette.idbId)
      const isDirty = cassette.contents.code !== idbCassette.contents.code
      return isDirty
    } else if (cassette.gist) {
      const isDirty =
        cassette.contents &&
        cassette.contents.code !== cassette.gist.files['code.json'].content
      return isDirty
    } else {
      return !!cassette.contents.code
    }
  }
}

export default isCassetteDirty
