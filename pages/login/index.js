const _userInfo = {
  name: '张三',
  accounts: '15800807767'
}
import { wxCheckSession } from '../../utils/wxCheckLogin'
import { login } from '../../utils/api'
Page({
  data: {
  },
  onLoad () {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel && eventChannel.emit && eventChannel.emit('getLoginInfo', _userInfo)

  },
  _getPhoneNumber ({ detail }) {
    console.log(detail)
    const ok = detail.errMsg === 'getPhoneNumber:ok'
    if (ok) {
      const { encryptedData, iv } = detail
      wxCheckSession().then(token => {
        console.log(token)
        login({ encryptedData, iv }).then(res => {
          console.log(res)
          wx.navigateBack()
        })
      })
    } else {
      wx.showModal({
        title: '授权失败',
        content: '您已拒绝获取微信绑定手机号登录授权，可使用其它手机号验证登录',
        cancelText: '知道了',
        confirmText: '验证登录',
        success (res) {
          if (res.confirm) {
            wx.navigateTo({ url: '/pages/register/index' })
          }
        }
      })
    }
  }
})