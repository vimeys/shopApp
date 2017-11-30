// pages/sign/sign.js
import url from '../../utils/url.js';
import  ajax from '../../utils/ajax'
Page({


    data: {
        phoneNum:"",
        word:'获取验证码',
        ok:true,//是否再次点击
        blue:false,
        code:''
    },

    onLoad: function (options) {

    },
    //获取input的值
   phoneNum:function (e) {
        console.log(e);
       let num=e.detail.value;
       var that=this;
       that.setData({
           phoneNum:num
       })
   },
    //获取验证码
    getCode:function (e) {
        let time=60;
        var that=this;
        let ok=e.currentTarget.dataset.type;
        if(ok){
            ajax.getAjax(url.url.msg,{mobile:this.data.phoneNum},function (that,json) {
                var timer=setInterval(function () {
                    time--;
                    var word=time+'S';
                    that.setData({
                        word:word,
                        ok:false,
                        blue:true
                    })
                    if(time==0){
                        clearInterval(timer)
                        that.setData({
                            word:'点击重新获取',
                            ok:true,
                            blue:false
                        })
                    }
                },100)
            },this)
        }

    },
    //输入验证码
    code:function (e) {
        let num=e.detail.value;
        var that=this;
        that.setData({
            code:num
        })
    },
    //提交注册
    confirm:function (e) {
        let obj={};
        obj.mobile=this.data.phoneNum;
        obj.code=this.data.code;
        ajax.getAjax(url.url.sign,obj,function (that,json) {
            wx.removeStorageSync('level');
            // wx.switchTab({
            //   url: '../index/index'
            // })
            wx.navigateTo({
              url: '../login/login'
            })
        },this)
    }
});