// 工具函数
export function getRedirectPath({type,avatar}){
  // 根据用户信息 返回跳转地址
  // user.type /boss /genius
  // user.avatar /bossinfo /geniusinfo
  let url = (type==='boss')?'/boss':'/genius'
  if(!avatar){
    url += 'info'
  }
  return url
}

// userId 用户id, targetId 聊天id
export function getChatId(userId, targetId) {
  return [userId, targetId].sort().join('_')
}
