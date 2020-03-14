//index.js
import { getIsCommandProductList } from '../../utils/api'
Page({
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    list: [],
    topbarStyle: '',
    _isLoading: false,
    _isNoMore: false,
    _pageNum: 1,
  },
  onLoad: function () {
    this._getList()
  },
  onReady () {
    // 获取topbar高度
    wx.createSelectorQuery().in(this).select('.topbar').boundingClientRect(rect => {
      const { bottom: top } = rect
      this.observerContentScroll(-top)
    }).exec()
  },
  observerContentScroll (top) {
    this.createIntersectionObserver().disconnect()
    // 设置参考区域减去tobbar高度
    // 收缩参照节点布局区域的边界
    this.createIntersectionObserver().relativeToViewport({ top })
      .observe('.swiper', ({ intersectionRect: { top: intersectionTop } }) => { // 相交区域的上边界坐标
        this.setData({
          topbarStyle: intersectionTop ? '' : '#fff'
        })
      })
  },
  _getList () {
    this.data._isLoading = true
    getIsCommandProductList({ pageNum: this.data._pageNum }).then(({ data }) => {
      const list = this.data._pageNum === 1 ? data.list : this.data.list.push(...data.list)
      this.data._isNoMore = !data.hasNextPage
      this.setData({
        list,
      })
    }).finally(() => {
      this.data._isLoading = false
    })
  },
  // 上拉触底事件
  onReachBottom () {
    if (this.data._isNoMore || this.data._isLoading) return
    this.data._pageNum = this.data._pageNum + 1
    this._getList()
  }
})
