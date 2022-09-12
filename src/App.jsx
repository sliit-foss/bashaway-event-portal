import Login from './pages/login'
import Questions from './pages/questions'
import QuestionView from './pages/questionView'
import ForgotPassword from './pages/forgotPassword'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './styles/App.css'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Questions />} />
          <Route path="/login" element={<Login />} />
          <Route path="/question" element={<QuestionView />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
