import { logOut } from '../../api/user'
import { refreshCount } from '../../api/order'
const app = getApp()
Page({
  data: {
    avatar: '',
    userInfo: {},
    cartCount: null,
    orderStatusCount: [],
    version: ''
  },
  onLoad () {
    const accountInfo = wx.getAccountInfoSync()
    this.setData({
      version: accountInfo.miniProgram.version
    })
  },
  onShow () {
    const { cartCount, orderStatusCount, userInfo } = app.globalData
    if (parseInt(cartCount)) {
      wx.setTabBarBadge({
        index: 2,
        text: cartCount + ''
      })
    } else {
      wx.removeTabBarBadge({
        index: 2
      })
    }
    if (userInfo?.mobile) {
      refreshCount().then(({ data }) => {
        // console.log(res)
        this.setData({
          userInfo: userInfo,
          orderStatusCount: data
        })
      }).catch(err => {
        console.log(err)
      })
    }
    // this.setData({
    //   cartCount, orderStatusCount, userInfo
    // })
    // console.log(this.data)
  },
  onLogin (e) {
    if (this.data.userInfo?.mobile) return
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
  onOrder ({ currentTarget: { dataset: { index } } }) {
    // console.log(index)
    if (app.globalData.userInfo?.mobile) {
      wx.navigateTo({ url: `/pages/order/index?id=${index}` })
    } else {
      wx.navigateTo({ url: '/pages/login/index' })
    }
  },
  _toAddress () {
    if (app.globalData.userInfo?.mobile) {
      wx.navigateTo({ url: '/pages/address/index' })
    } else {
      wx.navigateTo({ url: '/pages/login/index' })
    }
  },
  async onLogout () {
    await logOut()
    wx.clearStorage()
    app.globalData.userInfo = {}
    app.globalData.cartCount = null
    app.globalData.orderStatusCount = []
    this.setData({
      userInfo: {},
      cartCount: null,
      orderStatusCount: []
    })
  }
})