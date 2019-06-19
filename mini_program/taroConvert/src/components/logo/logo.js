import { Block, View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './logo.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  state = {
    showBottomText: false
  }
  config = {
    component: true
  }

  render() {
    return (
      <Block>
        {/* components/logo/logo.wxml */}
        <View className="logo">
          <Image src={require('../../pages/imgs/logo-j.png')} />
          <View>马可波罗提供技术支持(makepolo.com)</View>
        </View>
      </Block>
    )
  }
}

export default _C
