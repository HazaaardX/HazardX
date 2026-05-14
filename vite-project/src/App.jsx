import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { HomePage } from './pages/HomePage'
import { PredictionPage } from './pages/PredictionPage'

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/predict"
          element={<PredictionPage />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App