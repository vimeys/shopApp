// pages/sign/sign.js
let url=require('../../utils/url.js');
Page({


    data: {
        phoneNum:"",
        word:'获取验证码'
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

    }
});