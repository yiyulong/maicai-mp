import { getRequest, postRequest } from './request'
const baseUrl = 'http://192.168.8.22:8080'
module.exports = {
  // 获取用户信息
  getUserInfo: (data, config = {}) => getRequest(baseUrl + '/user/getUserInfo', data, config),
  // 解密用户手机号
  login: (data, config = {}) => postRequest(baseUrl + '/user/login', data, config),
  // 搜索产品，动态排序
  getList: (data, config = {}) => getRequest(baseUrl + '/product/getList', data, config),
  // 猜你喜欢
  getIsCommandProductList: (data, config = {}) => getRequest(baseUrl + '/product/getIsCommandProductList', data, config),
  // 查看产品详情
  getDetail: (data, config = {}) => getRequest(baseUrl + '/product/getDetail', data, config)
}
