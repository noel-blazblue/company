import { Block, View, Image, Text, Canvas } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import Kefu from '../../components/kefu/kefu'
import Logo from '../../components/logo/logo'
import './connect.scss'

// pages/connect/connect.js
var QRCode = require('../../utils/weapp-qrcode.js')

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    corpInfo: {},
    imgUrl: []
  }
  makePhoneCall = () => {
    Taro.makePhoneCall({
      phoneNumber: this.data.corpInfo.mobile1
    })
  }

  componentWillMount(options) {}

  componentDidMount() {}

  componentDidShow() {
    var corpinfo = Taro.getStorageSync('corpinfo')
    var imgUrl = Taro.getStorageSync('imgUrl')
    this.setData({
      corpInfo: corpinfo,
      imgUrl: imgUrl
    })
    var qrcode = new QRCode('canvas', {
      text: 'http://' + corpinfo.corpdomain + '.m.makepolo.com/',
      width: 150,
      height: 150,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    })
  }

  componentDidHide() {}

  componentWillUnmount() {}

  onPullDownRefresh = () => {}
  onReachBottom = () => {}
  onShareAppMessage = () => {}
  config = {
    navigationBarTitleText: '联系方式'
  }

  render() {
    const { imgUrl: imgUrl, corpInfo: corpInfo } = this.state
    return (
      <Block>
        <View className='company-pic'>
          <Image src={imgUrl[0]} />
        </View>
        <View className='company-title'>
          <View className='company-l'>{corpInfo.corpname}</View>
          {/*  <view class='company-r'>
                                                                                                                                                                                     <image src='../imgs/wx.png'></image>
                                                                                                                                                                                     <text>在线客服</text>
                                                                                                                                                                                 </view>  */}
        </View>
        <View className='compony-mes'>
          <View className='phone f'>
            <View className='phone-l'>
              <Image src={require('../imgs/pnhone.png')} />
              <Text>{corpInfo.mobile1}</Text>
            </View>
            <View className='phone-r' onClick={this.makePhoneCall}>
              点击拨打
            </View>
          </View>
          <View className='phone'>
            <View className='phone-l'>
              <Image src={require('../imgs/qq.png')} />
              <Text>{corpInfo.qq || '暂无'}</Text>
            </View>
          </View>
          <View className='phone'>
            <View className='phone-l'>
              <Image src={require('../imgs/wxx.png')} />
              <Text>暂无</Text>
            </View>
          </View>
          <View className='phone'>
            <View className='phone-l'>
              <Image src={require('../imgs/weibo.png')} />
              <Text>暂无</Text>
            </View>
          </View>
          <View className='phone'>
            <View className='phone-l'>
              <Image src={require('../imgs/address.png')} />
              <View className='address'>{corpInfo.address}</View>
            </View>
          </View>
          <View className='ewm-box'>
            <View className='erwm'>
              <Canvas canvasId='canvas' style='width: 150px; height: 150px' />
            </View>
          </View>
        </View>
        <View className='call' onClick={this.makePhoneCall}>
          拨打电话
        </View>
        <Logo />
        <Kefu />
      </Block>
    )
  }
}

export default _C
