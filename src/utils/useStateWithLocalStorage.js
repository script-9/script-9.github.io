import { useState, useEffect } from 'react'

const globalKey = 'script-9'

const useStateWithLocalStorage = localStorageKey => {
  const compoundKey = `${globalKey}${localStorageKey}`

  const [value, setValue] = useState(localStorage.getItem(compoundKey) || '')

  useEffect(() => {
    localStorage.setItem(compoundKey, value)
  }, [value, compoundKey])

  return [value, setValue]
}

export default useStateWithLocalStorage
