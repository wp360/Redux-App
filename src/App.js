import React from 'react';
import { Button } from 'antd-mobile';
//import 'antd-mobile/dist/antd-mobile.css';

class App extends React.Component {
  render() {
    let txt = 'React App 开发';
    return (
      <div>
        <h2>{txt}</h2>
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
        <ul>
          {this.state.conts.map(v=><li key={v}>{v}</li>)}
        </ul>
      </div>
    )
  }
}

function Txts(props){
  return <h2>{props.cont}</h2>
}
export default App;