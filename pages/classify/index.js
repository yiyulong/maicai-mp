const computedBehavior = require('miniprogram-computed')
import { getCategory, getSecondCategoryProduct } from '../../api/common'
const app = getApp()
Component({
  behaviors: [computedBehavior],
  data: {
    activeTab: 0,
    list: [],
    categoryList: [],
    _tempList: {}
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
          this.setData({ categoryList })
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
          list: this.data._tempList[id]
        })
        return
      }
      const { data } = await getSecondCategoryProduct({ categoryId: id }, { showLoading: true })
      this.data._tempList[id] = data
      this.setData({
        list: data
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
  }
})
