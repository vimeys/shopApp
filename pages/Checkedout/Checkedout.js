// pages/Checkedout/Checkedout.js
import url from '../../utils/url';
import ajax from '../../utils/ajax'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      user_id:'',
      Data:'',
      cartId:[],//商品id
      num:[],//商品购买数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let user=wx.getStorageSync('user_id');
      this.setData({
          user_id:user
      })
      this.getStorage();
  },
  getStorage:function (e) {
      let order=wx.getStorageSync('order');
      let cartId=wx.getStorageSync('cartId');
      let num=wx.getStorageSync("num");//获取商品购买数量
      this.setData({
          Data:order,
          cartId:cartId,
          num:num
      })
  },
  confirm:function (e) {
      let obj={};
      let goods=[];
      let ok={}
      function push(item,index) {
          ok.id=item;
          goods.push(ok)
      };
      for(var i=0;i<this.data.cartId.length;i++){
          goods[i]={};
          goods[i].id=this.data.cartId[i];
      }
      for(var j=0;j<this.data.num.length;j++){
          goods[j].num=this.data.num[j];
      }
      obj.user_id=this.data.user_id;
      obj.goods=goods;
      ajax.postAjax(url.url.orderOkTBD,obj,function (that,json) {
          console.log(json)
          wx.setStorageSync('order_id', json.data.order_id);
          wx.navigateTo({
            url: '../payWay/payWay'
          })
      },this)
  }
})