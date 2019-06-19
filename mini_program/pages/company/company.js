// pages/company/company.js
const app = getApp();
const config = require('../../config');
var QRCode = require('../../utils/weapp-qrcode.js');
var WxParse = require('../../wxParse/wxParse.js');
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
      corpInfo: {},
      introduction:'',
      imgUrl:[],
      lng:'',
      lat:'',
      markers: [{
          latitude: '',
          longitude: '',
          iconPath: '../imgs/location.png'
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
    //获取用户地址的经纬度
    getLocation() {
        let qqmapsdk = new QQMapWX({ key: 'A5XBZ-RZXKS-6G6OJ-6MXHT-3C6AJ-G2BNO' });
        var that = this;
        var address = this.data.corpInfo.area.split(" ");
        var str = `${address[3]}${address[4]}`
        qqmapsdk.geocoder({
            address: str,
            success: function (res) {
                console.log('reslocation',res)
                if (res.status == 0) {
                    that.setData({
                        lng:res.result.location.lng,
                        lat:res.result.location.lat,
                        'markers[0].latitude': res.result.location.lat,
                        'markers[0].longitude': res.result.location.lng,
                    })
                }
            },
            fail: function (res) {
                console.log('resfail',res);
            },
            complete: function (res) {
                console.log(res);
            }
        })
    },
  makePhoneCall() {
      wx.makePhoneCall({
          phoneNumber: this.data.corpInfo.mobile1,
      })
  },

  onLoad: function (options) {
    

     
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      var corpinfo = wx.getStorageSync('corpinfo');
      var imgUrl = wx.getStorageSync('imgUrl');
      WxParse.wxParse('introduction', 'html', corpinfo.introduction, this, 5),
          this.setData({
              corpInfo: corpinfo,
              imgUrl: imgUrl
          })
      var qrcode = new QRCode('canvas', {
          text: "http://" + corpinfo.corpdomain + ".m.makepolo.com/",
          width: 150,
          height: 150,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H,
      });
      this.getLocation();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})