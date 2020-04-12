const _list = [
  {
    img: 'http://jzfile.zk71.com/File/CorpProductImages/2013/04/22/0_lsyveg_7191_20130422173831.JPG',
    name: '小青菜',
    amt: 6.41,
    qty: 1,
    id: 0
  },
  {
    img: 'https://camo.githubusercontent.com/728ce9f78c3139e76fa69925ad7cc502e32795d2/68747470733a2f2f7675656a732e6f72672f696d616765732f6c6f676f2e706e67',
    name: '大白菜',
    amt: 20.32,
    qty: 8,
    id: 1
  },
  {
    img: 'http://jzfile.zk71.com/File/CorpProductImages/2013/04/22/0_lsyveg_7191_20130422173831.JPG',
    name: '鸡蛋鸡蛋鸡蛋鸡蛋鸡蛋鸡翅鸡蛋鸡蛋鸡蛋鸡蛋鸡蛋鸡蛋鸡蛋鸡蛋鸡蛋鸡蛋鸡蛋鸡蛋鸡蛋',
    amt: 9.99,
    qty: 4,
    id: 2
  },
  {
    img: 'http://jzfile.zk71.com/File/CorpProductImages/2013/04/22/0_lsyveg_7191_20130422173831.JPG',
    name: '小青菜',
    amt: 9.99,
    qty: 1,
    id: 3
  },
  {
    img: 'https://camo.githubusercontent.com/728ce9f78c3139e76fa69925ad7cc502e32795d2/68747470733a2f2f7675656a732e6f72672f696d616765732f6c6f676f2e706e67',
    name: '大白菜',
    amt: 20.8,
    qty: 8,
    id: 5
  },
  {
    img: 'http://jzfile.zk71.com/File/CorpProductImages/2013/04/22/0_lsyveg_7191_20130422173831.JPG',
    name: '鸡蛋鸡蛋鸡蛋鸡蛋鸡蛋鸡翅鸡蛋鸡蛋鸡蛋鸡蛋鸡蛋鸡蛋鸡蛋鸡蛋鸡蛋鸡蛋鸡蛋鸡蛋鸡蛋',
    amt: 9.99,
    qty: 4,
    id: 6
  }
]
import { getCartList } from '../../api/cart'
Page({
  data: {
    error: '', // 错误提示
    list: [],
    checkedAll: true,
    isCheckedAll: true,
    totalPrice: 0.00,
    checkedList: []
  },
  onShow () {
    this._getList()
  },
  _getList () {
    getCartList().then(({ data }) => {
      this.setData({
        list: data.cartProductVoList,
        totalPrice: data.carTotalPrice
      })
    }).finally (() => {
      this.setData({
        checkedAll: true,
        isCheckedAll: true,
      })
      wx.stopPullDownRefresh()
    })
  },
  onCheckAll ({ detail }) {
    // console.log('checkAll event', detail)
    this.setData({ checkedAll: !(this.data.checkedAll && this.data.isCheckedAll) })
  },
  getCalc ({ detail }) {
    // console.log('getCalc', detail)
    const { sum, num, isCheckedAll, checkedList } = detail
    app.globalData.cartCount = num
    const text = num + ''
    wx.setTabBarBadge({
      index: 2,
      text
    })
    this.setData({
      isCheckedAll: isCheckedAll,
      totalPrice: sum,
      checkedList: checkedList
    })
  },
  onSubmit (e) {
    let paramsData = []
    if (this.data.checkedList.length) {
      paramsData = this.data.checkedList.map(item => {
        return {
          id: item.id,
          qty: item.qty
        }
      })
    } else if (this.data.checkedAll || this.data.isCheckedAll) {
      paramsData = this.data.list.map(item => {
        return {
          id: item.id,
          qty: item.qty
        }
      })
    } else {
      this.setData({
        error: '请至少选择一件商品'
      })
    }
    if (!paramsData.length) return
    // console.log(e, paramsData)
    wx.navigateTo({
      url: '/pages/reviewOrder/index'
    })
  },
  onPullDownRefresh (e) {
    this._getList()
  }
})