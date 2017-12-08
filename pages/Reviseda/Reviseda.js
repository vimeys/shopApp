// pages/Reviseda/Reviseda.js
import url from '../../utils/url.js';
import ajax from '../../utils/ajax.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:'',
    show:false,
    order_id:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var order_id = options.order_id;
    var user = wx.getStorageSync('user');
    ajax.postAjax(url.url.order_info,{order_id:order_id,user_id:user.user_id},function(that,json){
      console.log(json.data);
      that.setData({
        order:json.data,
        order_id:order_id,
      });
    },this);
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
  
  },
  /**
   * 物流图片关闭
   */
  wl_close:function(){
    this.setData({
      show:false,
    });
  },
  /**
   * 物流图片打开
   */
  wl_open:function(){
    this.setData({
      show: true,
    });
  },
  upload:function(){
    var user = wx.getStorageSync('user');
    var order_id = this.data.order_id;
    wx.chooseImage({
      count:1,
      sizeType:'original',
      success: function(res) {
         wx.uploadFile({
           url: url.url.uploadfile,
           filePath: res.tempFilePaths[0],
           name: 'image',
           success:function(json){
             var img_path = JSON.parse(json.data);
             ajax.postAjax(url.url.payment, { open_id: user.open_id, order_id: order_id, pay_way: 3, transfer:img_path.data},function(that,json){
               if(json.code == 200){
                 wx.showModal({
                   title: '上传成功',
                   content: '您已上传转款凭证，请等待平台审核....',
                   showCancel:false,
                   success:function(){
                      wx.navigateBack({
                        delta:1
                      })
                   }
                 })
               }
             },this);
           }
         })
      },
    })
  }
})