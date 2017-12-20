// 合并所有reducer并且返回
import { combineReducers } from 'redux';
import { counter } from './redux/index';
import { auth } from './redux/Auth';

export default combineReducers({ counter, auth });