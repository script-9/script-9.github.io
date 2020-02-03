import * as idb from 'idb-keyval'

const isCassetteDirty = async cassette => {
  if (!cassette) {
    return false
  } else {
    if (cassette.idbId) {
      const idbCassette = await idb.get(cassette.idbId)
      const isDirty = cassette.contents.code !== idbCassette.contents.code
      return isDirty
    } else {
      const isDirty = !!cassette.contents.code
      return isDirty
    }
  }
}

export default isCassetteDirty
