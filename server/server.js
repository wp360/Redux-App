const express = require('express')
const userRouter = require('./user')

// 新建app
const app = express()

app.use('/user', userRouter)

app.get('/',function(req,res){
  res.send('<h1>Hello React</h1>')
})

app.listen(5000,function(){
  console.log('Node App Start at Port 5000')
})
