import React from 'react'
import {
  List,
  InputItem,
  NavBar,
  Icon,
  Grid
} from 'antd-mobile'
import {connect} from 'react-redux'
import {
  getMsgList,
  sendMsg,
  recvMsg
} from '../../redux/chat.redux'
import {getChatId} from '../../util'
// import { emojiIndex } from 'emoji-mart'
// import io from 'socket.io-client'
// const socket = io('ws://localhost:5000')

@connect(
  state=>state,
  {
    getMsgList,
    sendMsg,
    recvMsg
  }
)
class Chat extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      msg: []
    }
  }

  componentDidMount() {
    // 获取一下信息
    if(!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
    // socket.on('recvmsg', (data) => {
    //   // console.log(data)
    //   this.setState({
    //     msg: [...this.state.msg, data.text]
    //   })
    // })
    // 解决Grid第一次加载显示一行问题
    // this.fixCarousel()
  }

  // 修正跑马灯
  fixCarousel() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }

  handleSubmit() {
    // socket.emit('sendmsg', {text: this.state.text})
    // 清空信息
    // this.setState({text: ''})
    // console.log(this.state)
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg(from,to,msg)
    this.setState({
      text: '',
      showEmoji: false
    })
  }

  render() {
    // console.log(this.props)
    // {this.state.msg.map(v=>{return <p key={v}>{v}</p>})}
    // 表情包
    const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
      .split(' ')
      .filter(v => v)
      .map(v => ({
        text: v
      }))
    // const emoji = emojiIndex.search('smile')
    // .map((o) => o.native)
    // .toString()
    // .split(',')
    // .filter(v => v)
    // .map(v => ({
    //       text: v
    //     }))
    // console.log(emoji)
    const userid = this.props.match.params.user
    const Item = List.Item
    const users = this.props.chat.users
    if(!users[userid]) {
      return null
    }
    // 聊天信息（过滤）
    const chatid = getChatId(userid, this.props.user._id)
    const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid === chatid)
    return (
      <div id="chat-page">
        <NavBar mode='dark' icon={(<Icon type="left"/>)} onLeftClick={()=>{this.props.history.goBack()}}>
          {users[userid].name}
        </NavBar>
        {chatmsgs.map(v=>{
          // 头像
          const avatar = require(`../img/${users[v.from].avatar}.png`)
          return v.from === userid ? (
            <List key={v._id}>
              <Item thumb={avatar}>
                {v.content}
              </Item>
            </List>
          ) : (
            <List key={v._id}>
              <Item extra={<img src={avatar} alt="头像" />} className="chat-me">
                {v.content}
              </Item>
            </List>
          )
        })}
        <div className="stick-footer">
          <List>
            <InputItem
              value={this.state.text}
              placeholder='请输入'
              onChange={v=>{
                this.setState({text:v})
              }}
              extra={
                <div>
                  <span
                  style={{marginRight:15}}
                  onClick={() => {
                  this.setState({
                    showEmoji: !this.state.showEmoji
                  })
                  this.fixCarousel()
                }}>表情</span>
                  <span onClick={()=>this.handleSubmit()}>发送</span>
                </div>
              }
            ></InputItem>
          </List>
          {this.state.showEmoji ? <Grid
            data={emoji}
            columnNum={9}
            carouselMaxRow={4}
            isCarousel={true}
            onClick={el=>{
              this.setState({
                text: this.state.text+el.text
              })
              // console.log(el)
            }}
          /> : null}
        </div>
      </div>
    )
  }
}

export default Chat
