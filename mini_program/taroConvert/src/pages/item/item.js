import {
  Block,
  View,
  ScrollView,
  Swiper,
  SwiperItem,
  Image
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './item.scss'
// pages/item/item.js
const app = Taro.getApp()
const config = require('../../config.js')

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    winHeight: '',
    currentTab: 0,
    secondId: '',
    catList: [],
    proList: [],
    scrollLeft: 0,
    requestParament: {
      aid: 61010,
      sign: '',
      second_id: '',
      corpid: app.globalData.corpid,
      page: 1
    },
    showBottomText: false,
    firstRequest: 1
  }
  switchTab = e => {
    var that = this
    this.setData({
      currentTab: e.detail.current,
      'requestParament.page': 1,
      'requestParament.second_id':
        that.data.catList[e.detail.current].second_id,
      proList: [],
      firstRequest: 2
    })
    console.log('currentTab', this.data.currentTab)
    this.checkCor()
    this.getSpacies()
  }
  swichNav = e => {
    var that = this
    var cur = e.target.dataset.current
    if (this.data.currentTaB == cur) {
      return false
    } else {
      this.setData({
        currentTab: cur,
        'requestParament.page': 1,
        'requestParament.second_id': that.data.catList[cur].second_id,
        proList: [],
        firstRequest: 2
      })
    }
    this.getSpacies()
  }
  checkCor = () => {
    var that = this
    if (this.data.currentTab >= 3 && this.data.currentTab <= 5) {
      that.setData({
        scrollLeft: 300
      })
    } else if (this.data.currentTab >= 6 && this.data.currentTab <= 8) {
      that.setData({
        scrollLeft: 800
      })
    } else if (this.data.currentTab >= 9 && this.data.currentTab <= 11) {
      that.setData({
        scrollLeft: 1200
      })
    } else {
      that.setData({
        scrollLeft: 0
      })
    }
  }
  getSpacies = () => {
    var that = this
    Taro.request({
      url: config.service.proSpaciesUrl,
      data: that.data.requestParament,
      success: function(res) {
        if (res.data.no == 1) {
          if (res.data.data.product_arr.length !== 0) {
            var catNameList = that.data.catList
            var proArr = that.data.proList
            for (var cat in res.data.data.cat_list) {
              catNameList.push(res.data.data.cat_list[cat])
            }
            res.data.data.product_arr.map((pro, i) => {
              proArr.push(pro)
            })
            if (that.data.firstRequest == 1) {
              that.setData({
                catList: catNameList
              })
            }
            that.setData({
              proList: proArr
            })
          } else {
            that.setData({
              showBottomText: true
            })
          }
        }
      }
    })
  }
  bindDownLoad = () => {
    var that = this
    this.setData({
      'requestParament.page': that.data.requestParament.page + 1,
      firstRequest: 2
    })
    this.getSpacies()
  }

  componentWillMount(options) {
    var that = this
    //  高度自适应
    Taro.getSystemInfo({
      success: function(res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth
        var calc = clientHeight * rpxR - 100
        console.log(calc)
        that.setData({
          winHeight: calc
        })
      }
    })
  }

  goDetail = e => {
    var proid = this.data.proList[e.currentTarget.id].proid
    Taro.navigateTo({
      url: '/pages/detail/detail?productid=' + proid
    })
  }

  componentDidMount() {}

  componentDidShow() {
    this.setData({
      catList: []
    })
    this.getSpacies()
  }

  componentDidHide() {}

  componentWillUnmount() {}

  onPullDownRefresh = () => {}
  onReachBottom = () => {}
  onShareAppMessage = () => {}
  config = {
    navigationBarTitleText: '产品分类'
  }

  render() {
    const {
      scrollLeft: scrollLeft,
      currentTab: currentTab,
      catList: catList,
      winHeight: winHeight,
      proList: proList,
      showBottomText: showBottomText
    } = this.state
    return (
      <View className="speices">
        <View className="top-bg" />
        <ScrollView scrollX="true" className="tab-h" scrollLeft={scrollLeft}>
          {catList.map((item, index) => {
            return (
              <View
                className={'tab-item ' + (currentTab == index ? 'active' : '')}
                key={item}
              >
                <View
                  className="dange"
                  data-current={index}
                  onClick={this.swichNav}
                >
                  {item.cat_name}
                </View>
              </View>
            )
          })}
        </ScrollView>
        <Swiper
          className="tab-content"
          current={currentTab}
          duration="300"
          onChange={this.switchTab}
          style={'height:' + winHeight + 'rpx'}
        >
          {catList.length.map((item, index) => {
            return (
              <SwiperItem key="[{item}">
                <ScrollView
                  scrollY
                  className="scoll-h"
                  onScrollToLower={this.bindDownLoad}
                >
                  {proList.map((item, index) => {
                    return (
                      <Block key={item}>
                        <View
                          className="spac"
                          onClick={this.goDetail}
                          id={index}
                        >
                          <Image src={item.show_image} />
                          <View className="name">{item.title}</View>
                        </View>
                      </Block>
                    )
                  })}
                  <View style="clear:both;" />
                  {showBottomText && (
                    <View className="showBottomText" style="text-align:center">
                      没有了！
                    </View>
                  )}
                </ScrollView>
              </SwiperItem>
            )
          })}
        </Swiper>
      </View>
    )
  }
}

export default _C
