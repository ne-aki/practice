import { Routes, Route } from 'react-router-dom'
import './App.css'
import PokemonType from './PokemonType'
import PokemonTypeDetail from './PokemonTypeDetail'

function App() {

  return (
    <Routes>
      <Route path="/" element={<PokemonType />} />
      <Route path="/detail" element={<PokemonTypeDetail />} />
    </Routes>
  )
}

export default App
