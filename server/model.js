const mongoose = require('mongoose')

//连接Mongo，并且使用data这个集合
const DB_URL = 'mongodb://admin:admin123@ds155864.mlab.com:55864/job-chat'; //mongodb://localhost:27017
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function () {
  console.log('数据库连接成功')
})

const models = {
  user: {
    'user':{type:String,require:true},
    'pwd':{type:String,require:true},
    'type':{type:String,require:true},
    'avatar':{type:String},
    'desc':{type:String},
    'title':{type:String},
    'company':{type:String},
    'money':{type:String}
  },
  chat: {
    'from':{type:String,require:true},
    'to':{type:String,require:true},
    'content':{type:String,require:true,default:''},
    'create_time':{type:Number,default: new Date().getTime(),require:true},
    'read':{type:Boolean,default:false},
    'chatid':{type:String,require:true}
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
