import Login from './pages/login'
import Questions from './pages/questions'
import QuestionView from './pages/questionView'
import ForgotPassword from './pages/forgotPassword'
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
