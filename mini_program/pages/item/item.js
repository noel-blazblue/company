// pages/item/item.js
const app = getApp();
const config = require('../../config');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        winHeight: '',
        currentTab: 0,
        secondId: '',
        catList: [],
        proList: [],
        scrollLeft:0,
        requestParament: {
            aid: 61010,
            sign: '',
            second_id: '',
            corpid: app.globalData.corpid,
            page: 1
        },
        showBottomText:false,
        firstRequest:1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    // 滚动切换标签样式
    switchTab(e) {
        var that = this;
        this.setData({
            currentTab: e.detail.current,
            'requestParament.page': 1,
            'requestParament.second_id': that.data.catList[e.detail.current].second_id,
            proList:[],
            firstRequest:2
        });
        console.log('currentTab',this.data.currentTab)
        this.checkCor();
        this.getSpacies();
    },
    // 点击标题切换当前页时改变样式
    swichNav: function(e) {
        var that = this;
        var cur = e.target.dataset.current;
        if (this.data.currentTaB == cur) {
            return false;
        } else {
            this.setData({
                currentTab: cur,
                'requestParament.page': 1,
                'requestParament.second_id': that.data.catList[cur].second_id,
                proList:[],
                firstRequest: 2
            })
        }
        this.getSpacies();
    },
    //判断当前滚动超过一屏时，设置tab标题滚动条。
    checkCor: function() {
        var that = this;
        if (this.data.currentTab >= 3 && this.data.currentTab <= 5) {
            that.setData({
                scrollLeft: 300
            })
        } else if (this.data.currentTab >= 6 && this.data.currentTab <= 8){
            that.setData({
                scrollLeft: 800
            })
        } else if (this.data.currentTab >= 9 && this.data.currentTab <= 11) {
            that.setData({
                scrollLeft:1200
            })
        } else {
            that.setData({
                scrollLeft:0
            })
        }
    },
    getSpacies() {
        var that = this;
        wx.request({
            url: config.service.proSpaciesUrl,
            data: that.data.requestParament,
            success: function(res) {
                if (res.data.no == 1) {
                    if (res.data.data.product_arr.length !== 0) {
                        var catNameList = that.data.catList;
                        var proArr = that.data.proList;
                        for (var cat in res.data.data.cat_list) {
                            catNameList.push(res.data.data.cat_list[cat])
                        }
                        res.data.data.product_arr.map((pro, i) => {
                            proArr.push(pro);
                        })
                        if (that.data.firstRequest == 1) {
                            that.setData({
                                catList: catNameList,
                            })
                        }
                        that.setData({
                            proList: proArr
                        })
                    } else {
                        that.setData({
                            showBottomText:true
                        })
                    }
                }
            }
        })
    },
    bindDownLoad() {
        var that = this
        this.setData({
            'requestParament.page': that.data.requestParament.page + 1,
            firstRequest: 2
        })
        this.getSpacies();
    },
    onLoad: function(options) {
        var that = this;
        //  高度自适应
        wx.getSystemInfo({
            success: function(res) {
                var clientHeight = res.windowHeight,
                    clientWidth = res.windowWidth,
                    rpxR = 750 / clientWidth;
                var calc = clientHeight * rpxR - 100;
                console.log(calc)
                that.setData({
                    winHeight: calc
                });
            }
        });
    },
    goDetail(e) {
        var proid = this.data.proList[e.currentTarget.id].proid
        wx.navigateTo({
            url: '/pages/detail/detail?productid=' + proid,
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        this.setData({
            catList:[]
        })
        this.getSpacies();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})