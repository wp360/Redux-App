import React from 'react'
import {connect} from 'react-redux'
// import {login} from './Auth.redux'

@connect(
  state=>state
)

class Auth extends React.Component {
  render() {
    return <h2>你没有权限，需要登录才能看</h2>
  }
}

export default Auth
