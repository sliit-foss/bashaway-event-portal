import Login from './pages/login'
import Register from './pages/register'
import Questions from './pages/questions'
import QuestionView from './pages/questionView'
import ForgotPassword from './pages/forgotPassword'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import './styles/App.css'

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Questions />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/question" element={<QuestionView />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  )
}

export default App
