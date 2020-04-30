import React from 'react'
import {
  NavBar,
  InputItem,
  TextareaItem,
  Button
} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
// redux >> update数据存储
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
  state=>state.user,
  {update}
)
class GeniusInfo extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      desc: ''
    }
  }

  onChange(key, val) {
    this.setState({
      [key]: val
    })
  }

  render() {
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div>
        {redirect && redirect !== path ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <NavBar mode="dark">求职者完善信息页面</NavBar>
        {/* selectAvatar={this.selectAvatar} */}
        <AvatarSelector selectAvatar={(imgname) => {this.setState({avatar: imgname})}}></AvatarSelector>
        <InputItem onChange={(v)=>this.onChange('title', v)}>求职岗位</InputItem>
        <TextareaItem
          onChange={(v)=>this.onChange('desc', v)}
          row={3}
          autoHeight
          title='自我介绍'
        ></TextareaItem>
        <Button type="primary" className="save-btn" style={{marginTop: 20}} onClick={()=> this.props.update(this.state)}>保存</Button>
      </div>
    )
  }
}

export default GeniusInfo
