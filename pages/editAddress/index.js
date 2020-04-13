import { getAreasList, addOrUpdateAddress, deleteAddress } from '../../api/address'
Page({
  data: {
    areaList: [], // 区域列表
    areaIndex: null, // 区域下标
    id: null,
    name: '',
    mobil: '',
    address: '',
    prime: false // 是否为默认地址
  },
  onLoad (options) {
    getAreasList().then(res => {
      // console.log(res)
      const { data: { list: areaList } } = res
      this.setData({ areaList })
    })
    const { id } = options
    if (id) {
      this.setData({ id })
      wx.setNavigationBarTitle({
        title: '编辑地址'
      })
    } else {
      wx.setNavigationBarTitle({
        title: '新增地址'
      })
    }
    this._eventChannel = this.getOpenerEventChannel()
    this._eventChannel?.on('acceptDataFromAddressToEdit', data => {
      // console.log(data)
      const { address: { address, mobile, name } } = data
      this.setData({ address, mobile, name })
    })
  },
  onChange ({ detail, currentTarget: { dataset: { key } } }) {
    // console.log(detail, key)
    this.setData({
      [key]: detail
    })
  },
  onSwitch ({ detail }) {
    this.setData({ prime: detail })
  },
  _pickerChange ({ detail: { value } }) {
    // console.log(value)
    this.setData({ areaIndex: value })
  },
  async _addOrUpdateAddress () {
    this.setData({
      saving: true
    })
    const params = {
      address: this.data.address,
      addressId: this.data.id || null,
      mobile: this.data.mobile,
      name: this.data.name,
      prime: this.data.prime // 是否为默认地址
    }
    await addOrUpdateAddress(params).catch(err => {
      this.setData({ saving: false })
    })
    this.setData({ saving: false })
    this._eventChannel?.emit('acceptDataFromEditAddress')
  },
  _deleteAddress () {
    const _this = this
    wx.showModal({
      title: '提示',
      content: '确认删除地址',
      async success (res) {
        if (res.confirm) {
          await deleteAddress({ addressId: _this.data.id }, { showLoading: true })
          _this._eventChannel?.emit('acceptDataFromEditAddress')
          wx.navigateBack()
        }
      }
    })
  }
})