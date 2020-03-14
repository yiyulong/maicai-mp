const _list = [
  {
    id: 1,
    name: 'name1',
    image: 'http://static.i3.xywy.com/cms/20150719/ed7215299703ac8902fb529ff8ef8db141050.jpg',
    price: 28,
    qty: 0
  },
  {
    id: 2,
    name: '商品2商品2商品2商品2商品2商品2商品2',
    image: 'http://talkimages.cn/images/medium/20153237/tkf005_2324427.jpg',
    price: 28.8,
    qty: 99
  },
  {
    id: 3,
    name: '商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3',
    image: 'http://img3.imgtn.bdimg.com/it/u=3051136919,4103618198&fm=26&gp=0.jpg',
    price: 28.8,
    qty: 0
  },
  {
    id: 4,
    name: 'name4',
    image: 'http://img3.imgtn.bdimg.com/it/u=3051136919,4103618198&fm=26&gp=0.jpg',
    price: 28.8,
    qty: 1
  },
  {
    id: 5,
    name: 'name5',
    image: 'http://img3.imgtn.bdimg.com/it/u=3051136919,4103618198&fm=26&gp=0.jpg',
    price: 28.8,
    qty: 0
  }
]
const _sideList = [
  {
    title: '分类1',
    value: 0
  },
  {
    title: '分类2',
    value: 1,
    info: 20
  },
  {
    title: '分类3',
    value: 2
  },
  {
    title: '分类4',
    value: 3,
    info: 1
  },
  {
    title: '分类5',
    value: 4
  },
  {
    title: '分类6',
    value: 5
  },
  {
    title: '分类7',
    value: 6
  },
  {
    title: '分类8',
    value: 7
  },
  {
    title: '分类9',
    value: 8
  },
  {
    title: '分类10',
    value: 9
  },
  {
    title: '分类11',
    value: 10
  },
  {
    title: '分类12',
    value: 13
  },
  {
    title: '分类13',
    value: 14
  }
]
Page({
  data: {
    stabs: [],
    activeTab: 0,
    list: [],
    activeKey: 0,
    sideList: []
  },
  onLoad() {
    const titles = ['热搜推荐', '手机数码', '家用电器',
      '生鲜果蔬', '酒水饮料', '生活美食', 
      '美妆护肤', '个护清洁', '女装内衣', 
      '男装内衣', '鞋靴箱包', '运动户外', 
      '生活充值', '母婴童装', '玩具乐器',
      '家居建材', '计生情趣', '医药保健', 
      '时尚钟表', '0珠宝饰品', '礼品鲜花', 
      '图书音像', '房产', '电脑办公']
    const stabs = titles.map(item => ({title: item}))
    const list = titles.map(item => ({title: item, data: _list}))
    this.setData({stabs, list, sideList: _sideList})
  },
  onChange (event) {
    wx.showToast({
      icon: 'none',
      title: `切换至第${event.detail}项`
    })
  },
  onItem ({
    currentTarget: {
      dataset: {
        id
      }
    }
  }) {
    console.log(id)
  },
  onChange (e) {
    
  },
  onCart ({
    currentTarget: {
      dataset: {
        id
      }
    }
  }) {
    console.log(id)
  }
})
