import { getRequest, postRequest } from '../utils/request'
module.exports.getBanner = (data, config = {}) => getRequest('/static/banner/list', data, config) // 获取首页轮播图列表
module.exports.getCategory = (data, config = {}) => getRequest('/category/getCategory', data, config) // 获取一级分类
module.exports.getSecondCategoryProduct = (data, config = {}) => getRequest('/category/getSecondCategoryProduct', data, config) // 获取子分类和产品