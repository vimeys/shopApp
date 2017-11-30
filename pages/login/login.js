// pages/login/login.js
import url from '../../utils/url'
import  ajax from '../../utils/ajax'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        open_id:'',
        name:"",
        mobile:'',
        select: {
            province: [1, 2, 3],
            provinceIndex: 0,
            provinceId: [],
            provinceUse:false,
            city:['全部'],
            cityIndex:0,
            cityId:[],
            cityUse:true,
            area:['全部'],
            areaIndex:0,
            areaId:[],
            areaUse:false,
            stress:['全部'],
            stressIndex:0,
            stressId:[],
            stressUse:true
        },
        address:'',//具体地址
        people:'',//联系人
        phone:'',//联系电话
        brand:['小鸟电动车','小牛电动车','小龟王'],//经营品牌
        sellMoney:'',//年销量
        show:false,//查看经营品牌选项
        showInput:false,//查看输入框
        showLevel:false,//查看权益
        src:'',//营业执照
        srcUp:'',//上传营业执照
        srcID1:'',//身份证正面
        srcID1Up:'',//
        srcID2:'',//身份证反面
        srcID2Up:'',
        srcShop:'',//店铺外景
        srcShopUp:'',
        level1:'',
        level2:'',
        red:'',//会员等级
        chooseID:'',//选中的会员等级id
        money:'',//年销量
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let open_id=wx.getStorageSync('open_id');
        let mobile=options.mobile;
        this.setData({
            mobile:mobile,
            open_id:open_id
        })
        let that=this;
        this.getProvince();
        this.getCardLevel();
    },
    //获取会员等级及赋值
    getCardLevel:function (e) {
        // var  that=this;
        let api=url.url.cardList;
        ajax.postAjax(api,{},function (that,json) {
            let data=json.data;
            that.setData({
                level1:data[0].id,
                level2:data[1].id
            })
        },this)
    },

    //获取省份
    getProvince: function (e) {
        let that=this;
        wx.request({
            url:url.url.getProvince,
            method:"POST",
            success:res=>{
                if(res.data.code==200){
                    let arr=[];
                    let arr1=[];
                    var push=(item,index)=>{
                        arr.push(item.areaName);
                        arr1.push(item.areaId)
                    };
                    res.data.data.province_list.forEach(push);
                    var select=that.data.select;
                    select.province=arr;
                    select.provinceId=arr1
                    that.setData({
                        select:select
                    });
                }
            }
        })
    },
    //选择地址
    optionChange:function (e) {
        let that=this;
        let Type=e.currentTarget.dataset.type;
        let value=e.detail.value;
        if(Type==1){
            var select=that.data.select;
            select.provinceIndex=value;
            that.setData({
                select:select
            });
            wx.request({
                url:url.url.getCity,
                method:"POST",
                data:{
                    parentId:that.data.select.provinceId[value]
                },
                success:res=>{
                    console.log(res);
                    if(res.data.code==200){
                        let arr=[];
                        let arr1=[];
                        var push=(item,index)=>{
                            arr.push(item.areaName);
                            arr1.push(item.areaId)
                        };
                        res.data.data.city_list.forEach(push);
                        var select=that.data.select;
                        select.city=arr;
                        select.cityId=arr1;
                        select.cityUse=false;
                        that.setData({
                            select:select,
                        });
                    }
                }
            })
        }else if(Type==2){
            var select=that.data.select;
            select.cityIndex=value;
            that.setData({
                select:select
            });
            wx.request({
                url:url.url.getCity,
                method:"POST",
                data:{
                    parentId:that.data.select.cityId[value]
                },
                success:res=>{
                    console.log(res);
                    if(res.data.code==200){
                        let arr=[];
                        let arr1=[];
                        var push=(item,index)=>{
                            arr.push(item.areaName);
                            arr1.push(item.areaId)
                        };
                        res.data.data.city_list.forEach(push);
                        var select=that.data.select;
                        select.area=arr;
                        select.areaId=arr1;
                        select.areaUse=false;
                        that.setData({
                            select:select,
                        });
                    }
                }
            })
        }else  if(Type==3){
            var select=that.data.select;
            select.areaIndex=value;
            that.setData({
                select:select
            });
            wx.request({
                url:url.url.getCity,
                method:"POST",
                data:{
                    parentId:that.data.select.areaId[value]
                },
                success:res=>{
                    console.log(res);
                    if(res.data.code==200){
                        let arr=[];
                        let arr1=[];
                        var push=(item,index)=>{
                            arr.push(item.areaName);
                            arr1.push(item.areaId)
                        };
                        res.data.data.city_list.forEach(push);
                        var select=that.data.select;
                        select.stress=arr;
                        select.stressId=arr1;
                        select.stressUse=false;
                        that.setData({
                            select:select,
                        });
                    }
                }
            })
        }else if(Type==4){
            var select=that.data.select;
            select.stressIndex=value;
            that.setData({
                select:select
            });
        }

    },
    address:function (e) {
        let value=e.detail.value;
        this.setData({
            address:value
        })
    },
    output:function (e) {
        var value=e.detail.value;
        var Type=e.currentTarget.dataset.type;
        if(Type==1){
            this.setData({
                people:value
            })
        }else if(Type==2){
            this.setData({
                phone:value
            })
        }
    },
    //输入品牌
    inputBrand:function (e) {
        let value=e.detail.value;

        let arr=this.data.brand;
        if(value&&value.length<6){
            arr.push(value);
            this.setData({
                brand:arr
            })
        }

    },
    //删除品牌
    del:function (e) {
        let Type=e.currentTarget.dataset.type;
        console.log(Type);
        let arr=this.data.brand;
        arr.splice(Type,1);
        this.setData({
            brand:arr
        })
    },
    //选择经营品牌
     choose:function (e) {
         this.setData({
             show:true
         })
     },
    chooseBrand:function (e) {
         console.log(123);
         this.setData({
            show:false
        })
         wx.navigateTo({
           url: '../search/search'
         })
     },
     chooseInput:function (e) {
            this.setData({
                show:false,
                showInput:true
            })
     },
     takephoto:function (e) {
        var that=this
         const ctx = wx.createCameraContext()
         ctx.takePhoto({
             quality: 'high',
             success: (res)=> {
                 console.log(res.tempImagePath);
             that.setData({
                 src: res.tempImagePath
             })
         }
     })
     },
     choosePhotoBrand:function (e) {
        var that=this;
         wx.chooseImage({
             count: 1,
             sizeType: ['original', 'compressed'],
             sourceType: ['album', 'camera'],
             success: function (res) {
                 var src = res.tempFilePaths;
                 that.setData({
                     src:src
                 })
                 console.log(123)
                 wx.uploadFile({
                     url: url.url.uploadfile,
                     filePath:src[0],
                     name: 'image',
                     success:res=>{
                         console.log(12313);
                         let src=JSON.parse(res.data);
                         that.setData({
                             srcUp:src.data
                         })
                         console.log(that.data.src);
                     }
                 })
             }
         })
     },
     choosePhotoID1:function (e) {
         let that=this;
         wx.chooseImage({
             count:1,
           success: res => {
                let src=res.tempFilePaths;
               that.setData({
                   srcID1:src
               });
               wx.uploadFile({
                   url: url.url.uploadfile,
                   filePath:src[0],
                   name: 'image',
                   success:res=>{
                       let src=JSON.parse(res.data);
                       that.setData({
                           srcID1Up:src.data
                       })
                   }

               })
           }
         });
     },
    choosePhotoID2:function (e) {
        let that=this;
        wx.chooseImage({
            count:1,
            success: res => {
                let src=res.tempFilePaths;
                that.setData({
                    srcID2:src
                });
                wx.uploadFile({
                    url: url.url.uploadfile,
                    filePath:src[0],
                    name: 'image',
                    success:res=>{
                        let src=JSON.parse(res.data);
                        that.setData({
                            srcID2Up:src.data
                        })
                    }

                })
            }
        });
    },
    choosePhotoShop:function (e) {
        let that=this;
        wx.chooseImage({
            count:1,
            success: res => {
                let src=res.tempFilePaths;
                that.setData({
                    srcShop:src
                });
                wx.uploadFile({
                    url: url.url.uploadfile,
                    filePath:src[0],
                    name: 'image',
                    success:res=>{
                        let src=JSON.parse(res.data);
                        that.setData({
                            srcShopUp:src.data
                        })
                    }

                })
            }
        });
    },
    //年销量
    inputMoney:function (e) {
        let value=e.detail.value;
        this.setData({
            money:value
        })
    },
    //选择会员等级
    level:function (e) {
         let Type=e.currentTarget.dataset.type;
         this.setData({
             red:Type,
             chooseID:Type
         })
        console.log(this.data.chooseID);
    },
    //查看权益
    checkLevel:function (e){
        let that=this;
        if(this.data.showLevel){
            this.setData({
                showLevel:false
            })
        } else{
            this.setData({
                showLevel:true
            })
        }
    },
    //提交信息
    confirm:function (e) {
        var api=url.url.login;
        let obj={};
        let data=this.data;
        obj.open_id=data.open_id;
        obj.nick_name=data.name;
        obj.phone=data.mobile;
        obj.province=data.select .provinceId[data.select.provinceIndex];
        obj.city=data.select .cityId[data.select.cityIndex];
        obj.area=data.select .areaId[data.select.areaIndex];
        obj.township=data.select.stressId[data.select.stressIndex];
        obj.address=data.address;
        obj.store_mobile=data.phone;
        obj.store_user_name=data.people;
        obj.store_license=data.srcUp;
        obj.store_storefront=data.srcShopUp;
        obj.level_vip_id=data.chooseID;
        obj.card_z=data.srcID1Up;
        obj.card_f=data.srcID2Up;
        obj.brand_id='';
        obj.orther_brand='';
        ajax.postAjax(api,obj,function (that,json) {
            let order=json.order;
            let user_id=json.user_id;
            let pay=json.pay;
            wx.requestPermission({
                'timeStamp':pay,
                'nonceStr': '',
                'package': '',
                'signType': 'MD5',
                'paySign': '',
                'success':function(res){
                },
                'fail':function(res){
                }
            })
        },this)
    }
});