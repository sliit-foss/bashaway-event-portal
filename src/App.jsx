import Login from './pages/Login'
import Questions from './pages/Questions'
import './styles/App.css'
import { Route, Routes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route index element={<Login />} /> */}
          <Route path="/home" element={<Questions />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
