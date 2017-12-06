function testLogin(that){
  var level=wx.getStorageSync("level");
  console.log(13)
  if(level){
      console.log(123);
      wx.reLaunch({
        url: '../sign/sign',
      })
  }
}
module.exports={
  test:testLogin
}