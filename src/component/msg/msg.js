import React from 'react'
import {connect} from 'react-redux'
import {List} from 'antd-mobile'

@connect(
  state=>state
)
class Msg extends React.Component {
  // 获取最后一条消息
  getLast(arr) {
    return arr[arr.length-1]
  }
  render() {
    // console.log(this.props)
    // if (!this.props.chat.chatmsg.length) {
    //   return
    // }
    const Item = List.Item
    const Brief = Item.Brief
    const userid = this.props.user._id
    const userinfo = this.props.chat.users
    const msgGroup= {}
    this.props.chat.chatmsg.forEach(v=>{
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    // console.log(msgGroup)
    const chatList = Object.values(msgGroup)
    // 按照聊天用户分组，根据chatid
    return (
      <div>
        {chatList.map(v=> {
          console.log(v)
          const lastItem = this.getLast(v)
          const targetId = v[0].from === userid ? v[0].to : v[0].from
          if(!userinfo[targetId]) {
            return null
          }
          // const name = userinfo[targetId] ? userinfo[targetId].name : ''
          // const avatar = userinfo[targetId] ? userinfo[targetId].avatar : ''
          return(
            <List key={lastItem._id}>
              <Item thumb={require(`../img/${userinfo[targetId].avatar}.png`)}>
                {lastItem.content}
                <Brief>{userinfo[targetId].name}</Brief>
              </Item>
            </List>
          )
        })}
      </div>
    )
  }
}

export default Msg
