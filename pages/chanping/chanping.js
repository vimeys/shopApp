// pages/chanping/chanping.js
import url from '../../utils/url'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        Data:'',//数据
        id:'',//品牌id
        check:3,//选中产品选中
        page:1,
        listShow:false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that=this;
        let id=options.id;
        that.setData({
            id:id
        })
        this.getList();
    },
    change: function (e) {
        var that = this;
        let Type = e.currentTarget.dataset.type;
        that.setData({
            check:Type
        })
        this.getList();
    },
    //获取列表
    getList:function (e) {
        let that=this;
        wx.request({
            url:url.url.brandList,
            method:'POST',
            data:{
                brand_id:that.data.id,
                is_type:that.data.check,
                page:that.data.page,
                // pageSize:10
            },
            success:res=>{
                console.log(res);
                that.setData({
                    Data:res.data.data
                })

            }
        })
    },
    //弹窗的显示
    more:function (e) {
        this.setData({
            listShow:true
        })
    },
    hide:function (e) {
        console.log(1);
        this.setData({
            listShow:false
        })
    },
})