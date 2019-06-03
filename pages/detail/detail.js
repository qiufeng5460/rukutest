// pages/detail/detail.js

var WxParse=require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
     articleTitle:'每周测试资讯',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var self=this;
    self.getArticle(options.id);
  },

  getArticle:function(id){
    if(!id)
    return;
    var self=this;
    var HOST_URI = 'https://dx7y.fun/wp-json/wp/v2/posts/';
    var url = HOST_URI + id;
    wx.request({
      url:url,
      success(res){
        console.log(res);
        if(res.statusCode ===200){
          var title = res.data.title.rendered;
          title=title.replace('每周测试资讯（','');
          title=title.replace('）','');
          wx.setNavigationBarTitle({
            title: title
          });
          //20190601:call WxParse to parse html for miniprogram
          //https://github.com/icindy/wxParse
          WxParse.wxParse('articleContent','html',res.data.content.rendered,self,5);
          self.setData({
            //articleTitle:res.data.title.rendered,
            //articleContent:res.data.content.rendered
          });
        }
      },
      fail(e){
        console.log(e);
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})