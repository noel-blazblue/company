// pages/detail/detail.js
const config = require('../../config');
const app = getApp();
var WxParse = require('../../wxParse/wxParse.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        product_desc: '',
        proInfo: {},
        proid:'',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    goXunpan() {
        wx.navigateTo({
            url: '/pages/xunpan/xunpan?productid=' + this.data.proid,
        })
    },
    getDetailMessage(productid) {
        var that = this;
        wx.request({
            url: config.service.productDetailUrl,
            data: {
                corpid: app.globalData.corpid,
                productid: productid,
                aid: 61010,
                sign: ''
            },
            success: function (res) {
                if (res.data.no == 1) {
                    WxParse.wxParse('product_desc', 'html', res.data.data.product_desc, that, 5),
                        that.setData({
                            proInfo: res.data.data
                        })
                }
            },
        })
    },
    onLoad: function (options) {
        this.setData({
            proid: options.productid
        })
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
        this.getDetailMessage(this.data.proid);
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