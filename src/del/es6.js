// object
const obj = { name: 'Bob', age: '30'}
// console.log(Object.keys(obj))
// console.log(Object.values(obj))
// console.log(Object.entries(obj))
// 解构赋值
const arr = ['hello','react']
let [arg1, arg2] = arr
console.log(arg1, '|', arg2)

const {name,age} = obj
console.log(name, '/', age)
// 类
class myApp {
  constructor () {
    this.name = 'react'
  }
  sayHello () {
    console.log(`hello ${this.name}`)
  }
}
const app = new myApp()
app.sayHello()
