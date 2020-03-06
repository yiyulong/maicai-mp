const _candidateList = [
  {
    label: '候选1',
    value: '1'
  },
  {
    label: '候选2',
    value: '2'
  },
  {
    label: '候选3',
    value: '3'
  },
  {
    label: '候选4',
    value: '4'
  },
  {
    label: '候选5',
    value: '5'
  },
  {
    label: '候选6',
    value: '6'
  },
  {
    label: '候选7',
    value: '7'
  },
  {
    label: '候选8',
    value: '8'
  },
  {
    label: '候选9',
    value: '9'
  },
  {
    label: '候选10',
    value: '10'
  },
  {
    label: '候选11',
    value: '11'
  },
  {
    label: '候选12',
    value: '12'
  },
  {
    label: '候选13',
    value: '13'
  },
  {
    label: '候选14',
    value: '14'
  },
  {
    label: '候选15',
    value: '15'
  }
]
const _historyList = [
  {
    label: '口罩1',
    value: 1
  },
  {
    label: '口罩2',
    value: 2
  },
  {
    label: '口罩3',
    value: 3
  },
  {
    label: '口罩4',
    value: 4
  },
  {
    label: '口罩5',
    value: 5
  },
  {
    label: '口罩6',
    value: 6
  },
  {
    label: '口罩7',
    value: 7
  },
  {
    label: '口罩8',
    value: 8
  },
  {
    label: '口罩9',
    value: 9
  },
  {
    label: '口罩10',
    value: 10
  }
]
const _list = [
  {
    id: 1,
    name: 'name1',
    image: 'http://a3.att.hudong.com/68/61/300000839764127060614318218_950.jpg',
    price: 28
  },
  {
    id: 2,
    name: '商品2商品2商品2商品2商品2商品2商品2',
    image: 'https://camo.githubusercontent.com/728ce9f78c3139e76fa69925ad7cc502e32795d2/68747470733a2f2f7675656a732e6f72672f696d616765732f6c6f676f2e706e67',
    price: 28.8
  },
  {
    id: 3,
    name: '商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3',
    image: 'https://raw.githubusercontent.com/vuejs/vuejs.org/master/themes/vue/source/images/stdlib.png',
    price: 28.8
  },
  {
    id: 4,
    name: 'name4',
    image: 'http://img3.imgtn.bdimg.com/it/u=3051136919,4103618198&fm=26&gp=0.jpg',
    price: 28.8
  },
  {
    id: 5,
    name: 'name5',
    image: 'http://img3.imgtn.bdimg.com/it/u=3051136919,4103618198&fm=26&gp=0.jpg',
    price: 28.8
  }
]
Page({
  data: {
    value: '', // search值
    searched: false, // 是否搜索完成
    candidateList: [],
    historyList: [..._historyList], // 历史搜索
    list: [],
    refresherTriggered: false, // 设置当前下拉刷新状态
  },
  /**
   * TODO 候选词点击事件
   * @param {*} e 
   */
  onItemClick ({
    currentTarget: {
      dataset: { item }
    }
  }) {
    this.setData({
      value: item.label,
      searched: true,
      list: _list
    })
  },
  onSearch (detail) {
    console.log('search', detail)
  },
  onChange ({ detail }) {
    const candidateList = _candidateList.filter(item => item.label.indexOf(detail) !== -1)
    this.setData({
      value: detail,
      candidateList,
      searched: false
    })
  },
  onDelete (e) {},
  scrollRefresh (e) {
    console.log('触发', e)
    setTimeout(() => {
      this.setData({
        refresherTriggered: false
      })
    }, 2000)
  },
  scrollRestore (e) {
    console.log('复位', e)
  },
  scrollAbort (e) {
    console.log('中止', e)
  },
  scrollLower (e) {
    console.log('滚动到底部', e)
  }
})