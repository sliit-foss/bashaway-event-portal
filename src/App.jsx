import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

import Login from './pages/Login'

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
