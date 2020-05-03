import React from 'react'
import Logo from '../../component/logo/logo'
import {
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button
} from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/user.redux'
// 高阶组件优化
import Form from '../../component/form/form'

// 高阶函数
// function hello() {
//   console.log('Hello react')
// }
// // hello()

// function WrapperHello(fn) {
//   return function() {
//     console.log('Before say Hello')
//     fn()
//     console.log('After say Hello')
//   }
// }

// hello = WrapperHello(hello)

// 高阶组件
// 属性代理
// function WrapperHello(Comp) {
//   // 反向继承
//   class WrapComp extends Comp{
//     componentDidMount() {
//       console.log('高阶组件新增的生命周期，加载完成')
//     }
//     render() {
//       return <Comp />
//     }
//   }

//   // class WrapComp extends React.Component{
//   //   render() {
//   //     return (
//   //       <div>
//   //         <p>HOC 高阶组件特有元素</p>
//   //         <Comp {...this.props}></Comp>
//   //       </div>
//   //     )
//   //   }
//   // }
//   return WrapComp
// }

// @WrapperHello
// class Hello extends React.Component{
//   render() {
//     return <h2>Hello React</h2>
//   }
// }

// function WrapperHello(Comp) {
//   class WrapComp extends React.Component{
//     render() {
//       return (
//         <div>
//           <p>HOC 高阶组件特有元素</p>
//           <Comp {...this.props}></Comp>
//         </div>
//       )
//     }
//   }
//   return WrapComp
// }

// Hello = WrapperHello(Hello)

@connect(
  state=>state.user,
  { login }
)

@Form
class Login extends React.Component{
  constructor(props) {
    super(props)
    // this.state = {
    //   user: '',
    //   pwd: ''
    // }
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  register() {
    console.log(this.props)
    this.props.history.push('/register')
  }

  // handleChange(key, val) {
  //   this.setState({
  //     [key]:val
  //   })
  // }

  handleLogin() {
    // 此处login由redux提供
    this.props.login(this.props.state)
  }

  render() {
    const titleStyle = {
      textAlign: 'center'
    }
    return (
      <div>
        {/* <Hello /> */}
        {this.props.redirectTo && this.props.redirectTo!=='/login'?<Redirect to={this.props.redirectTo} />:null}
        <Logo />
        <h2 style={titleStyle}>登录页</h2>
        <WingBlank>
          <List>
            {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
            <InputItem onChange={v=>this.props.handleChange('user', v)}>用户</InputItem>
            <WhiteSpace />
            <InputItem type='password' onChange={v=>this.props.handleChange('pwd', v)}>密码</InputItem>
          </List>
          <WhiteSpace />
          <Button type='primary' onClick={this.handleLogin}>登录</Button>
          <WhiteSpace />
          <Button type='primary' onClick={this.register}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login
