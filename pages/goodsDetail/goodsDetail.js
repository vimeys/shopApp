// pages/goodsDetail/goodsDetail.js
import url from '../../utils/url';
import ajax from '../../utils/ajax'
Page({


    /**
     * 页面的初始数据
     */
    data: {
        open_id:'',
        user_id:'',//用户id
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
        goodsStorage:999,//商品库存
        goodszcPeople:'',
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
        sizeID:'',//规格ID
        brandID:'',//品牌ID
        goods_id:'',//商品ID
        factory_id:'',//工厂ID
        color:[],//颜色规格
        voltage:[],//电压规格
        power:[],//功率规格
        choosecolor:0,
        choosevoltage:0,
        choosepower:0,
        buyNumber:1,//默认购买数量
        buyNumberMin:1,//最小购买数量
        buyNumberMax:999,//最大购买数量
        active:false,
        height:[1000,1000,1000],
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
            user_id:user,
            goods_id:arr[0]
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
        // this.loadImage();
    },
    //获取图片高度
    loadImage:function () {
      let  that=this;
      console.log(this.data.goodsImage);
      let image=this.data.goodsImage;
      // debugger
        let arr=[];
        for(var i=0;i<image.length;i++){
            console.log(this.data.goodsImage[i]);
            getImage(that,i)
        }
        console.log(arr);
         function getImage(that,i){
             wx.getImageInfo({
                 src:that.data.goodsImage[i],
                 success:function (res) {
                     console.log(res);
                     // var height=[];
                     console.log(res.height);
                     arr.unshift(res.height);
                     console.log(arr);
                     that.setData({
                         height:arr
                     })
                     // console.log(height)
                 }
             });
         }

        console.log(this.data.height)
    },
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
                    if(json.is_type==1){
                        that.setData({
                            img:json.goods_img,
                            goodsName:json.goods_name,
                            goodsImage:json.goods_info,
                            goodsSales:json.goods_sales,
                            goodsPrice:json.goods_activity_price,
                            goodsDelPrice:json.goods_shopping_price
                        })
                        that.loadImage();
                    }else if(json.is_type==2){
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
        wx.switchTab({
            url:'../../shoppingcart/shoppingcart'
        })
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
    chooseColor:function (e) {
        let name=e.currentTarget.dataset.name;
        let num=e.currentTarget.dataset.num;
        this.setData({
            choosecolor:num
        })
        this.requestSize()
    },
    chooseVoltage:function (e) {
        let name=e.currentTarget.dataset.name;
        let num=e.currentTarget.dataset.num;
        this.setData({
            choosevoltage:num
        })
        this.requestSize()
    },
    choosePower:function (e) {
        let name=e.currentTarget.dataset.name;
        let num=e.currentTarget.dataset.num;
        this.setData({
            choosevoltage:num
        })
        this.requestSize()
    },
    //规格请求
    requestSize:function (e) {
        let that=this;
        let obj={};
        obj.pid=parseInt(this.data.goodsDetail[0]);
        obj.color=this.data.color[this.data.choosecolor];
        obj.voltage=this.data.voltage[this.data.choosevoltage];
        obj.power=this.data.power[this.data.choosepower];
        ajax.getAjax(url.url.getSize,obj,function (that,json) {
            // json.
            that.setData({
                color:json.data.color,
                voltage:json.data.voltage,
                power:json.data.power
            })
        },this);
        ajax.postAjax(url.url.getPrice,obj,function (that,json) {
                that.setData({
                    goodsPrice:json.data.price,
                    goodsStorage:json.data.stock,
                    buyNumberMax:json.data.stock
                })
        },this)
    },


    //购买数量
    inputBuy:function (e) {
        let value=e.detail.value;
        let storage=this.data.goodsStorage;

        if(value!=0&&value<storage){
            storage=storage-value;
            this.setData({
                buyNumber:value,
                goodsStorage:storage
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
        let storage=this.data.goodsStorage
        if(value>1){
            value--;
            storage++;
            this.setData({
                buyNumber:value,
                goodsStorage:storage
            })
        }
    },
    //按钮数量减1
    numJiaTap:function (e) {
        let  value=this.data.buyNumber;
        let storage=this.data.goodsStorage;
        if(value<storage){
            value++;
            storage--;
            this.setData({
                buyNumber:value,
                goodsStorage:storage
            })
        }
    },
    //加入购物车
    joinCart:function (e) {
        var obj={};
        let data=this.data;
        obj.user_id=data.user_id;
        obj.goods_id=data.goods_id;
        obj.buy_number=data.buyNumber;
        obj.spec_id=data.sizeID;
        obj.brand_id=data.brandID;
        obj.factory_id=data.factory_id;
        ajax.postAjax(url.url.joinCart,obj,function (that,json) {
            wx.showToast({
                title: '加入购物车成功',
                icon: 'success',
                duration: 2000
            })
        })
    }
})