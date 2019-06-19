//index.js
//获取应用实例
const app = getApp();
const config = require('../../config');
var WxParse = require('../../wxParse/wxParse.js');
var QRCode = require('../../utils/weapp-qrcode.js');
Page({
    data: {
        imgUrls: [],
        corpInfo: {},
        productList: [],
        imgHeight:0,
        //   introduction:{}
    },
    //事件处理函数
    goDetail(e) {
        console.log('e', e.currentTarget.id)
        var productid = this.data.productList[e.currentTarget.id].proid
        wx.navigateTo({
            url: '/pages/detail/detail?productid=' + productid,
        })
    },
    goFenLei() {
        wx.switchTab({
            url: '/pages/item/item',
        })
    },
    getYellowMessage() {
        var that = this;
        wx.request({
            url: config.service.productYellowUrl,
            data: {
                corpid: app.globalData.corpid,
                ajax_stype: 1,
                aid: 61010,
                sign: '',
            },
            success: function(res) {
                var proArr = that.data.productList;
                var imgArr = that.data.imgUrls
                if (res.data.no == 1) {
                    res.data.data.contact_hot_pro.map((pro, i) => {
                        if (i < 8) {
                            proArr.push(pro);
                        }
                        if (i < 3) {
                            imgArr.push(pro.show_image)
                        } 
                    })
                    var qrcode = new QRCode('canvas', {
                        text: "http://"+ res.data.data.corpinfo.corpdomain+".m.makepolo.com/",
                        width: 150,
                        height: 150,
                        colorDark: "#000000",
                        colorLight: "#ffffff",
                        correctLevel: QRCode.CorrectLevel.H,
                    });
                    wx.setNavigationBarTitle({
                        title: res.data.data.corpinfo.corpname,
                    })
                    wx.setStorageSync('imgUrl', imgArr)
                    wx.setStorageSync('corpinfo', res.data.data.corpinfo)
                    that.setData({
                        // introduction: WxParse.wxParse('corpinfo', 'html', res.data.data.corpinfo.introduction,that,5),
                        productList: proArr,
                        corpInfo: res.data.data.corpinfo,
                        imgUrls: imgArr,
                        ewmUrl: qrcode._htOption.text
                    })
                }
            }
        })
    },
    goYellow() {
        
    },
    onLoad: function() {
        
    },
    onShow:function() {
        this.getYellowMessage();
    },
    onReachBottom: function () {
        
    },
    onShareAppMessage: function () {

    }
})