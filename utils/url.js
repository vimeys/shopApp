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


module.exports={
    url:url
}