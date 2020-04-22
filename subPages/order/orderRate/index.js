Page({
  data: {
    orderno: '',
    list: []
  },
  onLoad (options) {
    const { orderno } = options
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('orderItemVoListFromOrderRate', (list) => {
      // console.log(list)
      this.setData({ orderno, list })
    })
  }
})