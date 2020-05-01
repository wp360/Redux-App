import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'
// Boss信息
import BossInfo from './container/bossinfo/bossinfo'
// 求职者信息
import GeniusInfo from './container/geniusinfo/geniusinfo'
// dashboard
import Dashboard from './component/dashboard/dashboard'
import reducers from './reducer'
import './config'
import './index.css'
import * as serviceWorker from './serviceWorker'

// const store = createStore(counter, applyMiddleware(thunk))
const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension(): f => f
))

// console.log(store.getState())
// function Boss() {
//   return <h2>BOSS 页面</h2>
// }

// function Dashboard() {
//   return <h2>Dashboard</h2>
// }

ReactDOM.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute />
        <Switch>
          <Route path='/bossinfo' component={BossInfo}/>
          <Route path='/geniusinfo' component={GeniusInfo}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route component={Dashboard}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
