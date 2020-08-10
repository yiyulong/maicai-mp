Component({
  externalClasses: ['item-class', 'dot-class'],
  properties: {
    time: {
      type: String,
      value: ''
    }
  },
  data: {
    timeData: {}
  },
  methods: {
    /**
     * todo 自定义倒计时样式
     */
    _timeChange ({ detail }) {
      // console.log(detail)
      const timeData = {
        hours: this.formatNumber(detail.hours),
        minutes: this.formatNumber(detail.minutes),
        seconds: this.formatNumber(detail.seconds)
      }
      this.setData({ timeData })
    },
    formatNumber (n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    }
  }
})