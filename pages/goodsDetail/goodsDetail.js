// pages/goodsDetail/goodsDetail.js
import url from '../../utils/url';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsDetail:[],//商品id
        img: [

        ],//轮播图片
        indicatorDots: false,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        width: 450,
        goodsName:'',//商品名称
        goodsImage:[],//商品图片
        goodsSales:'',//商品销量
        goodsPrice:'',//商品售价
        goodsDelPrice:'',//商品原价
        promotion: true,
        TBD: false,
        normal: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that=this;
        let str = options.id;
        let arr = str.split(',');
        that.setData({
            goodsDetail:arr
        })

        if (arr[1] == 0) {
            that.setData({
                promotion:false,
                TBD:false,
                normal:true,
            })
        }else  if(arr[1]==1){
            that.setData({
                promotion:true,
                TBD:false,
                normal:false,
            })
        }else if(arr[1]==2){
            that.setData({
                promotion:false,
                TBD:true,
                normal:false,
            })
        }
        this.getDetail();
    },
    // loadImage:function (e) {
    //   let  that=this;
    //      wx.getImageInfo({
    //            src:'../image/goods.png',
    //          success:function (res) {
    //              that.data.width.push(res.width);
    //              console.log(that.data.width)
    //          }
    //       });
    // },
    getDetail:function (e) {
        let that=this;
        wx.request({
            url:url.url.getDetail,
            method:'POST',
            data:{
                goods_id:that.data.goodsDetail[0],
                is_type:that.data.goodsDetail[1],
            },
            success:res=>{
                let json=res.data.data.commodity_goods_list;
                if(res.data.code==200){
                    that.setData({
                        img:json.goods_img,
                        goodsName:json.goods_name,
                        goodsImage:json.goods_info,
                        goodsSales:json.goods_sales,
                        goodsPrice:json.goods_activity_price,
                        goodsDelPrice:json.goods_shopping_price
                    })
                }
            }
        })
    }
})