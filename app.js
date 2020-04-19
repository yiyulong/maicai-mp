import { updateManager } from './utils/updateManager'
import { wxLogin } from './utils/wxCheckLogin'
//app.js
App({
  onLaunch: function () {
    // 版本更新
    updateManager()
    // // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    wxLogin().then(res => {
      this.globalData.userInfo = {
        mobile: res.mobile
      }
      this.globalData.cartCount = res.cartCount
      if (parseInt(res.cartCount)) {
        wx.setTabBarBadge({
          index: 2,
          text: res.cartCount + ''
        })
      } else {
        wx.removeTabBarBadge({
          index: 2
        })
      }
    })
    // console.log(this)
  },
  globalData: {
    canGet: null, // 是否是新人 true: 新人可以领优惠券
    userInfo: null,
    cartCount: 0, // 购物车商品数量
    switchClassifyId: null, // 首页分类跳转到分类tab id
    payParams: { // 订单支付状态判断
      status: null,
      orderNo: ''
    }
  }
})