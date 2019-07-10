import { Block } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './app.scss'

class App extends Taro.Component {
  componentWillMount() {
    this.$app.globalData = this.globalData

    // 展示本地存储能力
    var logs = Taro.getStorageSync('logs') || []
    logs.unshift(Date.now())
    Taro.setStorageSync('logs', logs)
  }

  globalData = {
    corpid: 100019237571
  }
  config = {
    pages: [
      'pages/index/index',
      'pages/logs/logs',
      'pages/item/item',
      'pages/connect/connect',
      'pages/company/company',
      'pages/detail/detail',
      'pages/xunpan/xunpan'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#487FE4',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      list: [
        {
          pagePath: 'pages/index/index',
          text: '公司首页',
          iconPath: 'pages/imgs/index.png',
          selectedIconPath: 'pages/imgs/indexs.png'
        },
        {
          pagePath: 'pages/item/item',
          text: '产品分类',
          iconPath: 'pages/imgs/item.png',
          selectedIconPath: 'pages/imgs/items.png'
        },
        {
          pagePath: 'pages/connect/connect',
          text: '联系方式',
          iconPath: 'pages/imgs/phone.png',
          selectedIconPath: 'pages/imgs/phones.png'
        },
        {
          pagePath: 'pages/company/company',
          text: '公司介绍',
          iconPath: 'pages/imgs/compony.png',
          selectedIconPath: 'pages/imgs/componys.png'
        }
      ],
      selectedColor: '#487FE4'
    }
  }

  render() {
    return null
  }
} //app.js

export default App
Taro.render(<App />, document.getElementById('app'))
