Page({
  data: {
    avatar: '',
    userInfo: {}
  },
  onLogin (e) {
    if (this.data.userInfo && this.data.userInfo.name) return
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
    console.log(index)
  },
  onLogout () {
    this.setData({
      userInfo: {}
    })
  }
})