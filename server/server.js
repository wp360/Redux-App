const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
// 引入聊天数据模型
const Chat = model.getModel('chat')
// 新建app
const app = express()

// socket.io绑定express
// work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', function(socket) {
  // console.log('用户登录')
  // 监听客户端发送的信息
  socket.on('sendmsg', function (data) {
    // console.log('返回信息：', data)
    // 发送信息到全局
    // io.emit('recvmsg', data)
    const {from, to, msg} = data
    const chatid = [from, to].sort().join('_')
    // console.log(chatid)
    Chat.create({chatid, from, to, content: msg}, function(err, doc) {
      io.emit('recvmsg', Object.assign({}, doc._doc))
    })
  })
})

const userRouter = require('./user')

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)

app.get('/',function(req,res){
  res.send('<h1>Hello React</h1>')
})

server.listen(5000,function(){
  console.log('Node App Start at Port 5000')
})
