// pages/goodsDetail/goodsDetail.js
import url from '../../utils/url';
import ajax from '../../utils/ajax'
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
        storage:0,//收藏
        storageImage:'../image/cartBlock.png',//收藏图标
        storageWord:'收藏',
        hideShopPopup:true,
    },


    onLoad: function (options) {
        let that=this;
        let str = options.id;
        let arr = str.split(',');
        // console.log(options.options);
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
    //页面加载请求
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
    },
    //跳转购物才
    goCart:function (e) {
        // wx.switchTab({
        //     url:''
        // })
    },
    //收藏接口
    storageRequest:function (e) {
        ajax.postAjax(url.url.storage,)
    },
    //关闭按钮
    close:function (e) {
        this.setData({
            hideShopPopup:true
        })
    },
    //打开规格
    joinCart:function (e) {
        this.setData({
            hideShopPopup:false
        })
    },
    //收藏
    storage:function (e) {
        let Type=e.currentTarget.dataset.type;
        console.log(1);
        if(Type==0){
            wx.showToast({
                title: '收藏成功',
                icon: 'success',
                duration: 2000
            });
            this.setData({
                storage:1,
                storageImage:'../image/del.png',
                storageWord:'已收藏'
            })
        }else{
            this.setData({
                storage:0,
                storageImage:'../image/cartBlock.png',
                storageWord:'收藏'
            })
        }
    }
})