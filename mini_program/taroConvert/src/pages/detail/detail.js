import { Block, View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import Kefu from '../../components/kefu/kefu'
import Logo from '../../components/logo/logo'
import './detail.scss'
// import TaroBdparse from '../../components/taroBdparse/taroBdparse'

const config = require('../../config.js')
const app = Taro.getApp()

@withWeapp('Page')
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '产品详情'
  }
  state = {
    product_desc: '',
    proInfo: {},
    proid: ''
  }
  componentWillMount(options) {
    this.setData({
      proid: options.productid
    })
  }

  componentDidShow() {
    this.getDetailMessage(this.data.proid)
  }
  goXunpan = () => {
    Taro.navigateTo({
      url: '/pages/xunpan/xunpan?productid=' + this.data.proid
    })
  }
  getDetailMessage = productid => {
    var that = this
    Taro.request({
      url: config.service.productDetailUrl,
      data: {
        corpid: app.globalData.corpid,
        productid: productid,
        aid: 61010,
        sign: ''
      },
      success: function(res) {
        console.log('父组件数据获取完成：',res.data)
        that.setData({
          proInfo: res.data.data,
          product_desc: res.data.data.product_desc
        })
      }
    })
  }

  render() {
    const { proInfo, product_desc } = this.state
    return (
      <Block>
        <View className='detail'>
          <View className='detail-img'>
            <Image src={proInfo.images_list[0].bigs_medium} />
          </View>
          <View className='introduce-box'>
            <View className='title'>{proInfo.title}</View>
            {proInfo.product_std_attr.map((item, index) => {
              return (
                <View className='can-shu' key={item}>
                  <View className='can'>{item.name + ': ' + item.show}</View>
                </View>
              )
            })}
            <View className='con'>
            <View>
              {/* <DescRichText desc={product_desc}></DescRichText> */}
            </View>
            <View>
              {/* <TaroBdparse desc={product_desc} /> */}
            </View>
            </View>
          </View>
          <View className='xunpan-box' onClick={this.goXunpan}>
            <View className='xunpan'>在线询盘</View>
          </View>
        </View>
        <Logo />
        <Kefu />
      </Block>
    )
  }
}

export default _C
