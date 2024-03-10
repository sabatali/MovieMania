import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './App/Store.js'
import { BardContextProvider } from './Context/Context.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BardContextProvider>
    <App />
    </BardContextProvider>
  </Provider>,
)
