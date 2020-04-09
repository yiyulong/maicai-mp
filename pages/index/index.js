import { getBanner } from '../../api/common'
import { getIsCommandProductList } from '../../api/product'
Page({
  data: {
    bannerList: [], // 顶部轮播图
    list: [],
    topbarStyle: '',
    isNoMore: false,
    _pageNum: 1,
  },
  async onLoad () {
    const [{ data: { list } }] = await Promise.all([getBanner(), this._getList()])
    this.setData({
      bannerList: list
    })
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
    getIsCommandProductList({ pageNum: this.data._pageNum }, { showLoading: true }).then(({ data }) => {
      const list = this.data._pageNum === 1 ? data.list : this.data.list.push(...data.list)
      this.setData({
        isNoMore: data.isLastPage
      })
      this.setData({
        list,
      })
    }).finally(() => {
      wx.stopPullDownRefresh()
    })
  },
  // 上拉触底事件
  onReachBottom () {
    if (this.data.isNoMore) return
    this.data._pageNum = this.data._pageNum + 1
    this._getList()
  },
  // 下拉刷新
  onPullDownRefresh () {
    this.pageNum = 1
    this._getList()
  }
})
