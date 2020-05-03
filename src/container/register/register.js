import React from 'react'
import Logo from '../../component/logo/logo'
import {
  List,
  InputItem,
  Radio,
  WingBlank,
  WhiteSpace,
  Button
} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from '../../redux/user.redux'
import Form from '../../component/form/form'

@connect(
  state=>state.user,
  {register}
)

@Form
class Register extends React.Component{
  constructor(props) {
    super(props)
    // this.state = {
    //   user: '',
    //   pwd: '',
    //   repeatpwd: '',
    //   type: 'genius' // 或者boss
    // }
    this.handleRegister = this.handleRegister.bind(this)
  }
  componentDidMount(){
    this.props.handleChange('type', 'genius')
  }
  // handleChange(key,val){
  //   this.setState({
  //     [key]: val
  //   })
  // }
  handleRegister(){
    this.props.register(this.props.state)
    // console.log(this.state)
  }
  render() {
    const RadioItem = Radio.RadioItem
    const titleStyle = {
      textAlign: 'center'
    }
    return (
      <div>
        {this.props.redirectTo?<Redirect to={this.props.redirectTo} />:null}
        <Logo />
        <h2 style={titleStyle}>注册页</h2>
        <WingBlank>
          <List>
            {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
            <InputItem onChange={v=>this.props.handleChange('user',v)}>用户名</InputItem>
            <WhiteSpace />
            <InputItem type="password" onChange={v=>this.props.handleChange('pwd',v)}>密码</InputItem>
            <WhiteSpace />
            <InputItem type="password" onChange={v=>this.props.handleChange('repeatpwd',v)}>确认密码</InputItem>
            <WhiteSpace />
            <RadioItem checked={this.props.state.type === 'genius'} onChange={()=>this.props.handleChange('type','genius')}>人才</RadioItem>
            <RadioItem checked={this.props.state.type === 'boss'} onChange={()=>this.props.handleChange('type','boss')}>Boss</RadioItem>
            <WhiteSpace />
            <Button type='primary' onClick={this.handleRegister}>注册</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default Register
