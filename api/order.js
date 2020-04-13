import { getRequest, postRequest } from '../utils/request'
module.exports.orderPayTest = (data, config = {}) => postRequest('/order/orderPayTest', data, config)
module.exports.refreshCount = (data, config = {}) => getRequest('/order/refreshCount', data, config) // 刷新用户每个订单状态的数量
module.exports.orderPreview = (data, config = {}) => getRequest('/order/orderPreview', data, config) // 订单预览
module.exports.getOrderList = (data, config = {}) => getRequest('/order/getOrderList', data, config) // 用户订单列表