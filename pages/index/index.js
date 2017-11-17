//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        imgUrls: [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
        indicatorDots: false,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        order:"",
        num:50
    },
    changeIndicatorDots: function (e) {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        })
    },
    changeAutoplay: function (e) {
        this.setData({
            autoplay: !this.data.autoplay
        })
    },
    intervalChange: function (e) {
        this.setData({
            interval: e.detail.value
        })
    },
    durationChange: function (e) {
        this.setData({
            duration: e.detail.value
        })
    },
    show:function(e){
        wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
        })
    },
    click:function(e){
        var  that=this;
            wx.chooseImage({
                success: function(res) {
                    console.log(res);
                    that.setData({
                        order: res.tempFilePaths
                    })
                },
            })
        
    },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
    look:function(e){
        var that=this;
        console.log(that.data.order);
        wx.previewImage({
            urls: ["'"+that.data.order+"'"] 
        })
    },

  //搜索页面链接跳转


  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
