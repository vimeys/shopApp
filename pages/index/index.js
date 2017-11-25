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
    search:function (e) {
        wx.navigateTo({
          url: '../searchGoods/searchGoods'
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
    cart:function (e) {
        console.log(123)
        // wx.navigateTo({
        //     url:'../shoppingcart/shoppingcart'
        // })
        wx.switchTab({
            url: '../shoppingcart/shoppingcart?'
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
    console.log('onLoad');
      var i=0;
    var checkUser=setInterval(function () {
        console.log(i)
        i++;
        if(i>20){
            let user=wx.getStorageSync('userNmae');
            if(!user){
                console.log(123);
                wx.navigateTo({
                  url: '../sign/sign'
                })
            }
            clearInterval(checkUser);
        }
    },100);
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
