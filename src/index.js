import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store'
import App from './components/App'
import './utils/i18n'

import './styles.css'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  rootElement
)
