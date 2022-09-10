import Login from './pages/Login'
import Questions from './pages/Questions'
import QuestionView from './pages/QuestionView'
import ForgotPassword from './pages/ForgotPassword'
import './styles/App.css'
import { Route, Routes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Questions />} />
          <Route path="/question" element={<QuestionView />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
