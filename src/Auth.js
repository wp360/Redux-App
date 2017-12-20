import React from 'react';
import { connect } from 'react-redux';
import { login } from './redux/Auth';
import { Redirect } from 'react-router-dom';

class Auth extends React.Component{
    render(){
        return(
            <div>
                {this.props.isAuth ? <Redirect to='/dashboard' /> : null}
                <h2>你没有权限,需要进行登录</h2>
                <button onClick={this.props.login}>登录</button>
            </div>
        )
        
    }
}

const mapStatetoProps = (state) => {
    return state.auth
}
const actionCreators = { login }
Auth = connect(mapStatetoProps, actionCreators)(Auth)

export default Auth