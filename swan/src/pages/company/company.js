import {
  Block,
  View,
  Map,
  Canvas,
  Button
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import Kefu from '../../components/kefu/kefu'
import Logo from '../../components/logo/logo'
import './company.scss'


// pages/company/company.js
const app = Taro.getApp()
const config = require('../../config.js')
var QRCode = require('../../utils/weapp-qrcode.js')
var WxParse = require('../../wxParse/wxParse.js')
var bdParse = require('../../bdParse/bdParse.js')
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js')

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    corpInfo: {},
    introduction: '',
    imgUrl: [],
    lng: '',
    lat: '',
    markers: [
      {
        latitude: '',
        longitude: '',
        iconPath: '../imgs/location.png'
      }
    ],
    // 百度地图
    scale: 16,
    latitude: '40.048828',
    longitude: '116.280412',
    markers: [{
        markerId: '1',
        latitude: '40.052751',
        longitude: '116.278796'
    }],
    showLocation: '1',
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
          that.setState({
            lng: res.result.location.lng,
            lat: res.result.location.lat,
            'markers[0].latitude': res.result.location.lat,
            'markers[0].longitude': res.result.location.lng
          },() => {
                // console.log(this.state)
                // console.log(this.state)  
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

  componentWillMount() {
    
  }

  componentDidMount() {

  }

  componentDidShow() {
    var corpinfo = Taro.getStorageSync('corpinfo')
    var imgUrl = Taro.getStorageSync('imgUrl')
    WxParse.wxParse('introduction', 'html', corpinfo.introduction, this, 5),
      this.setData({
        corpInfo: corpinfo,
        imgUrl: imgUrl
      })
    this.setData({ content:bdParse.bdParse('article', 'html', content, this, 5), })
    var qrcode = new QRCode('canvas', {
      text: 'http://' + corpinfo.corpdomain + '.m.makepolo.com/',
      width: 150,
      height: 150,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    })
    this.getLocation()
    console.log(this.data)
    console.log(this.data)
    this.mapContext = swan.createMapContext('myMap')
    
  }

  componentDidHide() {};

  componentWillUnmount() {};

  onPullDownRefresh = () => {}
  onReachBottom = () => {}
  onShareAppMessage = () => {}
  config = {
    navigationBarTitleText: '公司介绍'
  }

  render() {
    const {
      lng,
      lat,
      markers,
      introduction,
      scale,
      longitude,
      latitude,
      position,
      showLocation
    } = this.state
    return (
      <Block>
        <import src="../../bdParse/bdParse.swan" />
        <View className='introduce'>
          
          <View className='company-pic'>
            {/*  <image src='{{imgUrl[0]}}'></image>  */}
            {/* <Map
              longitude={lng}
              latitude={lat}
              style='width:100%;height:360rpx;'
              markers={markers}
            /> */}
            <Map 
              id='myMap'
              style='width: 100%'
              scale={scale}
              longitude={lng}
              latitude={lat}
              markers={markers}
              position={position}
              showLocation={showLocation}
            />
            {/* <Map /> */}
          </View>
          <View className='company-in'>
            <TaroParseTmpl
              data={{
                wxParseData: introduction.nodes
              }}
            />
            {/* <template is="bdParse" data="{{ {bdParseData:article.nodes} }}" /> */}
          </View>
          {/*  <rich-text nodes='{{corpInfo.introduction}}'></rich-text>  */}
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
