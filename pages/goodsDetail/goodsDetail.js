// pages/goodsDetail/goodsDetail.js
import url from '../../utils/url';
import ajax from '../../utils/ajax'
Page({


    /**
     * 页面的初始数据
     */
    data: {
        open_id:'',
        goodsDetail:[],//商品id
        img: [],//轮播图片
        size:{},//规格
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
        storageImage:'../image/storage.png',//收藏图标
        storageWord:'收藏',
        hideShopPopup:true,//显示弹窗
        first:'',
        second:'',
        third:'',
        color:[],
        voltage:[],
        power:[],
        choosecolor:'',
        choosevoltage:'',
        choosepower:'',
        buyNumber:1,
        buyNumberMin:1,
        buyNumberMax:'',
        active:false
    },


    onLoad: function (options) {
        let that=this;
        let str = options.id;
        let arr = str.split(',');
        // console.log(options.options);
         let open=wx.getStorageSync('open_id');
         let user=wx.getStorageSync('user_id');
        that.setData({
            goodsDetail:arr,
            open_id:open,
            user_id:user
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
        });
        let storageObj={};
        storageObj.user_id=that.data.user_id;
        storageObj.goods_id=that.data.goodsDetail[0];
        wx.request({
            url:url.url.testStorege,
            data:storageObj,
            method:'POST',
            success:function (res) {
                if(res.data.code==200){
                    that.setData({
                        storage:0,
                        storageWord:'已收藏',
                        storageImage:'../image/chooseStorage.png',
                    })
                }else if(res.data.code==201){
                    that.setData({
                        storage:1,
                        storageWord:'收藏',
                        storageImage:'../image/storage.png',
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

    },
    //收藏
    storage:function (e) {
        let Type=e.currentTarget.dataset.type;
        if(Type==1){
            wx.showToast({
                title: '收藏成功',
                icon: 'success',
                duration: 2000
            });
            this.setData({
                storage:0,
                storageImage:'../image/chooseStorage.png',
                storageWord:'已收藏'
            })
            wx.request({
                url:url.url.storage,
                method:'POST',
                data:{
                    user_id:this.data.user_id,
                    goods_id:parseInt(this.data.goodsDetail[0]),
                    is_collection:this.data.storage
                },
                success:res=>{
                    console.log(res);
                }
            })
        }else{
            this.setData({
                storage:1,
                storageImage:'../image/storage.png',
                storageWord:'收藏'
            });
            wx.request({
                url:url.url.storage,
                method:'POST',
                data:{
                    user_id:this.data.user_id,
                    goods_id:parseInt(this.data.goodsDetail[0]),
                    is_collection:this.data.storage
                },
                success:res=>{
                    console.log(res);
                }
            })
        }
    },
    //获取规格
    getSize:function (e) {
        let that=this;
        this.setData({
            hideShopPopup:false
        })
        ajax.getAjax(url.url.getSize,{pid:parseInt(this.data.goodsDetail[0])},function (that,json) {
                // json.
                that.setData({
                    color:json.data.color,
                    voltage:json.data.voltage,
                    power:json.data.power
                })
        },this);
    },
    //选择规格
    chooseSize:function (e) {
        let name=e.currentTarget.dataset.name;
        let Type=e.currentTarget.dataset.type;

    },



    //购买数量
    inputBuy:function (e) {
        let value=e.detail.value;
        console.log(value);
        if(value!=0){
            this.setData({
                buyNumber:value
            })
        }else{
            this.setData({
                buyNumber:1
            })
        }
    },
    //按钮数量加1
    numJianTap:function (e) {
        let  value=this.data.buyNumber;
        if(value>1){
            value--;
            this.setData({
                buyNumber:value
            })
        }
    }

})