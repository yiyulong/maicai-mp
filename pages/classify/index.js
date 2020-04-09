const computedBehavior = require('miniprogram-computed')
import { getCategory, getSecondCategoryProduct } from '../../api/common'
Component({
  behaviors: [computedBehavior],
  data: {
    activeTab: 0,
    list: [],
    categoryList: [],
    categoryId: null,
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
  lifetimes: {
    async attached () {
      if (this.data.categoryId) {} else {
        const { data: categoryList } = await getCategory()
        // console.log(categoryList)
        this.setData({ categoryList })
        const categoryId = categoryList[0]?.id
        const { data } = await getSecondCategoryProduct({ categoryId }, { showLoading: true })
        // console.log(data)
        this.data._tempList[categoryId] = data
      }
    }
  },
  async onLoad (options) {
    if (this.data.categoryId) {} else {
      const { data: categoryList } = await getCategory()
      // console.log(categoryList)
      this.setData({ categoryList })
      const categoryId = categoryList[0]?.id
      const { data } = await getSecondCategoryProduct({ categoryId }, { showLoading: true })
      // console.log(data)
      this.data._tempList[categoryId] = data
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
