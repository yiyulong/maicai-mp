import { getRequest, postRequest } from '../utils/request'
module.exports.getCartList = (data, config = {}) => getRequest('/cart/getCartList', data, config) // 获取首页轮播图列表
module.exports.addOrUpdate = (data, config = {}) => postRequest('/cart/addOrUpdate', data, config) // 添加商品到购物车或者修改购物车产品数量