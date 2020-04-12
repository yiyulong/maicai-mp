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
    const text = cartCount + ''
    wx.setTabBarBadge({
      index: 2,
      text
    })
    if (userInfo.mobile) {
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
    wx.navigateTo({ url: `/pages/order/index?id=${index}` })
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