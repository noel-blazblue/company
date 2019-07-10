import { Block, View, Image, RichText } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import Kefu from '../../components/kefu/kefu'
import Logo from '../../components/logo/logo'
import './detail.scss'
import TaroBdparse from '../../components/taroBdparse/taroBdparse'

// pages/detail/detail.js
const config = require('../../config.js')
const app = Taro.getApp()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    product_desc: '',
    proInfo: {},
    // eslint-disable-next-line react/no-unused-state
    proid: '',
    // eslint-disable-next-line react/no-unused-state
    nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60px; color: red;'
      },
      children: [{
        type: 'html',
        text: 'Hello World!'
      }]
    }]
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
        if (res.data.no == 1) {
          that.setData({
            proInfo: res.data.data,
            product_desc: res.data.data.product_desc
          })
        }
      }
    })
  }

  componentWillMount(options) {
    this.setData({
      proid: options.productid
    })
  }

  componentDidMount() {}

  componentDidShow() {
    this.getDetailMessage(this.data.proid)
    // let nodes = this.state.nodes
    // nodes[0].children[0].text = '<div>这是一个div</div>'
    // this.setState({ nodes: nodes})
  }

  componentDidHide() {}

  componentWillUnmount() {}

  onPullDownRefresh = () => {}
  onReachBottom = () => {}
  onShareAppMessage = () => {}
  config = {
    navigationBarTitleText: '产品详情'
  }

  render() {
    const { proInfo: proInfo, product_desc } = this.state
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
              {/* <TaroParseTmpl
                data={{
                  wxParseData: product_desc.nodes
                }}
              /> */}
              {/*  <rich-text nodes='{{proInfo.product_desc}}'></rich-text>  */}
              <View>
                <TaroBdparse desc={product_desc} />
              </View>
            </View>
            {/* <View>eowahfoawehfuo</View>
            <RichText nodes={this.state.nodes} /> */}

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
