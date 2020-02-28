const _userInfo = {
  name: '张三',
  accounts: '15800807767'
}
Page({
  onLoad () {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('getLoginInfo', _userInfo)
  }
})