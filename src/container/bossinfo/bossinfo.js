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

@connect(
  state=>state.user,
  {update}
)
class BossInfo extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      title: ''
    }
  }

  onChange(key, val) {
    this.setState({
      [key]: val
    })
  }

  render() {
    return (
      <div>
        <NavBar mode="dark">Boss完善信息页面</NavBar>
        {/* selectAvatar={this.selectAvatar} */}
        <AvatarSelector selectAvatar={(imgname) => {this.setState({avatar: imgname})}}></AvatarSelector>
        <InputItem onChange={(v)=>this.onChange('title', v)}>招聘职位</InputItem>
        <InputItem onChange={(v)=>this.onChange('company', v)}>公司名称</InputItem>
        <InputItem onChange={(v)=>this.onChange('money', v)}>职位薪资</InputItem>
        <TextareaItem
          onChange={(v)=>this.onChange('desc', v)}
          row={3}
          autoHeight
          title='职位要求'
        ></TextareaItem>
        <Button type="primary" className="save-btn" style={{marginTop: 20}} onClick={()=> this.props.update(this.state)}>保存</Button>
      </div>
    )
  }
}

export default BossInfo
