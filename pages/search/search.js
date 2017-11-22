// pages/search/search.js
var order = ['red', 'yellow', 'blue', 'green', 'red'];
Page({

  /**
   * 页面的初始数据
   */
  data: {
      toView: 'red',
      scrollTop: 100,
      choose:false,
      Data:[1,2,3,4,[1,3,55,6],6,8,3,3,3,3]
  },
    click:function(){
        this.setData({
            choose:true
        })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  upper: function (e) {
      console.log(e)
  },
  lower: function (e) {
      console.log(e)
  },
  scroll: function (e) {
      console.log(e)
  },
  tap: function (e) {
      for (var i = 0; i < order.length; ++i) {
          if (order[i] === this.data.toView) {
              this.setData({
                  toView: order[i + 1]
              })
              break
          }
      }
  },
  tapMove: function (e) {
      this.setData({
          scrollTop: this.data.scrollTop + 10
      })
  },
  onLoad: function (options) {
    
  
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
  
  }
})