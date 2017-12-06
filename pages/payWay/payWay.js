// pages/payWay/payWay.js
import url from '../../utils/url'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      chose:1,
      open_id:"",
      order_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let open_id=wx.getStorageSync('open_id');
      let order_id=wx.getStorageSync('order_id');
      this.setData({
          open_id:open_id,
          order_id:order_id
      })
  },
  //选择方式
    click:function (e) {
        console.log()
        let type=e.currentTarget.dataset.type;
        this.setData({
            chose:type
        })
    },
    confirm: function (e) {
        let obj = {};
        obj.order_id=this.data.order_id;
        obj.open_id=this.data.open_id;
        obj.pay_way=this.data.chose;
        if(this.data.chose==1){
            wx.request({
                url: url.url.payWay,
                method: 'POST',
                data: obj,
                success: res => {
                    console.log(res);
                }
            })
        }else if(this.data.chose==3){
          wx.navigateTo({
            url: '../iccount/iccount'
          })
        }
       
    }
})