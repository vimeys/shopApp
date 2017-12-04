// pages/Further/Further.js
import url from '../../utils/url'
import ajax from '../../utils/ajax'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      Data:[],
      page:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getList()
  },
  //数据请求
    getList:function (e) {
        ajax.postAjax(url.url.allPromotion,{num:this.data.page},function (that,json) {
            that.setData({
                Data:json.data.commodity_goods_list
            })
        },this)
    },
    //跳转商品详情
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
})