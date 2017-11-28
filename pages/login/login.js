// pages/login/login.js
import url from '../../utils/url'
import  ajax from '../../utils/ajax'

Page({

    /**
     * 页面的初始数据
     */
    data: {
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
        people:'',//联系人
        phone:'',//联系电话
        brand:'',//经营品牌
        sellMoney:'',//年销量
        show:false,
        showInput:false,
        src:'',//营业执照
        srcUp:'',//上传营业执照
        srcID1:'',//身份证正面
        srcID1Up:'',//
        srcID2:'',//身份证反面
        srcID2Up:'',
        srcShop:'',//店铺外景
        srcShopUp:'',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that=this;
        this.getProvince();
        this.getCardLevel();
    },
    //获取会员等级
    getCardLevel:function (e) {
        let url=url.url.cardList;
        ajax.postAjax(url,{},function (that,json) {
            let data=json.data;
            console.log(data)
        })
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
    //选择经营品牌
     choose:function (e) {
         this.setData({
             show:true
         })
     },
    chooseBrand:function (e) {
         console.log(123)
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
                 wx.uploadFile({
                     url: url.url.uploadfile,
                     filePath:src[0],
                     name: 'image',
                     success:res=>{
                         let src=JSON.parse(res.data);
                         that.setData({
                             srcUp:src
                         })
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
                           srcID1Up:src
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
                            srcID2Up:src
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
                            srcShopUp:src
                        })
                    }

                })
            }
        });
    }
});