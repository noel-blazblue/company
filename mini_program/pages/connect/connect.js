// pages/connect/connect.js
var QRCode = require('../../utils/weapp-qrcode.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    corpInfo:{},
    imgUrl:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
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