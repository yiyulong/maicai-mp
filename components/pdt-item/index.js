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
    }
  },
})