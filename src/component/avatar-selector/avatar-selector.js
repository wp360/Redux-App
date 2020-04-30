import React from 'react'
import { Grid, List } from 'antd-mobile'

class AvatarSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    // 头像列表
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
                        .split(',')
                        .map(v=>({
                          icon: require(`../img/${v}.png`),
                          text: v
                        }))
    // 头像显示
    const gridHeader = this.state.icon
                      ? (<div><span>已选择头像</span><img style={{width: 20}} src={this.state.icon} alt={this.state.text} /></div>)
                      : '请选择头像'
    return (
      <div>
        <List renderHeader={() => gridHeader}>
          <Grid
            data={avatarList}
            columnNum={5}
            onClick={elm=> {
              this.setState(elm)
              this.props.selectAvatar(elm.text)
            }}
          />
        </List>
      </div>
    )
  }
}

export default AvatarSelector
