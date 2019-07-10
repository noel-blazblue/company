import {
  Block,
  View,
  Map,
  Canvas
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import Kefu from '../../components/kefu/kefu'
import Logo from '../../components/logo/logo'
import './company.scss'

var QRCode = require('../../utils/weapp-qrcode.js')
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js')

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    introduction: '',
    lng: '',
    lat: '',
    markers: [
      {
        latitude: '',
        longitude: '',
        iconPath: '../imgs/location.png'
      }
    ]
  }
  getLocation = () => {
    let qqmapsdk = new QQMapWX({ key: 'A5XBZ-RZXKS-6G6OJ-6MXHT-3C6AJ-G2BNO' })
    var that = this
    var address = this.data.corpInfo.area.split(' ')
    var str = `${address[3]}${address[4]}`
    qqmapsdk.geocoder({
      address: str,
      success: function(res) {
        console.log('reslocation', res)
        if (res.status == 0) {
          that.setData({
            lng: res.result.location.lng,
            lat: res.result.location.lat,
            'markers[0].latitude': res.result.location.lat,
            'markers[0].longitude': res.result.location.lng
          })
        }
      },
      fail: function(res) {
        console.log('resfail', res)
      },
      complete: function(res) {
        console.log(res)
      }
    })
  }
  makePhoneCall = () => {
    Taro.makePhoneCall({
      phoneNumber: this.data.corpInfo.mobile1
    })
  }

  componentWillMount() {}

  componentDidMount() {}

  componentDidShow() {
    var corpinfo = Taro.getStorageSync('corpinfo')

    var qrcode = new QRCode('canvas', {
      text: 'http://' + corpinfo.corpdomain + '.m.makepolo.com/',
      width: 150,
      height: 150,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    })
    this.getLocation()
  }

  componentDidHide() {}

  componentWillUnmount() {}

  onPullDownRefresh = () => {}
  onReachBottom = () => {}
  onShareAppMessage = () => {}
  config = {
    navigationBarTitleText: '公司介绍'
  }

  render() {
    const {
      lng: lng,
      lat: lat,
      markers: markers,
      introduction: introduction
    } = this.state
    return (
      <Block>
        <View className='introduce'>
          <View className='company-pic'>
            <Map
              longitude={lng}
              latitude={lat}
              style='width:100%;height:360rpx;'
              markers={markers}
            />
          </View>
          <View className='company-in'>

          </View>
          <View className='ewm-box'>
            <View className='ewm'>
              <Canvas canvasId='canvas' style='width: 150px; height: 150px' />
            </View>
          </View>
          <View className='call' onClick={this.makePhoneCall}>
            拨打电话
          </View>
        </View>
        <Logo />
        <Kefu />
      </Block>
    )
  }
}

export default _C
