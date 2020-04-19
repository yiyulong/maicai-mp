const computedBehavior = require('miniprogram-computed')
import { getCategory, getSecondCategoryProduct } from '../../api/common'
import { addOrUpdate } from '../../api/cart'
import Toast from '@vant/weapp/toast/toast'
const app = getApp()
Component({
  behaviors: [computedBehavior],
  data: {
    activeTab: 0,
    list: [],
    categoryList: [],
    _tempList: {},
    activeKey: 0
  },
  computed: {
    stabs (data) {
      return data.list.reduce((acc, cur) => {
        acc.push({ title: cur.name })
        return acc
      }, [])
    }
  },
  pageLifetimes: {
    async show () {
      const { switchClassifyId } = app.globalData
      if (switchClassifyId) {
        if (!this.data.categoryList.length) {
          const { data: categoryList } = await getCategory()
          const activeIndex = categoryList.findIndex(item => parseInt(switchClassifyId) === item.id)
          this.setData({ categoryList, activeKey: activeIndex })
        } else {
          const activeIndex = this.data.categoryList.findIndex(item => parseInt(switchClassifyId) === item.id)
          this.setData({ activeKey: activeIndex })
        }
        if (this.data._tempList[switchClassifyId]) {
          this.setData({
            list: this.data._tempList[switchClassifyId]
          })
        } else {
          const { data } = await getSecondCategoryProduct({ categoryId: switchClassifyId }, { showLoading: true })
          this.data._tempList[switchClassifyId] = data
          this.setData({
            list: data
          })
        }
      }
    },
    hide () {
      app.globalData.switchClassifyId = null
    }
  },
  lifetimes: {
    async attached () {
      if (app.globalData.switchClassifyId) return // 如果从点击首页分类过来
      const { data: categoryList } = await getCategory()
      // console.log(categoryList)
      this.setData({ categoryList })
      const categoryId = app.globalData.switchClassifyId || categoryList[0]?.id
      const { data } = await getSecondCategoryProduct({ categoryId }, { showLoading: true })
      // console.log(data)
      this.data._tempList[categoryId] = data
      this.setData({
        list: data
      })
    }
  },
  methods: {
    async tapClassifyItem ({ currentTarget: { dataset: { id } } }) {
      // console.log(id)
      if (this.data._tempList[id]) {
        this.setData({
          list: this.data._tempList[id],
          activeTab: 0
        })
        return
      }
      const { data } = await getSecondCategoryProduct({ categoryId: id }, { showLoading: true })
      this.data._tempList[id] = data
      this.setData({
        list: data,
        activeTab: 0
      })
    },
    onItem ({
      currentTarget: {
        dataset: {
          id
        }
      }
    }) {
      // console.log(id)
      wx.navigateTo({ url: `/pages/details/index?id=${id}`})
    },
    onChange (e) {
      
    },
    async onCart ({
      currentTarget: {
        dataset: {
          id
        }
      }
    }) {
      // console.log(id)
      if (!app.globalData.userInfo?.mobile) {
        wx.navigateTo({ url: '/pages/login/index' })
        return
      }
      const params = {
        count: 1,
        productId: id
      }
      try {
        await addOrUpdate(params, { showLoading: true })
        const cartCount = parseInt(app.globalData.cartCount) + 1
        app.globalData.cartCount = cartCount
        if (parseInt(app.globalData.cartCount)) {
          wx.setTabBarBadge({
            index: 2,
            text: app.globalData.cartCount + ''
          })
        } else {
          wx.removeTabBarBadge({
            index: 2
          })
        }
        Toast.success('已加入购物车')
      } catch (err) {
        console.log(err)
      }
    }
  }
})
