import React from 'react'
import {Route,Link,Redirect} from 'react-router-dom'
import App from './App'
import {connect} from 'react-redux'
import {logout} from './Auth.redux'

function Erying() {
  return <h2>二营</h2>
}

function Qibinglian() {
  return <h2>骑兵连</h2>
}

@connect(
  state=>state.auth,
  {logout}
)

class Dashboard extends React.Component {
  render() {
    console.log(this.props)
    const redirectToLogin = <Redirect to='/login'></Redirect>
    const app = (
      <div>
        <ul>
          <li>
            <Link to='/dashboard/'>一营</Link>
          </li>
          <li>
            <Link to='/dashboard/erying'>二营</Link>
          </li>
          <li>
            <Link to='/dashboard/qibinglian'>骑兵连</Link>
          </li>
        </ul>
        <Route path='/dashboard/' exact component={App}/>
        <Route path='/dashboard/erying' component={Erying}/>
        <Route path='/dashboard/qibinglian' component={Qibinglian}/>
      </div>
    )
    return this.props.isAuth?app:redirectToLogin
  }
}

export default Dashboard
