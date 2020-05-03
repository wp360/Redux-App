import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import './index.css'

// import { counter } from './index.redux'
import reducers from './reducer'
import Auth from './Auth'
import Dashboard from './Dashboard'
import './config'
import * as serviceWorker from './serviceWorker'

// const store = createStore(counter, applyMiddleware(thunk))
// window.devToolsExtension
const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
))

// console.log(store.getState())

ReactDOM.render(
  (<Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={Auth}/>
        <Route path='/dashboard' component={Dashboard}/>
        <Redirect to='/dashboard'/>
      </Switch>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
