import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import './index.css'
import App from './App'
import { counter } from './index.redux'
import * as serviceWorker from './serviceWorker'

// const store = createStore(counter, applyMiddleware(thunk))
const store = createStore(counter, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension(): f => f
))

ReactDOM.render(
  (<Provider store={store}>
    <App />
  </Provider>),
  document.getElementById('root')
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
