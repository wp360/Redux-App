import React from 'react';
import { Link, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import App from './App';
import {logout} from './redux/Auth';

const About = () => (
    <div>
        <h2>About</h2>
    </div>
)

const Topics = () => (
    <div>
        <h2>Topics</h2>
    </div>
)

class Dashboard extends React.Component {
    render() {
        console.log(this.props)
        const match = this.props.match
        console.log(match)
        const redirectToLogin = <Redirect to='/login'></Redirect>
        const app = (
            <div>
                <h1>已经登录</h1>
                {this.props.isAuth ? <button onClick={this.props.logout}>注销</button> : null}
                <ul>
                    <li><Link to={`${match.url}/`}>Home</Link></li>
                    <li><Link to={`${match.url}/about`}>About</Link></li>
                    <li><Link to={`${match.url}/topics`}>Topics</Link></li>
                </ul>
                <hr />
                <Route exact path={`${match.url}/`} component={App} />
                <Route path={`${match.url}/about`} component={About} />
                <Route path={`${match.url}/topics`} component={Topics} />
            </div>
        )
        return this.props.isAuth ? app : redirectToLogin
    }
}

const mapStatetoProps = (state) => {
    return state.auth
}
const actionCreators = { logout }
Dashboard = connect(mapStatetoProps, actionCreators)(Dashboard)

export default Dashboard