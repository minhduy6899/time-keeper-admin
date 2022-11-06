import 'react-app-polyfill/stable'
import { render } from 'react-dom'
import 'core-js'
import 'bootstrap/dist/css/bootstrap.css'
import React from 'react'
// import { createRoot } from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import store from './store/index'

// createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
// )

const root = document.getElementById('root')
// const root = ReactDOM.createRoot(document.getElementById('root'));
render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  root,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
