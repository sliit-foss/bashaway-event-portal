import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import AnimatedRoutes from './components/AnimatedRoutes'

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </div>
    </Provider>
  )
}

export default App
