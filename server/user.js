const express = require('express')
const Router = express.Router()
const utils = require('utility')
const model = require('./model')
const User = model.getModel('user')

// 用户列表
Router.get('/list',function(req,res){
  User.find({},function(err,doc) {
    return res.json(doc)
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
    User.create({user,pwd:md5Pwd(pwd),type},function(e,d){
      if(e){
        console.log(e)
        return res.json({code:1,msg:'网络问题'})
      }
      return res.json({code:0})
    })
  })
})

Router.get('/info',function(req,res){
  // 用户有没有cookie
  return res.json({code:1})
})

function md5Pwd(pwd){
  const salt = 'react_job_app_@#$%*()+-~~'
  return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router
