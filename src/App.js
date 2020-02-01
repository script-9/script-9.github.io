import React, { useState, useEffect } from 'react'
import './styl/App.css'

const App = () => {
  const [count, setCount] = useState(0)
  const [installPrompt, setInstallPrompt] = useState(null)

  useEffect(() => {
    console.log('useing effect')
    const ready = e => {
      e.preventDefault()
      setInstallPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', ready)
    return () => {
      window.removeEventListener('beforeinstallprompt', ready)
    }
  }, [])

  const installA2HS = () => {
    installPrompt.prompt()
    installPrompt.userChoice.then(choiceResult => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt')
      }
      setInstallPrompt(null)
    })
  }

  return (
    <div className="App">
      <p>SCRIPT-8</p>
      <p>count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase count</button>
      {installPrompt && <button onClick={installA2HS}>Add to homepage</button>}
    </div>
  )
}

export default App
