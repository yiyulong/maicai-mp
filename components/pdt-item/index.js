import { addOrUpdate } from '../../api/cart'
const app = getApp()
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    info: Object
  },
  methods: {
    itemClick ({
      currentTarget: {
        dataset: {
          id
        }
      }
    }) {
      // console.log(id)
      wx.navigateTo({
        url: `/subPages/product/details/index?id=${id}`
      })
    },
    async cartClick ({ currentTarget: { dataset: { id } } }) {
      // console.log('addcart', id)
      if (!app.globalData.userInfo?.mobile) {
        wx.navigateTo({ url: '/pages/login/index' })
        return
      }
      const params = {
        count: 1,
        productId: id
      }
      try {
        await addOrUpdate(params, { showLoading: true })
        const cartCount = parseInt(app.globalData.cartCount) + 1
        app.globalData.cartCount = cartCount
        this.triggerEvent('addSuccess', {}, { bubbles: true, composed: true })
      } catch (err) {
        console.log(err)
        this.triggerEvent('addError', {}, { bubbles: true, composed: true })
      }
      // this.clearAnimation('.cart', function () {
      //   console.log('清除动画')
      // })
      // this.animate('.cart', [
      //   { opacity: 1, scale: [1, 1] },
      //   { opacity: 0, scale: [1.5, 1.5] }
      // ], 400, () => {
      //   this.clearAnimation('.cart', function () {
      //     console.log('清除动画')
      //   })
      // })
    }
  },
})