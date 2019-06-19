import {
  Block,
  View,
  Swiper,
  SwiperItem,
  Image,
  Canvas
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import Kefu from '../../components/kefu/kefu'
import Logo from '../../components/logo/logo'
import './index.scss'

//index.js
//获取应用实例
const app = Taro.getApp()
const config = require('../../config.js')
var WxParse = require('../../wxParse/wxParse.js')
var QRCode = require('../../utils/weapp-qrcode.js')

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    imgUrls: [],
    corpInfo: {},
    productList: [],
    imgHeight: 0
    //   introduction:{}
  }
  goDetail = e => {
    console.log('e', e.currentTarget.id)
    var productid = this.data.productList[e.currentTarget.id].proid
    Taro.navigateTo({
      url: '/pages/detail/detail?productid=' + productid
    })
  }
  goFenLei = () => {
    Taro.switchTab({
      url: '/pages/item/item'
    })
  }
  getYellowMessage = () => {
    var that = this
    Taro.request({
      url: config.service.productYellowUrl,
      data: {
        corpid: app.globalData.corpid,
        ajax_stype: 1,
        aid: 61010,
        sign: ''
      },
      success: function(res) {
        var proArr = that.data.productList
        var imgArr = that.data.imgUrls
        if (res.data.no == 1) {
          res.data.data.contact_hot_pro.map((pro, i) => {
            if (i < 8) {
              proArr.push(pro)
            }
            if (i < 3) {
              imgArr.push(pro.show_image)
            }
          })
          var qrcode = new QRCode('canvas', {
            text:
              'http://' +
              res.data.data.corpinfo.corpdomain +
              '.m.makepolo.com/',
            width: 150,
            height: 150,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
          })
          Taro.setNavigationBarTitle({
            title: res.data.data.corpinfo.corpname
          })
          Taro.setStorageSync('imgUrl', imgArr)
          Taro.setStorageSync('corpinfo', res.data.data.corpinfo)
          that.setState({
            // introduction: WxParse.wxParse('corpinfo', 'html', res.data.data.corpinfo.introduction,that,5),
            productList: proArr,
            corpInfo: res.data.data.corpinfo,
            imgUrls: imgArr,
            ewmUrl: qrcode._htOption.text
          })
        }
      }
    })
  }
  goYellow = () => {}

  componentWillMount() {}

  componentDidShow() {
    this.getYellowMessage()
  }

  onReachBottom = () => {}
  onShareAppMessage = () => {}
  config = {
    navigationBarTitleText: '公司首页'
  }

  render() {
    const {
      imgUrls: imgUrls,
      productList: productList,
      corpInfo: corpInfo
    } = this.state
    return (
      <Block>
        <View className='swiper'>
          <Swiper
            className='s'
            indicatorDots='true'
            indicatorColor='rgba(255,255,255,0.4)'
            indicatorActiveColor='#fff'
            autoplay='true'
            interval='3000'
            duration='500'
          >
            {imgUrls.map((item, index) => {
              return (
                <Block key={item}>
                  <SwiperItem>
                    <Image
                      src={item}
                      className='slide-image'
                      width='100%'
                      height='360'
                    />
                  </SwiperItem>
                </Block>
              )
            })}
          </Swiper>
        </View>
        <View className='pro-center'>
          <View className='pro'>产品中心</View>
          <View className='more' onClick={this.goFenLei}>
            更多》
          </View>
        </View>
        <View className='pro-con'>
          {productList.map((item, index) => {
            return (
              <View
                className='item'
                onClick={this.goDetail}
                key={item}
                id={index}
              >
                <Image src={item.show_image} />
                <View className='name'>{item.title}</View>
              </View>
            )
          })}
        </View>
        <View className='pro-mes'>
          <View className='pro-mes-t'>企业信息</View>
        </View>
        <View className='pro-mesage'>
          <View className='pro-l'>
            <View>{corpInfo.corpname}</View>
            <View>{'电话： ' + corpInfo.mobile1}</View>
            <View>{'QQ： ' + (corpInfo.qq || '暂无')}</View>
            <View>{'地址： ' + corpInfo.address}</View>
            <View>
              {'pc官网：http://' + corpInfo.corpdomain + '.cn.makepolo.com'}
            </View>
            <View>
              {'wap官网：http://' + corpInfo.corpdomain + '.m.makepolo.com'}
            </View>
          </View>
          <View className='pro-r'>
            <Canvas
              canvasId='canvas'
              style='width: 150px; height: 150px'
              onClick={this.goYellow}
            />
          </View>
        </View>
        <Logo />
        {/*  
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      <view class='logo' wx:if='{{showBottomText}}'>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <image src='../imgs/logo-j.png'></image>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <view>马可波罗提供技术支持</view>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      </view>  */}
        <Kefu />
      </Block>
    )
  }
}

export default _C
