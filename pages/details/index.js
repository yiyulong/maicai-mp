import { getDetail } from '../../utils/api'
Page({
  data: {
    info: {},
    cartAnimationData: {}, // 点击加入购物车动画效果
  },
  onLoad (options) {
    console.log(options)
    const { id: productId } = options
    getDetail({ productId }, { showLoading: true }).then(res => {
      console.log(res)
    })
  },
  onReady () {
    this.animation = wx.createAnimation({
      timingFunction: 'ease' // 动画的效果
    })
  },
  // 加入购物篮
  onAddToCart (e) {
    this.animation.scale(.7).step({
      duration: 200
    })
    this.animation.scale(1.3).step()
    this.animation.scale(1).step()
    this.setData({
      cartAnimationData: this.animation.export()
    })
  },
  // 跳转到购物车
  onToCart (e) {
    wx.switchTab({
      url: '/pages/cart/index'
    })
  }
})