import { getRequest, postRequest } from '../utils/request'
module.exports.orderPayTest = (data, config = {}) => postRequest('/order/orderPayTest', data, config)
module.exports.refreshCount = (data, config = {}) => getRequest('/order/refreshCount', data, config) // 刷新用户每个订单状态的数量