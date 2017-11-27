// pages/login/login.js
import url from '../../utils/url'
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
            areaUse:true,
            stress:['全部'],
            stressIndex:0,
            stressId:[],
            stressUse:true
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that=this;
        this.getProvince()
    },
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
    optionChange:function (e) {
        let that=this;
        let Type=e.currentTarget.dataset.type;
        let value=e.detail.value;
        if(Type==1){
            var select=that.data.select;
            select.provinceIndex=value;
            that.setData({
                select:select
            })
            console.log(that.data.provinceId);
            wx.request({
                url:url.url.getCity,
                method:"POST",
                data:{
                    parentId:that.data.select.provinceId[value]
                },
                success:res=>{
                    console.log(res);
                }
            })
        }
    }

});