//index.js
//获取应用实例
const app = getApp()
const _list = [
  {
    id: 1,
    name: 'name1',
    image: 'http://static.i3.xywy.com/cms/20150719/ed7215299703ac8902fb529ff8ef8db141050.jpg',
    price: 28
  },
  {
    id: 2,
    name: '商品2商品2商品2商品2商品2商品2商品2',
    image: 'http://talkimages.cn/images/medium/20153237/tkf005_2324427.jpg',
    price: 28.8
  },
  {
    id: 3,
    name: '商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3',
    image: 'http://img3.imgtn.bdimg.com/it/u=3051136919,4103618198&fm=26&gp=0.jpg',
    price: 28.8
  },
  {
    id: 4,
    name: 'name4',
    image: 'http://img3.imgtn.bdimg.com/it/u=3051136919,4103618198&fm=26&gp=0.jpg',
    price: 28.8
  },
  {
    id: 5,
    name: 'name5',
    image: 'http://img3.imgtn.bdimg.com/it/u=3051136919,4103618198&fm=26&gp=0.jpg',
    price: 28.8
  }
]
Page({
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    list: [..._list],
    topbarStyle: '',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onReady () {
    // 获取topbar高度
    wx.createSelectorQuery().in(this).select('.topbar').boundingClientRect(rect => {
      const { bottom: top } = rect
      this.observerContentScroll(-top)
    }).exec()
  },
  observerContentScroll (top) {
    this.createIntersectionObserver().disconnect()
    // 设置参考区域减去tobbar高度
    // 收缩参照节点布局区域的边界
    this.createIntersectionObserver().relativeToViewport({ top })
    .observe('.swiper', ({ intersectionRect: { top: intersectionTop } }) => { // 相交区域的上边界坐标
      this.setData({
        topbarStyle: intersectionTop ? '': '#fff'
      })
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
