import { getDetail } from '../../api/product'
import { addOrUpdate } from '../../api/cart'
const app = getApp()
Page({
  data: {
    info: {},
    detail: {},
    _productId: null,
    cartAnimationData: {}, // 点击加入购物车动画效果
    cartCount: 0 // 当前购物车数量
  },
  onLoad (options) {
    // console.log(options)
    // console.log(app.globalData)
    const { id: productId } = options
    getDetail({ productId }, { showLoading: true }).then(({ data }) => {
      // console.log(data)
      this.setData({
        detail: data,
        _productId: productId,
        cartCount: app.globalData.cartCount
      })
    })
  },
  onReady () {
    this.animation = wx.createAnimation({
      timingFunction: 'ease' // 动画的效果
    })
  },
  // 加入购物篮
  async onAddToCart (e) {
    const params = {
      count: 1,
      productId: this.data._productId
    }
    try {
      await addOrUpdate(params, { showLoading: true })
      const cartCount = parseInt(app.globalData.cartCount) + 1
      app.globalData.cartCount = cartCount
      this.setData({
        cartCount
      })
      this.animation.scale(.7).step({
        duration: 200
      })
      this.animation.scale(1.3).step()
      this.animation.scale(1).step()
      this.setData({
        cartAnimationData: this.animation.export()
      })
    } catch (err) {
      console.log(err)
    }
  },
  // 跳转到购物车
  onToCart (e) {
    wx.switchTab({
      url: '/pages/cart/index'
    })
  }
})