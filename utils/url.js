const allUrl ="http://test.scmxkj.com/index.php/cat/";

var  url={};


url.login = allUrl +"part/get_openid";//登录接口
url.Slider=allUrl+'index/banner';//首页轮播图
url.promotion=allUrl+'index/movable_commodity_goods';//首页活动商品
url.TBD=allUrl+'index/mass_goods';//首页众筹商品
url.getDetail=allUrl+'goods/Particulars_of_goods';//商品详情接口
url.getList=allUrl+'index/recommend_brand';//商品分类大项接口
url.brandList=allUrl+'goods/goods_brand_search';//品牌列表接口
url.getProvince=allUrl+'index/getProvince';//获取省份
url.getCity=allUrl+'index/getParent';//获取市县区
url.uploadfile=allUrl+'index/upload';//上传图片接口
url.cardList=allUrl+'Personalhome/Membership_card_list';//会员等级
url.login=allUrl+'user/user';//注册提交接口
url.storage=allUrl+'goods/Collection';//是否收藏的接口
url.msg=allUrl+'user/sms_send';//发送短信
url.sign=allUrl+'user/sms_check';//提交注册
url.testStorege=allUrl+"goods/is_Collection";//首次进入收藏
url.getSize=allUrl+'goods/goods_spec';//获取规格
url.getBrand=allUrl+'index/brand';//获取所有品牌
url.getPrice=allUrl+"goods/goods_spec";//获取价格
url.joinCart=allUrl+'goods/Add_to_cart';//加入购物车
url.goodsSearch=allUrl+'goods/goods_search';//商品搜索页面
url.factoryBrand=allUrl+'goods/factory_brand';//工厂品牌
url.allPromotion=allUrl+'index/movable_commodity_goods';//所有活动商品
url.allTBD=allUrl+'index/mass_goods';//所有众筹商品
url.shopCartList=allUrl+'goods/Shopping_cart_list';//购物车列表

module.exports={
    url:url
};