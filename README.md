## 操作步骤
## 【第一篇 Express】
1. `npm init -y`
2. `git init`
3. `npm install --save-dev babel-cli`
4. `npm install --save express`
5. package.json添加
```javascript
  "scripts": {
    "server":"babel-node server/index.js",  // <=添加部分
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
6. 生成文件夹server，新建文件index.js
```javascript
import express from 'express';

let app = express();

app.get('/*',(req,res)=>{
    res.send('hello world');
});

app.listen(3000,()=>console.log('Running on lacalhost:3000'));
```
7. 生成.babelrc
```javascript
{
    "presets":["es2015"]
}
```
8. `npm install --save-dev babel-preset-es2015`
9. `npm run server`
10. sendFile
```javascript
  res.sendFile(path.join(__dirname,'./index.html'));
  import path from 'path';
```
> server文件夹下生成index.html
11. `npm install --save-dev nodemon`
12. package.json 修改
```javascript
  "scripts": {
    "server": "babel-node server/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

  "server": "babel-node server/index.js",
  "server": "nodemon --watch server --exec babel-node -- server/index.js",
```
## 【附录 git上传代码到github】
```javascript
git status
git add.
git commit -m "add file"
git push
此时，会出现Username及Password的输入确认
完成后，到对应github的项目下确认，发现代码已经上传
```
### 注：.gitignore里设置不上传node_modules 
1. 直接 node_modules/
2. 或者
```
.DS_store
node_modules
```
[参考链接](http://www.cnblogs.com/dzxw2371/p/6141319.html)

## 【第二篇 React】
1. `npm install --save react react-dom`
```javascript
修改.babelrc
{
    "presets":["es2015","react"]
}
添加react
```
2. 生成webpack.config.dev
3. `npm install --save-dev webpack webpack-dev-middleware`
4. `npm install --save-dev babel-loader`
5. `npm install --save-dev babel-preset-react`

## 重要：
`webpack安装不要最新版3.0的，否则报错。可以安装1.x版，这样就OK了。`
`npm install --save-dev webpack@1`
