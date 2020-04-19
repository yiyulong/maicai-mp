import { getSaleProductList } from '../../api/product'
Page({
  data: {
    _pageNum: 1,
    _pageSize: 30,
    isNoMore: false, // 没有更多数据
    list: [],
    refresherTriggered: false, // 设置当前下拉刷新状态
  },
  onLoad () {
    this._getList()
  },
  _getList () {
    const params = {
      pageNum: this.data._pageNum,
      pageSize: this.data._pageSize
    }
    getSaleProductList(params, { showLoading: true }).then(({ data }) => {
      if (data) {
        const list = this.data._pageNum === 1 ? data.list : this.data.list.push(...data.list)
        this.setData({
          list,
          isNoMore: data.isLastPage
        })
      } else {
        this.setData({
          list: [],
          isNoMore: true
        })
      }
    }).finally(() => {
      this.setData({
        refresherTriggered: false
      })
    })
  },
  scrollRefresh (e) {
    // console.log('触发', e)
    this.data._pageNum = 1
    this._getList()
  },
  // scrollRestore (e) {
  //   console.log('复位', e)
  // },
  // scrollAbort (e) {
  //   console.log('中止', e)
  // },
  scrollLower (e) {
    // console.log('滚动到底部', e, this.data.isNoMore)
    if (this.data.isNoMore) return
    this.data._pageNum = this.data._pageNum + 1
    this._getList()
  }
})