import { wxCheckSession } from '../../utils/wxCheckLogin'
import { orderPayTest } from '../../api/order'
Page({
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