import Login from './pages/login'
import Register from './pages/register'
import Home from './pages/home'
import QuestionView from './pages/questionView'
import ForgotPassword from './pages/forgotPassword'
import ResetPassword from './pages/resetPassword'
import NotFound from './pages/404'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/question" element={<QuestionView />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:code" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  )
}

export default App
