import Toast from '@vant/weapp/toast/toast'
import { getFlashSaleList } from '../../../api/product'
import { timeData, isBetween, getCurrentTime, isBefore, isAfter } from '../../../utils/countTime'
const app = getApp()
Page({
  data: {
    _pageNum: 1,
    _pageSize: 30,
    isNoMore: true, // 没有更多数据
    resultList: [],
    refresherTriggered: false, // 设置当前下拉刷新状态
    tabs: [],
    activeTab: 0
  },
  onLoad () {
    this._getList()
  },
  onShow () {
    // for (let key in app.globalData.cartCountObj) {
    //   const id = parseInt(key)
    //   const index = this.data.list.findIndex(item => item.id === id)
    //   if (typeof(index) === 'number' && index != -1) {
    //     this.setData({
    //       [`list[${index}].cartCount`]: app.globalData.cartCountObj[key]
    //     })
    //   }
    // }
    let obj = { ...app.globalData.cartCountObj }
    this.data.resultList.forEach(res => {
      res.list.forEach(item => {
        if (obj[item.id]) {
          item.cartCount = obj[item.id]
        }
      })
    })
    this.setData({
      resultList: this.data.resultList
    })
  },

  onTabclick (e) {
    const index = e.detail.index
    this.setData({
      activeTab: index
    })
  },
  onChange (e) {
    const index = e.detail.index
    const { startTime, endTime } = this.data.resultList[index]
    const { duration } = timeData(startTime, endTime)
    const state = this.getState(startTime, endTime)
    this.setData({
      [`tabs[${index}].duration`]: duration,
      [`tabs[${index}].state`]: state,
      activeTab: index
    })
  },

  _getList () {
    const params = {
      pageNum: this.data._pageNum,
      pageSize: this.data._pageSize
    }
    getFlashSaleList(params, { showLoading: true }).then(({ data }) => {
      const tabs = data.map((item) => {
        const { startTime, endTime } = item
        const { duration, calendar } = timeData(startTime, endTime)
        return {
          duration,
          calendar,
          state: this.getState(startTime, endTime)
        }
      })
      this.setData({
        tabs,
        resultList: data
      })
    }).finally(() => {
      this.setData({
        refresherTriggered: false
      })
    })
  },
  getState (start, end) {
    let state = ''
    const currentTime = getCurrentTime()
    if (isBetween(currentTime, start, end)) {
      state = '抢购中'
    } else if (isBefore(currentTime, start)) {
      state = '即将开始'
    } else if (isAfter(currentTime, end)) {
      state = '抢购结束'
    }
    return state
  },
  _addSuccess ({ detail }) {
    Toast.success({
      duration: 1000
    })
    // console.log(detail)
    const targetItemIndex = this.data.resultList[this.data.activeTab].list.findIndex(item => item.id === detail.id)
    if ((typeof(targetItemIndex) === 'number') && (targetItemIndex != -1)) {
      const key = `resultList[${this.data.activeTab}].list[${targetItemIndex}].cartCount`
      this.setData({
        [key]: detail.count
      })
    }
  },
  _addError ({ detail }) {
    // Toast.fail('添加失败请重试')
    const targetItemIndex = this.data.resultList[this.data.activeTab].list.findIndex(item => item.id === detail.id)
    if ((typeof(targetItemIndex) === 'number') && (targetItemIndex != -1)) {
      const key = `resultList[${this.data.activeTab}].list[${targetItemIndex}].cartCount`
      this.setData({
        [key]: detail.count
      })
    }
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