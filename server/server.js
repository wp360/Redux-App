const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

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
    console.log(data)
    // 发送信息到全局
    io.emit('recvmsg', data)
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
