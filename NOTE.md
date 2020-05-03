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
// window.devToolsExtension
import {createStore, applyMiddleware, compose} from 'redux'
const store = createStore(counter, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__?window.__REDUX_DEVTOOLS_EXTENSION__():f=>f
))
```
## 优雅管理
1. 使用react-redux
2. 安装 `npm install react-redux --save`
3. 忘记subscribe，记住reducer，action和dispatch即可
4. react-redux提供Provider和connect两个接口来连接
#### 具体使用
* Provider组件在应用最外层，传入store即可，只用一次
```js
// index.js
import { counter, addGun, reduceGun, addGunAsync } from './index.redux'

function render () {
  ReactDOM.render(<App store={store} addGun={addGun} reduceGun={reduceGun} addGunAsync={addGunAsync} />, document.getElementById('root'));
}
render()
store.subscribe(render)
// 改为
import {Provider} from 'react-redux'
import { counter } from './index.redux'

ReactDOM.render(
  (<Provider store={store}>
    <App />
  </Provider>),
  document.getElementById('root')
)
```
* Connect负责从外部获取组件需要的参数
```js
// App.js (重点调整)
import {connect} from 'react-redux'
import {addGun, reduceGun, addGunAsync} from './index.redux'

// 添加方法
const mapStatetoProps = (state) => {
  return {num: state}
}
const actionCreators = {addGun, reduceGun, addGunAsync}
App = connect(mapStatetoProps, actionCreators)(App)
export default App
```
* Connect可以用装饰器的方式来书写
#### 使用装饰器优化connect代码
* npm run eject 弹出个性化配置
* npm install babel-plugin-transform-decorators-legacy --save-dev插件
> 注意：label7新版 使用npm i @babel/plugin-proposal-decorators --save-dev
```
如果出现：Uncaught Error: Cannot find module 'babel-runtime/helpers/slicedToArray'等错误
解决办法：
1. npm add @babel/runtime
2. npm install
```
* package.json里babel加上plugins配置
```js
//首先，package.json里设置
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
        },
        "transform-decorators-legacy" // 新版用["@babel/plugin-proposal-decorators", { "legacy": true }],
      ]
    ]
//然后，App.js里调整
const mapStatetoProps = (state) =>{
  return {num:state}
}
const actionCreators = {add,reduce,addAsync}
App = connect(mapStatetoProps,actionCreators)(App)
//替换为：
@connect(
    //你要state什么属性放到props里
    state =>({num:state}),
    //你要什么方法，放到props里，自动dispatch
    {add,reduce,addAsync}
)
```
[React-Redux 的用法参考](http://blog.csdn.net/yuanyuanispeak/article/details/78842977)

## Router4
[https://reacttraining.com/react-router/](https://reacttraining.com/react-router/)
`npm install react-router-dom --save`

```js
//index.js
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';
//<App /> 替换为<BrowserRouter>...省略</BrowserRouter>
ReactDOM.render(
    (<Provider store={store}>
        //路由对应渲染模板
        <BrowserRouter>
            <div>
                //点击跳转到指定路由
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/topics">Topics</Link></li>
                </ul>
                <hr />
                // exact 表明完全匹配
                <Route exact path="/" component={App} />
                <Route path="/about" component={About} />
                <Route path="/topics" component={Topics} />
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
)
//添加子页
const About = () => (
    <div>
        <h2>About</h2>
    </div>
)

const Topics = () => (
    <div>
        <h2>Topics</h2>
    </div>
)
```
* url参数，Route组件参数可以用冒号标识参数
* Redirect组件 跳转
* Switch只渲染一个Route组件

## 路由和Redux配合-复杂 Redux应用
1. 登录
2. 没有登录信息 统一跳转login
3. 页面 导航+显示+注销

## 前后端联调
> 使用axios发送异步请求
* 如何发送，端口不一致，使用proxy配置转发
* axios拦截器，统一loading处理
* redux里使用异步数据，渲染页面

## Axios使用
1. 安装依赖 `npm install axios --save`
2. 添加配置 proxy
```js
// package.json
// ... 省略
  "proxy":"http://localhost:5000"
}
```
## Axios拦截器
```js
// 拦截请求
axios.interceptors.request.use(function(config){
  Toast.loading('加载中',0)
  return config
})

// 拦截响应
axios.interceptors.response.use(function (config) {
  setTimeout(()=> {
    Toast.hide()
  }, 2000)
  return config
})
```

## 开发模式
1. 基于cookie用户验证
* express依赖cookie-parser，需要npm install cookie-parser --save安装
* cookie类似于一张身份卡，登录后服务器端返回，你带着cookie就可以访问受限资源
* 页面cookie的管理浏览器会自动处理

## body-parser
`npm i body-parser --save`
> body-parser是非常常用的一个express中间件，作用是对post请求的请求体进行解析。

## MD5加密第三方库utility
`npm install utility --save`

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
## 备注
1. React 版本，默认15，手动更新为16（现在默认16了）
`npm install --save react@next react-dom@next`
2. 代码参考
[https://github.com/fangfeiyue/React-Redux-Recruitment-software](https://github.com/fangfeiyue/React-Redux-Recruitment-software)
3. 报错已经引入了react-redux，使用Provider的时候却报错unexpected token
> 解决：.babelrc添加presets，安装依赖
`npm install --save-dev babel-preset-react`
`npm install --save-dev babel-preset-es2015 babel-preset-react`
```js
  "presets": [
    "react",
    "es2015"
  ],
```
> 依然报错，Module build failed: Error: Cannot find module 'babel-helper-builder-react-jsx'
`npm install babel-helper-builder-react-jsx --save-dev`
```js
// ../src/redux/Auth.js
    switch(action.type){
        case Login:
            return {...state, isAuth: true }
        case Logout:
            return {...state, isAuth: false }
        default:
            return state
    }
    // 去掉...
    switch(action.type){
        case Login:
            return {state, isAuth: true }
        case Logout:
            return {state, isAuth: false }
        default:
            return state
    }
```
