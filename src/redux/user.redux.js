import axios from 'axios'
import {getRedirectPath} from '../util'

// const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
// const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
// 统一LOGIN_SUCCESS与REGISTER_SUCCESS为AUTH_SUCCESS
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const LOGOUT = 'LOGOUT'
// 用户初始状态
const initState = {
  redirectTo: '',
  // isAuth: '',
  msg: '',
  user: '',
  // pwd: '',
  type: ''
}
// reducer
// Redux 的基础概念: https://hulufei.gitbooks.io/react-tutorial/content/redux-basic.html
export function user(state = initState, action) {
  switch(action.type){
    // LOGIN_SUCCESS , isAuth: true
    case AUTH_SUCCESS:
      return {...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload}
    // case REGISTER_SUCCESS:
    //   return {...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload}
    case LOAD_DATA:
      return {...state, ...action.payload}
    case ERROR_MSG:
      return {...state, isAuth: false, msg: action.msg}
    case LOGOUT:
      return {...initState, redirectTo: '/login'}
    default:
      return state
  }
}

function authSuccess (obj) {
  const {pwd, ...data} = obj
  return {
    type: AUTH_SUCCESS,
    payload: data
  }
}

// function loginSuccess (data) {
//   return {type: LOGIN_SUCCESS, payload: data}
// }

// function registerSuccess (data) {
//   return {type: REGISTER_SUCCESS, payload: data}
// }

function errorMsg (msg) {
  return {msg,type: ERROR_MSG}
}

// 加载数据
export function loadData(userinfo) {
  return {type: LOAD_DATA, payload: userinfo}
}

// 上传数据
export function update(data) {
  return dispatch=> {
    axios.post('/user/update', data)
      .then((res) => {
        if(res.status===200 && res.data.code===0){
          // registerSuccess
          dispatch(authSuccess(res.data.data))
        }else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

// 登录
export function login({user, pwd}) {
  if (!user || !pwd) {
    return errorMsg('用户名密码必须输入')
  }
  return dispatch=>{
    axios.post('/user/login',{user,pwd})
      .then(res=>{
        if(res.status===200&&res.data.code===0){
          // loginSuccess
          dispatch(authSuccess(res.data.data))
        }else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

// 退出登录
export function logoutSubmit() {
  return {type: LOGOUT}
}

// 注册
export function register({user,pwd,repeatpwd,type}){
  if (!user || !pwd || !type) {
    return errorMsg('用户名密码必须输入')
  }
  if (pwd !== repeatpwd) {
    return errorMsg('密码与确认密码不一致')
  }
  return dispatch=>{
    axios.post('/user/register',{user,pwd,type})
      .then(res=>{
        if(res.status===200&&res.data.code===0){
          // registerSuccess
          dispatch(authSuccess({user,pwd,type}))
        }else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}
