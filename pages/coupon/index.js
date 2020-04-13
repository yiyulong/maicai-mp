import { getCoupon } from '../../api/common'
Page({
  data: {
    active: 0,
    triggered: false,
    _pageNum: 1,
    list: []
  },
  onLoad (options) {
    console.log(options)
    this._getList()
  },
  _getList () {
    const params = {
      pageNum: this.data._pageNum,
      status: this.data.active
    }
    // 获取对应订单状态的列表，如果需要获取全部订单列表则不传,1待支付 3待收货 4待评价 6售后退款
    getCoupon(params).then(({ data }) => {
      console.log(data)
    }).finally(() => {
      console.log('finally')
    })
  },
  _tabChange ({ currentTarget: { dataset: { index } } }) {
    console.log(index)
    this.setData({ active: index })
  },
  _refresherrefresh () {},
  _scrolltolower () {}
})