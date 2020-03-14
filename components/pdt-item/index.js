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
      console.log(id)
      wx.navigateTo({
        url: `/pages/details/index?id=${id}`
      })
    },
    cartClick ({
      currentTarget: {
        dataset: {
          id
        }
      }
    }) {
      console.log(id)
      this.clearAnimation('.cart', function () {
        console.log('清除动画')
      })
      this.animate('.cart', [
        { opacity: 1, scale: [1, 1] },
        { opacity: 0, scale: [1.5, 1.5] }
      ], 400, () => {
        this.clearAnimation('.cart', function () {
          console.log('清除动画')
        })
      })
    }
  },
})