// pages/xunpan/xunpan.js
const app = getApp();
const config = require('../../config');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        linkman: '',
        phone: '',
        title: '',
        order_total:Number,
        proid:'',
        corpname:'',
        showModal: false,
        xpFlag:false,
        imgUrl:[],
        xpFlag2:true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    inputChange(e) {
        var key = e.currentTarget.dataset.info
        if (key == 'linkman') {
            this.setData({ linkman: e.detail.value })
        }
        if (key == 'phone') {
            this.setData({ phone: e.detail.value })
        }
        if (key == 'title') {
            this.setData({ title: e.detail.value })
        }
        if (key == 'order_total') {
            this.setData({ order_total: e.detail.value })
        }
    },
    bindInputBlur(e) {
        var mobiel = e.detail.value;
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        if (mobiel.length == 0) {
            wx.showModal({
                title: '',
                content: '手机号不能为空',
            })
        } else if (mobiel.length !== 11) {
            wx.showToast({
                title: '手机号长度有误',
                icon: 'success',
                duration: 1500
            })
        } else if (!myreg.test(mobiel)) {
            wx.showToast({
                title: '手机号有误',
                icon: 'success',
                duration: 1500
            })
        }
        return true
    },
    xunPan() {
        if (this.data.xpFlag2) {
            var that = this;
            var data = this.data
            if (data.linkman) {
                if (data.phone.length == 11) {
                    if (data.title) {
                        if (data.order_total) {
                            wx.request({
                                url: config.service.xunPanUrl,
                                data: {
                                    linkman: data.linkman,
                                    title: data.title,
                                    keyword: '',
                                    corpid: '',
                                    corp_name: data.corpname,
                                    product_id: data.proid,
                                    phone: data.phone,
                                    second_cat: '',
                                    order_total: data.order_total,
                                    aid: 61010,
                                    sign: '',
                                },
                                success: function (res) {
                                    if (res.data.no == 1) {
                                        that.setData({
                                            showModal: true,
                                            xpFlag2:false
                                        })
                                    }
                                    if (res.data.no == -1) {
                                        that.setData({
                                            xpFlag: !that.data.xpFlag
                                        })
                                    }

                                }
                            })
                        } else {
                            wx.showModal({ title: '', content: '购买数量不能为空', })
                            return false
                        }
                    } else {
                        wx.showModal({ title: '', content: '购买产品不能为空', })
                        return false
                    }
                } else {
                    wx.showModal({ title: '', content: '电话不能为空', })
                    return false
                }
            } else {
                wx.showModal({ title: '', content: '联系人不能为空', })
                return false
            }
        }
    },
    onConfirm() {
        this.setData({
            showModal: false
        });;
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
        var corpname = wx.getStorageSync('corpinfo').corpname;
        var imgUrl = wx.getStorageSync('imgUrl');
        console.log('corpname', corpname)
        this.setData({
            proid: options.productid,
            corpname: corpname,
            imgUrl: imgUrl
        })
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