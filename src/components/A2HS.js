import React, { useState, useEffect } from 'react'

const A2HS = () => {
  const [installPrompt, setInstallPrompt] = useState(null)

  useEffect(() => {
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
    <div>
      {installPrompt && <button onClick={installA2HS}>Add to homepage</button>}
    </div>
  )
}

export default A2HS
