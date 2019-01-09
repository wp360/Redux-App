import React from 'react'
import {connect} from 'react-redux'
import {addGun, reduceGun, addGunAsync} from './index.redux'
import {Button, List} from 'antd-mobile'
// import 'antd-mobile/dist/antd-mobile.css'
// 建立store
// import {createStore} from 'redux'

@connect(
    //你要state什么属性放到props里
    state => ({
      num: state.counter
    }),
    //你要什么方法，放到props里，自动dispatch
    {addGun, reduceGun, addGunAsync}
)

class App extends React.Component {
  render(){
    const boss = '李云龙'
    // const store = this.props.store
    // const num = store.getState()
    return (
      <div>
        <h2>独立团，团长{boss}</h2>
        <一营 老大='张大喵'></一营>
        <骑兵连 老大='孙德胜'></骑兵连>
        <h3>现在有机枪{this.props.num}把</h3>
        <Button onClick={this.props.addGun}>申请武器</Button>
        <Button onClick={this.props.reduceGun}>上交武器</Button>
        <Button onClick={this.props.addGunAsync}>稍后上缴</Button>
      </div>
    )
  }
}

// 通过reducer建立
// 根据老的state和action生成新的state
// function counter(state=0,action){
//   switch(action.type){
//     case '加机关枪':
//       return state + 1
//     case '减机关枪':
//       return state - 1
//     default:
//       return 10
//   }
// }
// const store = createStore(counter)
// const init = store.getState()
// console.log(init)

// 监听操作
// function listener() {
//   const current = store.getState()
//   console.log(`现在有机枪${current}把`)
// }
// store.subscribe(listener)

// 派发事件 传递action
// store.dispatch({type:'加机关枪'})
// console.log(store.getState())

function 骑兵连(props){
  return <h2>骑兵连连长{props.老大}，冲啊！</h2>
}

class 一营 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      soldiers: ['虎子','柱子','张根生']
    }
    // this.addSoldier = this.addSoldier.bind(this)
    console.log('组件初始化')
  }
  // 生命周期
  // componentWillMount() {
  //   console.log('组件马上要挂载了')
  // }
  // componentDidMount() {
  //   console.log('组件已经挂载')
  // }
  // componentWillReceiveProps(nextProps) {
  //   console.log('组件要接收父组件的值了')
  // }
  // shouldComponentUpdate() {
  //   console.log('判断是不是要更新组件')
  //   return true
  // }
  // componentWillUpdate() {
  //   console.log('马上要更新组件了')
  // }
  // componentDidUpdate() {
  //   console.log('组件更新完毕')
  // }
  // componentWillUnmount() {
  //   console.log('组件挂载了')
  // }
  addSoldier(){
    console.log('欢迎新兵加入')
    this.setState({
      soldiers: [...this.state.soldiers, '新兵菜鸟' + Math.random()]
    })
  }
  render(){
    console.log('组件正在加载')
    return (
      <div>
        <h2>一营营长，{this.props.老大}</h2>
        <Button type="primary" onClick={() => this.addSoldier()}>新兵入伍</Button>
        <List renderHeader={()=>'士兵列表'} className="soldier-list">
          {this.state.soldiers.map(v => <List.Item key={v}>{v}</List.Item>)}
        </List>
      </div>
    )
  }
}

// const mapStatetoProps = (state) => {
//   return {num: state}
// }
// const actionCreators = {addGun, reduceGun, addGunAsync}
// App = connect(mapStatetoProps, actionCreators)(App)
export default App
