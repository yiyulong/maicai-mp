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

    wxLogin()
  },
  globalData: {
    userInfo: null,
    orderStatusCount: [],
    cartCount: null
  }
})