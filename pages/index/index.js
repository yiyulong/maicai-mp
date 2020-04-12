import { getBanner, getHomeCategoryList } from '../../api/common'
import { getIsCommandProductList } from '../../api/product'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
const app = getApp()
Page({
  data: {
    bannerList: [], // 顶部轮播图
    category: [], // 分类
    list: [],
    topbarStyle: '',
    isNoMore: false,
    _pageNum: 1,
  },
  async onLoad () {
    // 获取轮播图 分类 推荐商品
    const [{ data: { list } }, { data }] = await Promise.all([getBanner(), getHomeCategoryList(), this._getList()])
    this.setData({
      bannerList: list,
      category: data
    })
  },
  onReady () {
    // 获取topbar高度
    wx.createSelectorQuery().in(this).select('.topbar').boundingClientRect(rect => {
      const { bottom: top } = rect
      this.observerContentScroll(-top)
    }).exec()
  },
  onShow () {
    if (!parseInt(app.globalData.cartCount)) return
    const text = app.globalData.cartCount + ''
    wx.setTabBarBadge({
      index: 2,
      text
    })
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
        list,
        isNoMore: data.isLastPage
      })
    }).finally(() => {
      wx.stopPullDownRefresh()
    })
  },
  _switchClassify ({ currentTarget: { dataset: { id } } }) {
    // console.log(id)
    app.globalData.switchClassifyId = id
    wx.switchTab({
      url: '/pages/classify/index'
    })
  },
  // 上拉触底事件
  onReachBottom () {
    if (this.data.isNoMore) return
    this.data._pageNum = this.data._pageNum + 1
    this._getList()
  },
  _addSuccess () {
    if (!parseInt(app.globalData.cartCount)) return
    const text = app.globalData.cartCount + ''
    wx.setTabBarBadge({
      index: 2,
      text
    })
    Toast.success('已加入购物车')
  },
  _addError () {
    Toast.fail('添加失败请重试')
  },
  // 下拉刷新
  onPullDownRefresh () {
    this.pageNum = 1
    this._getList()
  }
})
