## 操作步骤
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