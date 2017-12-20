import React from 'react';
import { Button,List } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';

class App extends React.Component {
  render() {
    const txt = 'React App 开发';
    //Redux store来存放应用的状态
    const store = this.props.store;
    //初始状态
    const num = store.getState();
    //组件内部获取
    const add = this.props.add;
    const reduce = this.props.reduce;
    const addAsync = this.props.addAsync;
    return (
      <div>
        <h1>现在有项目数量{num}个</h1>
        <Button type='primary' inline size="small" onClick={() => store.dispatch(add())}> 项目值上升 </Button>
        <Button type='primary' inline size="small" onClick={() => store.dispatch(reduce())}> 项目值下降 </Button>
        <Button type='primary' inline size="small" onClick={() => store.dispatch(addAsync())}> 异步处理 </Button>
        <h2>项目 — {txt} </h2>
        <TxtCont cont='Redux'></TxtCont>
        <Txts cont='Router'></Txts>
      </div>
    )
  }
}

class TxtCont extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      conts: ['webpack','babel','jsx']
    }
    // 方法一： this绑定
    //this.addCont = this.addCont.bind(this);
  }
  //生命周期
  componentWillMount(){
    console.log('组件马上就要加载了')
  }
  componentDidMount() {
    console.log('组件加载完毕')
  }
  // 方法三：addCont = ()=>{ ...代码 }
  addCont(){
    console.log('项目已添加');
    this.setState({
      conts:[...this.state.conts,'项目' + Math.random()]
    })
  }
  render(){
    console.log('组件加载中...')
    return (
      <div>
        <h2>{this.props.cont}</h2>
        <p>方法二：onClick里使用箭头函数 () => this.addCont()</p>
        <Button type='primary' onClick={()=>this.addCont()}>添加项目</Button>
        <List renderHeader={() => '项目列表'} className="my-list">
          {this.state.conts.map(v =>{
            return (<List.Item key={v}>{v}</List.Item>)
          })}
        </List>
      </div>
    )
  }
}

function Txts(props){
  return <h2>{props.cont}</h2>
}
export default App;