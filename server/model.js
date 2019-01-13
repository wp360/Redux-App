const mongoose = require('mongoose')

//连接Mongo，并且使用data这个集合
const DB_URL = 'mongodb://admin:admin123@ds155864.mlab.com:55864/job-chat'; //mongodb://localhost:27017
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function () {
  console.log('数据库连接成功')
})

const models = {
  user: {
    'user': {'type': String, 'require': true},
    'pwd': {'type': String, 'require': true},
    'type': {'type': String, 'require': true},
    // 头像
    'avatar': {'type': String},
    // 个人简介或职位简介
    'desc': {'type': String},
    // 职位名
    'title': {'type': String},
    // 如果你是boss 还需这两个字段
    'company': {'type': String},
    'money': {'type': String}
  },
  chat: {

  }
}

for(let m in models){
  mongoose.model(m,new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: function(name){
    return mongoose.model(name)
  }
}
