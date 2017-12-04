// pages/shoppingcart/shoppingcart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      Data:'',
      data:[
          {
              active:true,
              del:false,
              is_type:1,
              goodsName:'测试'
          },
          {
              active:true,
              del:false,
              is_type:0,
              goodsName:'测试12'
          }
      ],
      showDel:false,
      chooseAll:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  //点击选中
  choose:function (e) {
    let type=e.currentTarget.dataset.type;
    console.log(this.data.data[type]);
    let active=this.data.data;
    active[type].active=!active[type].active;
      this.setData({
          data:active
      })
  },
  //跳转商品详情页面
    click:function () {

    },
    //长按弹出删除
    longClick:function (e) {

    },
    //全选按钮
    chooseAll:function (e) {
        let choose=this.data.chooseAll;
        choose=!this.data.chooseAll;
        let data=this.data.data;
        function each(item,index) {
            item.active=choose
        }
        data.forEach(each);
        this.setData({
            data:data,
            chooseAll:choose
        })

    }
})