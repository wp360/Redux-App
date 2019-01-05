const express = require('express')
const mongoose = require('mongoose')

//连接Mongo，并且使用data这个集合
const DB_URL = 'mongodb://admin:abc123@ds039684.mlab.com:39684/job-data'; //mongodb://localhost:27017
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function () {
  console.log('数据库连接成功')
})

// 类似于mysql的表 mongo里有文档、字段的概念(参数：文档名称user，值Schema文档生成)
const User = mongoose.model('user', new mongoose.Schema({
  user: {
    type: String,
    require: true
  },
  age: {
    type: Number,
    require: true
  }
}))

//新增数据
/*
User.create({
    user: 'Bob',
    age: 30
}, function (err, doc) {
    if (!err) {
        console.log(doc);
    } else {
        console.log(err);
    }
});
*/
//删除数据
/*
User.remove({age:30},function(err,doc){
    console.log(doc);
});
*/
//更新数据
/*
User.update({'user': 'Bob'},{'$set':{age:31}},function(err,doc){
    console.log(doc);
});
*/

// 新建app
const app = express()

app.get('/',function(req,res){
  res.send('<h1>Hello React</h1>')
})

// app.get('/data', function (req, res) {
//   res.json({name:'Bob',age: 30})
// })

//查找数据 findOne查找一条
app.get('/data', function (req, res) {
  User.find({}, function (err, doc) {
    res.json(doc)
  })
})

app.listen(5000,function(){
  console.log('Node App Start at Port 5000')
})
