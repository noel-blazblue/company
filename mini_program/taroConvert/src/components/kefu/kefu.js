import { Block, Button, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './kefu.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  config = {
    component: true
  }

  render() {
    return (
      <Block>
        {/* components/kefu/kefu.wxml */}
        <Button openType="contact" className="contact">
          <Image src={require('../../pages/imgs/kf.png')} />
        </Button>
      </Block>
    )
  }
}

export default _C
