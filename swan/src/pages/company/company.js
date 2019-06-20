/* eslint-disable import/no-commonjs */
import {
  Block,
  View,
  Map,
  Canvas,
  RichText,
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
// var WxParse = require('../../wxParse/wxParse.js')
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
    latitude: '',
    longitude: '',
    markers: [{
        markerId: '1',
        latitude: '',
        longitude: ''
    }],
    showLocation: '1',
    // eslint-disable-next-line react/no-unused-state
    // 富文本
    nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60px; color: red;'
      },
      children: [{
        type: 'text',
        text: '123'
      }]
    }]
  }
  getLocation = () => {
    let qqmapsdk = new QQMapWX({ key: 'A5XBZ-RZXKS-6G6OJ-6MXHT-3C6AJ-G2BNO' })
    var that = this
    var address = this.data.corpInfo.area.split(' ')
    var str = `${address[3]}${address[4]}`
    qqmapsdk.geocoder({
      address: str,
      success: function(res) {
        if (res.status == 0) {
          that.setState({
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

  componentWillMount () {
    // var corpinfo = Taro.getStorageSync('corpinfo')
    // var imgUrl = Taro.getStorageSync('imgUrl')
    // let { nodes } = this.state
    // nodes[0].children[0].text = corpinfo
    // this.setData({ nodes: nodes })
    this.ditu()

  }

  componentDidShow() {
    // wx富文本
    var corpinfo = Taro.getStorageSync('corpinfo')
    var imgUrl = Taro.getStorageSync('imgUrl')
    var that = this
    // WxParse.wxParse('introduction', 'html', corpinfo.introduction, that, 5)
    this.setData({
      corpInfo: corpinfo,
      imgUrl: imgUrl
    })
    // this.setData({ content:bdParse.bdParse('article', 'html', content, this, 5), })
    let { nodes } = this.state
    nodes[0].children[0].text = corpinfo.introduction
    this.setState({ nodes: nodes },() => {
      // console.log(this.state.nodes[0].children[0].text)
    })

    // 二维码
    var qrcode = new QRCode('canvas', {
      text: 'http://' + corpinfo.corpdomain + '.m.makepolo.com/',
      width: 150,
      height: 150,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    })
    this.getLocation()
    this.mapContext = swan.createMapContext('myMap')


  }

  ditu = () => {
    let that = this
    console.log('ffsdf')
    Taro.request({
      url: 'http://api.map.baidu.com/geocoder?address=广州塔&output=json&key=EGkin4KyOQL39XAUBnVl3olNKL6dMwOe&city=广州',
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        that.emit(res)
      }
    })
  }

  emit = (res) => {
    let lat = res.data.result.location.lat
    let lng = res.data.result.location.lng
    
    this.setState({ latitude: lat, longitude: lng},() => {
      console.log(this.state.latitude)
    })

  }

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
      showLocation,
      nodes
    } = this.state
    return (
      <Block>
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
              longitude={longitude}
              latitude={latitude}
              markers={markers}
              position={position}
              showLocation={showLocation}
            />
          </View>
          <View className='company-in'>
            <TaroParseTmpl
              data={{
                wxParseData: introduction.nodes
              }}
            />
            {/* <RichText nodes={nodes} /> */}


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
