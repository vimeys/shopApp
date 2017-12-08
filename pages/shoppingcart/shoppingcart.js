// pages/shoppingcart/shoppingcart.js
import url from '../../utils/url';
import ajax from '../../utils/ajax';
let test=require('../../utils/testLogin');
Page({
  /**
   * 页面的初始数据
   */
  data: {
      user_id:'',
      Data:'',
      showNothing:true,
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
      showDel:true,
      chooseAll:true,
      total:''
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
    //获取购物车列表
    getList:function (e) {
        let that=this;
        let user=this.data.user_id;
        ajax.postAjax(url.url.shopCartList,{user_id:user},function (that,json) {
            let data=json.data.list;
            if(data.length>0){
                let arr=[];
                function push(item,index) {
                    item.active=true;
                    item.del=false;
                    item.allMoney=item.buy_price*item.buy_number;
                    arr.push(item.allMoney);
                }
                data.forEach(push);
                let total=new Number();
                for(var i=0;i<arr.length;i++){
                    total+=parseInt(arr[i])
                }
                that.setData({
                    Data:data,
                    // total:total,
                    showNothing:true
                })
                that.getTotal()
            }else {
                that.setData({
                    showNothing:false
                })
            }
        },this)
    },
    //获取总价格
    getTotal:function (e) {
      let that=this;
      let arr=[];
      that.data.Data.forEach(function (item,index) {
          if(item.active){
              arr.push(item.buy_price*item.buy_number)
          }
      })
        let total=new Number()
        for(var i=0;i<arr.length;i++){
            total+=arr[i]
        }
        this.setData({
            total:total
        })
        // console.log(arr);

    },
  //点击选中
  choose:function (e) {
    let type=e.currentTarget.dataset.type;
    let active=this.data.Data;
    active[type].active=!active[type].active;
    let allChoose=true;
      this.setData({
          Data:active,
          // chooseAll:allChoose
      })
      this.getTotal();
    function check(item,index) {
        if(item.active==false){
            allChoose=false
            // debugger;
            // break
            // return
        }
       if(allChoose){
           // if(item.active==true){
           allChoose=true

       }
        // }
    };
    this.data.Data.forEach(check);
      this.setData({
          // Data:active,
          chooseAll:allChoose
      })
  },
  //跳转商品详情页面
    click:function (e) {
        let isType=e.currentTarget.dataset.tp;
        let num=e.currentTarget.dataset.num;
        let arr=[];
        arr.push(num);
        arr.push(isType);
        wx.navigateTo({
          url: '../goodsDetail/goodsDetail?id='+arr
        })
    },
    //长按弹出删除
    longClick:function (e) {
        let type=e.currentTarget.dataset.type;
        let active=this.data.Data;
        active[type].del=!active[type].del;
        this.setData({
            Data:active
        })
    },
    //全选按钮
    chooseAll:function (e) {
        let choose=this.data.chooseAll;
        choose=!this.data.chooseAll;
        let data=this.data.Data;
        function each(item,index) {
            item.active=choose
        }
        data.forEach(each);
        this.setData({
            Data:data,
            chooseAll:choose
        })
        this.getTotal();
    },
    //隐藏删除
    hide:function (e) {
        let type=e.currentTarget.dataset.type;
        let active=this.data.Data;
        active[type].del=!active[type].del;
        this.setData({
            Data:active
        })
    },
    //删除当前
    delClick:function (e) {
        let type=e.currentTarget.dataset.id;
        let data=this.data.Data;
        let obj={};
        obj.user_id=this.data.user_id;
        obj.shoping_cart_id=type;
        ajax.postAjax(url.url.delCart,obj,function (that,json) {
            that.getList();
        },this)
    },
    //页面显示
    onShow:function (e) {
        this.getList();
            test.test(this)

    },
    //确认订单
    confirm:function (e) {
        let arr=[];
        let arrId=[];
        let num=[];
        var click=function (item,index) {
            if(item.active){
                arr.push(item.goods_id);
                arrId.push(item.id);
                num.push(item.buy_number);
            }
        };
        this.data.Data.forEach(click);
        wx.setStorageSync('cartId', arrId);
        wx.setStorageSync('num', num);
        arr=arr.toString();
        ajax.postAjax(url.url.confirmCart,{user_id:this.data.user_id,goods_id:arr},function (that,json) {
            wx.setStorageSync('order', json.data);
            wx.navigateTo({
              url: '../Checkedout/Checkedout'
            })
        },this)
    }
})