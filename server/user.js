const express = require('express')
const Router = express.Router()
const utils = require('utility')
const model = require('./model')
const User = model.getModel('user')
// 引入聊天数据模型
const Chat = model.getModel('chat')
// 过滤查询条件
const _filter = {'pwd':0, '__v':0}

// 清空聊天数据
// Chat.remove({}, function(e, d) {

// })

// 用户列表
Router.get('/list',function(req,res) {
  const {type} = req.query
  // 清空用户信息
  // User.remove({}, function(e,d){})
  User.find({type},_filter,function(err,doc) {
    if(err) {
      res.end('服务端出错')
      return
    }
    return res.json({code: 0, data: doc})
  })
})

// 消息阅读数
Router.post('/readmsg', function (req, res) {
  const userid = req.cookies.userid
  const {from} = req.body
  // console.log(userid, from)
  // update
  Chat.updateMany(
    {from, to: userid},
    {'$set': {read: true}},
    {'multi': true},
    function(err,doc) {
    // console.log(doc)
    if (!err) {
      return res.json({code: 0, num: doc.nModified})
    } else {
      return res.json({code: 1, msg: '修改失败'})
    }
  })
})

// 用户信息上传
Router.post('/update', function(req, res) {
  const userid = req.cookies.userid
  if(!userid) {
    // 将对象转换为 JSON 字符串
    // return json.dumps({code: 1})
    return res.json({
      code: 1
    })
  }
  const body = req.body
  User.findByIdAndUpdate(userid,body,function(err,doc) {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body)
    return res.json({code: 0, data})
  })
})

// 获取聊天列表
Router.get('/getmsglist', function (req, res) {
  const userid = req.cookies.userid
  // 查询用户信息
  User.find({}, function(e, userdoc) {
    let users = {}

    userdoc.forEach(v=> {
      users[v._id] = {name: v.user, avatar: v.avatar}
    })

    Chat.find({'$or':[{from:userid}, {to:userid}]}, function(err, doc) {
      if(!err){
        return res.json({code:0, msgs: doc, users: users})
      }
    })
  })
  // {'$or':[{from:user, to:user}]}
  // Chat.find({}, function(err, doc) {
  //   if(!err){
  //     return res.json({code:0, msg: doc})
  //   }
  // })
})

// 用户登录
Router.post('/login', function(req, res){
  // console.log(req.body)
  const {user,pwd} = req.body
  // {'pwd': 0} 密码前端不显示
  User.findOne({user, pwd: md5Pwd(pwd)},_filter,function(err,doc){
    if(!doc){
      return res.json({code:1, msg: '用户名不存在或者密码错误'})
    }
    res.cookie('userid', doc.id)
    return res.json({code:0, data: doc})
  })
})

// 用户注册
Router.post('/register',function(req,res){
  console.log(req.body)
  const {user,pwd,type} = req.body
  User.findOne({user},function(err,doc){
    if(doc){
      return res.json({code:1,msg:'用户名重复'})
    }

    User.create({user,pwd:md5Pwd(pwd),type},(err,doc)=>{
        if(err){
            return res.json({
              code: 1,
              msg: "网络问题"
            })
        }
        console.log(doc)
        const _id = doc._id
        res.cookie('userid',_id)
        return res.json({code:0,data:{user,type,_id}})
    })

    // const userModel = new User({user,type,pwd:md5Pwd(pwd)})
    // userModel.save(function(e,d) {
    //   if(e) {
    //     return res.json({
    //       code: 1,
    //       msg: '网络问题'
    //     })
    //   }
    //   const {user,type,_id} = d
    //   res.cookie('userid',_id)
    //   return res.json({code:0,data:{user,type,_id}})
    // })
    // User.create({user,pwd:md5Pwd(pwd),type},function(e,d){
    //   if(e){
    //     console.log(e)
    //     return res.json({code:1,msg:'网络问题'})
    //   }
    //   return res.json({code:0})
    // })
  })
})

//查找用户
Router.get('/info',function(req,res){
  // 用户有没有cookie
  const {userid} = req.cookies
  if(!userid) {
    return res.json({code:1})
  }
  User.findOne({_id:userid}, _filter, function(err,doc) {
    if(err) {
      return res.json({code: 1, msg: '服务出错'})
    }
    if(doc) {
      return res.json({code: 0, data: doc})
    }
  })
})

function md5Pwd(pwd){
  const salt = 'react_job_app_@#$%*()+-~~'
  return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router
