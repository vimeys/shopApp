//index.js
//获取应用实例
var app = getApp();
// var url=require('../../utils/url');
import url from '../../utils/url';
import ajax from '../../utils/ajax'
var test=require('../../utils/testLogin');
Page({
    data: {
        promotion:[],
        img:[],
        TBD:[],
        indicatorDots: false,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        order:"",
        num:50,
        scroll:'',
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
    //获取广告
    getAD:function (e){
        ajax.postAjax(url.url.AD,{},function (that,json) {
            that.setData({
                scroll:json.data.adv_list
            })
        },this)
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

    //轮播跳转
    hrefProduct:function (e) {
        let type=e.currentTarget.dataset.type
      wx.navigateTo({
        url: '../chanping/chanping?id='+type
      })
    },
  onLoad: function () {
        let that=this;
        //轮播图请求
      // test.test(this)
      wx.request({
          url:url.url.Slider,
          method:'POST',
          success:res=>{
              let img=[];
              let imgID=[];
              if(res.data.code==200){
                  that.setData({
                      img:res.data.data.banner_list
                  })
              }
          }
      });

      wx.request({
          url:url.url.promotion,
          method:'POST',
          success:function (res) {
              if(res.data.code==200){
                  that.setData({
                      promotion:res.data.data.commodity_goods_list
                  })
              }
          }
      })
      wx.request({
          url:url.url.TBD,
          success:res=>{
              if(res.data.code==200){
                  that.setData({
                      TBD:res.data.data.commodity_goods_list
                  })
              }
          }
      })
      this.getAD();
    //   var i=0;
    // var checkUser=setInterval(function () {
    //     console.log(i)
    //     i++;
    //     if(i>20){
    //         let user=wx.getStorageSync('userNmae');
    //         if(!user){
    //             console.log(123);
    //             wx.navigateTo({
    //               url: '../sign/sign'
    //             })
    //         }
    //         clearInterval(checkUser);
    //     }
    // },100);
      //轮播图



    // var that = this;
    // //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })
  },
    href:function (e) {
            let type=e.currentTarget.dataset.type;
            if(type==1){

            }
    },
    goodsDetail:function (e) {
        var id=e.currentTarget.dataset.type;
        let is_id=e.currentTarget.dataset.name;
        let arr=[];
        arr.push(id);
        arr.push(is_id);
        wx.navigateTo({
          url: '../goodsDetail/goodsDetail?id='+arr
        })
    },
    onShow:function (e) {
        test.test(this)
    },
    //更多活动商品
    pMore:function (e) {
      wx.navigateTo({
        url: '../Further/Further'
      })  
    },
    //更多众筹商品
    tMore:function (e) {
        wx.navigateTo({
          url: '../TBD/TBD'
        })
    }
})
