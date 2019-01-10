const mongoose = require('mongoose')

//连接Mongo，并且使用data这个集合
const DB_URL = 'mongodb://admin:abc123@ds039684.mlab.com:39684/job-data'; //mongodb://localhost:27017
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function () {
  console.log('数据库连接成功')
})
