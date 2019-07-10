import Taro, {Component} from '@tarojs/taro'
import { View } from '@tarojs/components'

// var WxParse = require('./wxParse/wxParse');
var bdParse = require('./bdParse/bdParse.js'); 

export default class TaroBdparse extends Component {
  static defaultProps = {
    isEnable: true
  }
  state = {

  }

  constructor(props) {
    super(props)
    this.state = {
      desc: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps::',nextProps)
    var self = this

    self.setState({
      desc:nextProps.desc
    })
  }

  componentWillUpdate() {
    console.log('componentWillUpdate::',this.state.desc)
  }

  componentDidUpdate() {
    console.log('componentDidUpdate::',this.state.desc)
    var self = this
    var that =  this.$scope
    if (self.state.desc) {
      console.log('有内容')
      var  article = self.state.desc
      // WxParse.wxParse('article', 'html', article, that, 0)
      bdParse.bdParse('article', 'html', article, that, 0)
    }
    else {
      console.log('没有获取到资源')
    }
  }
  componentWillMount() {
    console.log('componentWillMount::',this.state.desc)
  }

  componentDidMount() {
    console.log('componentDidMount::',this.state.desc)

  }

  componentWillUnmout() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  render() {

    return (
      <View>
        {/*<RichText nodes={detail.item.extra}></RichText>*/}
        {/* <import src='./wxParse/wxParse.wxml'/> */}
        <import src='./bdParse/bdParse.swan' />
        {/* <template is="wxParse" data="{{wxParseData:article.nodes}}"/> */}
        <template is="bdParse" data="{{ {bdParseData:article.nodes} }}" />
      </View>
    )
  }
}
