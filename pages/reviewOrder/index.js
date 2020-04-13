import { wxCheckSession } from '../../utils/wxCheckLogin'
import { orderPayTest, orderPreview } from '../../api/order'
import { getServicetime } from '../../api/common'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
Page({
  data: {
    comment: '', // 备注
    time: '',
    amt: '', // 金额
    orderAddressVo: {}, // 地址
    orderItemVoList: [], // 商品列表
    previewCouponVo: {}, // 优惠券
    qty: '', // 商品订购数量
    realAmt: '' // 真实价格
  },
  onLoad (options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromCart', async (data) => {
      // console.log(data)
      const { data: { amt, orderAddressVo, orderItemVoList, previewCouponVo, qty, realAmt } } = await orderPreview({ productIds: data.join(',') })
      // console.log({ amt, orderAddressVo, orderItemVoList, previewCouponVo, qty, realAmt })
      this.setData({ amt, orderAddressVo, orderItemVoList, previewCouponVo, qty, realAmt })
    })
  },
  _toAddress () {
    const _this = this
    wx.navigateTo({
      url: '/pages/address/index',
      events: {
        // 从地址页面传过来的选中的值
        acceptDataFromAddress (data) {
          // console.log(data)
          const { addressId: id, mobile, name, address } = data
          _this.setData({
            orderAddressVo: { id, mobile, name, address },
            time: '' // 重新选择地址 所以时间要清空
          })
        }
      },
      success (res) {
        // 进入到选择地址页面 让地址列表可以点击
        res.eventChannel.emit('acceptDataFromReviewOrder', { enableClick: true })
      }
    })
  },
  // 选择时间
  async _selectTime () {
    if (!this.data.orderAddressVo?.id) {
      Toast('请选择地址!')
      return
    }
    const params = {
      areasId: this.data.orderAddressVo.id
    }
    const { data } = await getServicetime(params, { showLoading: true })
    // console.log(data)
    this.setData({ time: data.date })
  },
  // 跳转到购物车
  _toCoupon () {
    wx.navigateTo({
      url: '/pages/coupon/index',
      events: {
        // 从优惠券页面传过来的值
        acceptDataFromCoupon (data) {
          console.log(data)
        }
      }
    })
  },
  async onSubmit () {
    console.log('creatOrder')
    await wxCheckSession()
    orderPayTest().then(({ data }) => {
      console.log(data)
      const { timeStamp, nonce_str: nonceStr, prepay_id, paySign } = data
      wx.requestPayment({
        timeStamp,
        nonceStr,
        package: `prepay_id=${prepay_id}`,
        signType: 'MD5',
        paySign,
        success (res) {
          console.log(res)
        },
        fail (err) {
          console.log(err)
        }
      })
    })
  }
})