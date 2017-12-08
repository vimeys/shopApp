// pages/vip/vip.js
import url from '../../utils/url.js';
import ajax from '../../utils/ajax.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    end_time:'',
    one_show:false,
    two_show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var end_time = wx.getStorageSync('level_vip_end_time');
    var vip_id = wx.getStorageSync('vip_id');
    if(vip_id==1){
      this.setData({
        one_show:true,
        two_show: false
      });
    }
    this.setData({
      end_time:end_time,
    });
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
  checked:function(e){
    var id = e.currentTarget.dataset;
    if(id.index==1){
      this.setData({
        one_show:true,
        two_show:false
      });
    }else{
      this.setData({
        one_show: false,
        two_show: true
      });
    }
  },
  //支付
  pay:function(){
    var show = this.data.two_show;
    var user = wx.getStorageSync('user');
    console.log(user);
    var id='';
    if(show){
      id=2;
    }else{
      id=1;
    }
    ajax.postAjax(url.url.Upgrade,{upgrade_id:id,user_id:user.user_id,open_id:user.open_id},function(that,json){
       console.log(json);
    },this);
  }
})