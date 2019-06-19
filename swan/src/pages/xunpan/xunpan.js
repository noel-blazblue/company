import { Block, View, Image, Text, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import Kefu from '../../components/kefu/kefu'
import Logo from '../../components/logo/logo'
import './xunpan.scss'
// pages/xunpan/xunpan.js
const app = Taro.getApp()
const config = require('../../config.js')

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    linkman: '',
    phone: '',
    title: '',
    order_total: Number,
    proid: '',
    corpname: '',
    showModal: false,
    xpFlag: false,
    imgUrl: [],
    xpFlag2: true
  }
  inputChange = e => {
    var key = e.currentTarget.dataset.info
    if (key == 'linkman') {
      this.setData({ linkman: e.detail.value })
    }
    if (key == 'phone') {
      this.setData({ phone: e.detail.value })
    }
    if (key == 'title') {
      this.setData({ title: e.detail.value })
    }
    if (key == 'order_total') {
      this.setData({ order_total: e.detail.value })
    }
  }
  bindInputBlur = e => {
    var mobiel = e.detail.value
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/
    if (mobiel.length == 0) {
      Taro.showModal({
        title: '',
        content: '手机号不能为空'
      })
    } else if (mobiel.length !== 11) {
      Taro.showToast({
        title: '手机号长度有误',
        icon: 'success',
        duration: 1500
      })
    } else if (!myreg.test(mobiel)) {
      Taro.showToast({
        title: '手机号有误',
        icon: 'success',
        duration: 1500
      })
    }
    return true
  }
  xunPan = () => {
    if (this.data.xpFlag2) {
      var that = this
      var data = this.data
      if (data.linkman) {
        if (data.phone.length == 11) {
          if (data.title) {
            if (data.order_total) {
              Taro.request({
                url: config.service.xunPanUrl,
                data: {
                  linkman: data.linkman,
                  title: data.title,
                  keyword: '',
                  corpid: '',
                  corp_name: data.corpname,
                  product_id: data.proid,
                  phone: data.phone,
                  second_cat: '',
                  order_total: data.order_total,
                  aid: 61010,
                  sign: ''
                },
                success: function(res) {
                  if (res.data.no == 1) {
                    that.setData({
                      showModal: true,
                      xpFlag2: false
                    })
                  }
                  if (res.data.no == -1) {
                    that.setData({
                      xpFlag: !that.data.xpFlag
                    })
                  }
                }
              })
            } else {
              Taro.showModal({ title: '', content: '购买数量不能为空' })
              return false
            }
          } else {
            Taro.showModal({ title: '', content: '购买产品不能为空' })
            return false
          }
        } else {
          Taro.showModal({ title: '', content: '电话不能为空' })
          return false
        }
      } else {
        Taro.showModal({ title: '', content: '联系人不能为空' })
        return false
      }
    }
  }
  onConfirm = () => {
    this.setData({
      showModal: false
    })
  }

  componentWillMount(options) {}

  componentDidMount() {}

  componentDidShow() {
    var corpname = Taro.getStorageSync('corpinfo').corpname
    var imgUrl = Taro.getStorageSync('imgUrl')
    console.log('corpname', corpname)
    this.setData({
      proid: options.productid,
      corpname: corpname,
      imgUrl: imgUrl
    })
  }

  componentDidHide() {}

  componentWillUnmount() {}

  onPullDownRefresh = () => {}
  onReachBottom = () => {}
  onShareAppMessage = () => {}
  config = {
    navigationBarTitleText: '在线询盘'
  }

  render() {
    const {
      imgUrl: imgUrl,
      linkman: linkman,
      phone: phone,
      title: title,
      order_total: order_total,
      showModal: showModal,
      xpFlag: xpFlag
    } = this.state
    return (
      <Block>
        <View className="xun-pan">
          <View className="xun-pic">
            <Image src={imgUrl[0]} />
          </View>
          <View className="inter">
            如果您对我们的产品感兴趣的话，请填写下面的表单！
          </View>
          <View className="form-box">
            <View className="item">
              <View>
                <Text>*</Text>姓名:
              </View>
              <Input
                type="text"
                value={linkman}
                data-info="linkman"
                onInput={this.inputChange}
              />
            </View>
            <View className="item">
              <View>
                <Text>*</Text>电话:
              </View>
              <Input
                type="number"
                value={phone}
                data-info="phone"
                onInput={this.inputChange}
                onChange={this.bindInputBlur}
              />
            </View>
            <View className="item">
              <View>
                <Text>*</Text>购买产品:
              </View>
              <Input
                type="text"
                value={title}
                data-info="title"
                onInput={this.inputChange}
              />
            </View>
            <View className="item l">
              <View>
                <Text>*</Text>购买数量:
              </View>
              <Input
                type="number"
                value={order_total}
                data-info="order_total"
                onInput={this.inputChange}
              />
            </View>
          </View>
          <View className="submit" onClick={this.xunPan}>
            提交
          </View>
        </View>
        {/*  询盘弹框  */}
        {showModal && (
          <View
            className="modal-mask"
            onClick={this.hideModal}
            onTouchMove={this.preventTouchMove}
          />
        )}
        {showModal && (
          <View className="modal-dialog">
            <View className="modal-title">系统提示</View>
            {xpFlag == false && (
              <View className="modal-content">提交成功,稍后联系您</View>
            )}
            {xpFlag && <View className="modal-content">询盘失败</View>}
            <View className="modal-footer">
              <View
                className="btn-confirm"
                onClick={this.onConfirm}
                data-status="confirm"
              >
                确定
              </View>
            </View>
          </View>
        )}
        <Logo />
        <Kefu />
      </Block>
    )
  }
}

export default _C
