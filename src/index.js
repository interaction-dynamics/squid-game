import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store'
import App from './App'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </StrictMode>,
  rootElement
)
