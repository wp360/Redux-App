import React from 'react'
import {List, InputItem} from 'antd-mobile'
import io from 'socket.io-client'
const socket = io('ws://localhost:5000')

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
    socket.on('recvmsg', (data) => {
      // console.log(data)
      this.setState({
        msg: [...this.state.msg, data.text]
      })
    })
  }

  handleSubmit() {
    socket.emit('sendmsg', {text: this.state.text})
    // 清空信息
    this.setState({text: ''})
    // console.log(this.state)
  }

  render() {
    console.log(this.props)
    return (
      <div>
        {this.state.msg.map(v=>{return <p key={v}>{v}</p>})}
        <div className="stick-footer">
          <List>
            <InputItem
              value={this.state.text}
              placeholder='请输入'
              onChange={v=>{
                this.setState({text:v})
              }}
              extra={<span onClick={()=>this.handleSubmit()}>发送</span>}
            >
            信息</InputItem>
          </List>
        </div>
      </div>
    )
  }
}

export default Chat
