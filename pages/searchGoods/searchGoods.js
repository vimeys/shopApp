// pages/searchGoods/searchGoods.js
import url from '../../utils/url'
import ajax from '../../utils/ajax'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      check:'',//选中
      Data:[1,2,3],//
      page:1,
      goodsName:'',
      // inputValue:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let page=this.data.page;
      let type=this.data.check;
      this.ajax(page,type);
  },
    //选择请求
    change:function (e) {
        let value=e.currentTarget.type;
        this.setData({
            check:value
        });
        let page=this.data.page;
        let type=this.data.check;
        this.ajax(page,type)
    },
    //输入请求
    input:function (e) {
      let value=e.detail.value;
      this.setData({
          goodsName:value
      })
        let page=this.data.page;
      let type=this.data.check;
        this.ajax(page,type);
    },
    // 数据请求
    ajax:function (page,type) {
      let obj={};
      obj.page=page;
      obj.type=type;
      obj.goods_name=this.data.goodsName;
      ajax.postAjax(url.url.goodsSearch,obj,function (that,json) {
          this.setData({
              Data:json.data
          })
      },this)
    },
   //页面跳转
  href:function (e) {
      let goodsId=e.currentTarget.dataset.type
      wx.navigateTo({
        url: '../goodsDetail/goodsDetail?goodsId='+goodsId
      })
  },

  //触底刷新
    onReachBottom: function () {
      let page=this.data.page;
      page++;
      this.setData({
          page:page
      })
        let paged=this.data.page;
      type=this.data.type;
      this.ajax(paged,type)
    },
})