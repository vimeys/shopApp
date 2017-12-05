// pages/TBD/TBD.js
import url from '../../utils/url'
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
      let page=this.data.page
      this.getList(page)
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      let page=this.data.page;
      page++
      this.getList(page)
  },
  getList:function (page) {
    let that=this;
      wx.request({
          url:url.url.allTBD,
          method:'POST',
          data:{
            page:page
          },
          success:function (res) {
            console.log(page)
              if(res.data.code==200){
                  that.setData({
                      Data:res.data.data.commodity_goods_list
                  })
              }
          }
      })
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