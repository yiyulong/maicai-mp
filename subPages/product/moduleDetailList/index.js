import { getIndexModuleProductDetail } from '../../../api/product'
import Toast from '@vant/weapp/toast/toast'
const app = getApp()
Page({
  data: {
    _pageNum: 1,
    isNoMore: true,
    list: [],
    _moduleId: null,
    realm: '',
    url: '',
    board: ''
  },
  onLoad (option) {
    const { id } = option
    this.data._moduleId = id
    this._getList()
  },
  onShow () {
    let obj = { ...app.globalData.cartCountObj }
    this.data.list.forEach(item => {
      if (obj[item.id]) {
        item.cartCount = obj[item.id]
      }
    })
    this.setData({
      list: this.data.list
    })
  },
  _getList () {
    getIndexModuleProductDetail({ moduleId: this.data._moduleId, pageNum: this.data._pageNum }, { showLoading: true }).then(({ data }) => {
      // const list = this.data._pageNum === 1 ? data.productList : this.data.list.push(...data.productList)
      const { productList, moduleName, realm, url, board } = data
      this.setData({
        list: productList,
        realm,
        url,
        board
        // isNoMore: data.isLastPage
      })
      wx.setNavigationBarTitle({
        title: moduleName
      })
    }).finally(() => {
      wx.stopPullDownRefresh()
    })
  },
  _addSuccess ({ detail }) {
    Toast.success({
      duration: 1000
    })
    // console.log(detail)
    const targetItemIndex = this.data.list.findIndex(item => item.id === detail.id)
    if ((typeof(targetItemIndex) === 'number') && (targetItemIndex != -1)) {
      const key = `list[${targetItemIndex}].cartCount`
      this.setData({
        [key]: detail.count
      })
    }
  },
  _addError ({ detail }) {
    Toast.fail('添加失败请重试')
    const targetItemIndex = this.data.list.findIndex(item => item.id === detail.id)
    if ((typeof(targetItemIndex) === 'number') && (targetItemIndex != -1)) {
      const key = `list[${targetItemIndex}].cartCount`
      this.setData({
        [key]: detail.count
      })
    }
  },
  // 下拉刷新
  onPullDownRefresh () {
    this.pageNum = 1
    this._getList()
  },
  // 上拉触底事件
  onReachBottom () {
    if (this.data.isNoMore) return
    this.data._pageNum = this.data._pageNum + 1
    this._getList()
  }
})