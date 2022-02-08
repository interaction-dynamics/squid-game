import { Routes, Route } from 'react-router-dom'

import './styles.css'

import Welcome from 'components/views/Welcome'
import ModeOfDifficulty from 'components/views/ModeOfDifficulty'
import Game from 'components/views/Game'
import GameOver from 'components/views/GameOver'
import Victory from 'components/views/Victory'

const App = () => (
  <Routes>
    <Route path="/" element={<Welcome />} />
    <Route path="/difficulty" element={<ModeOfDifficulty />} />
    <Route path="/game-over" element={<GameOver />} />
    <Route path="/game" element={<Game />} />
    <Route path="/victory" element={<Victory />} />
  </Routes>
)

export default App
