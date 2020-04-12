Page({
  data: {
    active: 0
  },
  onLoad (options) {
    console.log(options)
    const { id } = options
    this.setData({ active: parseInt(id) })
  },
  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none'
    });
  }
})