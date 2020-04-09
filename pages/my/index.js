import { logOut } from '../../api/user'
import { refreshCount } from '../../api/order'
const app = getApp()
Page({
  data: {
    avatar: '',
    userInfo: {},
    cartCount: null,
    orderStatusCount: []
  },
  onLoad () {
    if (wx.getStorageSync('token')) {
      refreshCount().then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  onShow () {
    const { cartCount, orderStatusCount, userInfo } = app.globalData
    this.setData({
      cartCount, orderStatusCount, userInfo
    })
  },
  onLogin (e) {
    if (this.data.userInfo && this.data.userInfo.accounts) return
    wx.navigateTo({
      url: '/pages/login/index',
      events: {
        getLoginInfo: (data) => {
          this.setData({
            userInfo: data
          })
        }
      }
    })
  },
  onOrder ({
    currentTarget: {
      dataset: { index }
    }
  }) {
    // console.log(index)
    wx.navigateTo({ url: '/pages/order/index' })
  },
  async onLogout () {
    await logOut()
    wx.clearStorage()
    this.setData({
      userInfo: {}
    })
  }
})