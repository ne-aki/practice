import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import MusicComposer from './MusicComposer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MusicComposer />
    </>
  )
}

export default App
