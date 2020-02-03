import * as idb from 'idb-keyval'

const getIdbValues = () =>
  idb.keys().then(keys => Promise.all(keys.map(key => idb.get(key))))

export default getIdbValues
