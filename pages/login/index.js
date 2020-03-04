const _userInfo = {
  name: '张三',
  accounts: '15800807767'
}
Page({
  data: {
  },
  onLoad () {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel && eventChannel.emit && eventChannel.emit('getLoginInfo', _userInfo)
  }
})