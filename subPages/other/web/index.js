Page({
  data: {
    url: '',
  },
  onLoad (options) {
    // console.log(options)
    const { url } = options
    this.setData({ url })
  }
})