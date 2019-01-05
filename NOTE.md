## 初始项目
```js
npm install -g create-react-app //（全局安装）
create-react-app my-app //（项目名称）

cd my-app //（项目文件夹）
npm start //（启动项目）
```
## 安装依赖
`npm install redux express --save`
## Express
> 新建server文件夹，放置后台服务文件server.js;然后，cd server > nodemon server.js
## Mongodb
`npm install mongoose --save`
### mongodb的使用
1. 安装
2. 开启 mongo，项目文件夹下新建 mkdir mongodata（数据文件夹）；
3. 命令行下运行 MongoDB 服务器
> 为了从命令提示符下运行 MongoDB 服务器，你必须从 MongoDB 目录的 bin 目录中执行 mongod.exe 文件。K:\MongoDB\mongodb\bin\mongod --dbpath E:\node\React\job\server\mongodata
[MongoDB安装使用参考](http://www.runoob.com/mongodb/mongodb-window-install.html)
4. 增删改查
```js
//更新数据
//{'user': 'Bob'} 过滤的数据  // $set 修改的数据 {'$set':{age:31}}
User.update({'user': 'Bob'},{'$set':{age:31}},function(err,doc){
    console.log(doc);
});
// 查找数据 第一个参数，查找筛选的参数
//find {} 全部查找，findOne 查找一个数据 {user:'Bob'}
app.get('/data',function(req,res){
    User.findOne({user:'Bob'},function(err,doc){
        res.json(doc);
    });
});
```
## React 基础
1. import React
2. class 语法新建组件，render里直接使用

## Antd-mobile 组件库
`npm install antd-mobile@next --save` 安装最新版
1. 引入组件
```js
//使用:
import {Button} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';

<Button>...省略</Button>
```
2. 按需加载
`npm install babel-plugin-import --save-dev`
```js
//注：在使用.babelrc前，先运行 npm run eject
// package.json babel部分添加plugins
  "babel":{
    "presets" : [
      "react-app"
    ],
    "plugins": [
      [
        "import",
        {
          "libraryName": "antd-mobile",
          "style": "css"
        }
      ] // `style: true` 会加载 less 文件
    ]
```
> 然后，可以删除 import 'antd-mobile/dist/antd-mobile.css';
[官网：https://mobile.ant.design/index-cn](https://mobile.ant.design/index-cn)

3. List列表优化
```js
  <ul>
    {this.state.conts.map(v=><li key={v}>{v}</li>)}
  </ul>
```
## Redux基础
```js
//index.js >>
//新建store
import { createStore } from 'redux';
//通过reducer建立
//根据老的state和action 生成新的state
function counter(state = 0, action){
    switch(action.type){
        case 'add':
            return state + 1
        case 'reduce':
            return state - 1
        default:
            return 10
    }
}

const store = createStore(counter);
const init = store.getState();
console.log(init);

//监听
function listener(){
    const current = store.getState();
    console.log(`现在的数量是${current}`);
}
//订阅
store.subscribe(listener);
//派发事件 传递action
store.dispatch({type:'add'});
console.log(store.getState());
store.dispatch({type:'reduce'});
console.log(store.getState());
//React-Redux 提供Provider组件，可以让容器组件拿到state
```

## 处理异步、调试工具、更优雅的和React结合
* Redux处理异步，需要redux-thunk插件
  * npm install redux-thunk --save
  * 使用applyMiddleware开启thunk中间件
  * action可以返回函数，使用dispatch提交action
```js
// index.js
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { counter, addGun, reduceGun } from './index.redux'

const store = createStore(counter, applyMiddleware(thunk))
// 添加异步方法
```
* npm install redux-devtools-extension并且开启
* 使用react-redux优雅的链接react和redux

## 调试工具
* Chrome搜索redux安装
* 新建store的时候判断window.devToolsExtension
* 使用compose结合thunk和window.devToolsExtension
* 调试窗的redux选项卡，实时看到state
```js
// index.js
import {createStore, applyMiddleware, compose} from 'redux'
const store = createStore(counter, compose(
  applyMiddleware(thunk),
  window.devToolsExtension?window.devToolsExtension():f=>f
))
```
## git 远程分支上传
```
git remote add origin https://github.com/wp360/Redux-App.git

git checkout -b jobs-chat

git status

git add .

git commit -m "add file"

git push

git push --set-upstream origin jobs-chat
```
