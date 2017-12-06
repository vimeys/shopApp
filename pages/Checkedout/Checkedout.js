// pages/Checkedout/Checkedout.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      user_id:'',
      Data:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let user=wx.getStorageSync('user_id');
      this.setData({
          user_id:user
      })
  },
  getStorage:function (e) {
      let order=wx.getStorageSync('order');
      let cartId=wx.getStorageSync('cartId');
      let num=wx.getStorageSync("num");//获取商品购买数量
      this.setData({
          Data:order,
          cartId:cartId
      })
  },
  confirm:function (e) {
      let obj={};
      obj.user_id=this.data.user_id;
      obj.goods=[
          {
          }
      ]
  }
})