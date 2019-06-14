// pages/canvas/canvas.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      hidden:true,
      preurl:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {




  },

  share:function(){
     var self=this;
     wx.showLoading({title:'努力生成中...'});

    let promise1 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: '../../images/qrcode.jpg',
        success: function (res) {
          console.log(res);
          resolve(res);
        }
      });
    });
    let promise2 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: '../../images/qrbg.jpg',
        success: function (res) {
          console.log(res);
          resolve(res);
        }
      });
    });

    Promise.all([promise1, promise2]).then(res => {
      console.log(res);
      const ctx = wx.createCanvasContext('shareImg');
      //20190613:如果不设置fill白色的话，andriod默认fill是黑色
      ctx.setFillStyle('White');
      ctx.fillRect(0,0,258,500);
      ctx.drawImage('../../' + res[0].path, 0, 0, 258, 258);
      ctx.drawImage('../../' + res[1].path, 0, 385, 258, 115);

      ctx.setTextAlign('center');
      ctx.setFillStyle('#000');
      ctx.setFontSize(22);
      ctx.fillText('入库测试每周资讯', 120, 330);

      ctx.stroke();

      ctx.draw(true,function(){
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 258,
          height: 500,
          destWidth: 258,
          destHeight: 500,
          canvasId: 'shareImg',
          fileType: 'jpg',
          success: function (res) {
            console.log(res);
            self.setData({
              preurl: res.tempFilePath,
              hidden: false,
            });
            wx.hideLoading();
          },
          fail: function (res) {
            console.log(res);
          },
        });
      });
    });
  },

  save:function(){
    var self=this;

    wx.getSetting({
      success(res){
        console.log(res);
        if(!res.authSetting['scope.writePhotosAlbum']){
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success(res){
               console.log(res);
               wx.saveImageToPhotosAlbum({
                 filePath: self.data.preurl,
                 success(res){
                   console.log("after auth,save photo is ok");
                   wx.showModal({
                     title:'提示',
                     content:'图片已保存到相册，赶紧晒一下吧~',
                     showCancel: false,
                     complete(){
                       self.setData({
                         hidden:true,
                       });
                     },
                   });
                 },
                 fail(res){
                   console.log("after auth,save photo is fail");
                 },
               })
            },
            fail(res){
              console.log(res);
              console.log("user refuse auth");
              wx.showModal({
                title:'提示',
                content:'因为授权被拒绝，所以无法保存图片',
                complete(){
                  self.setData({
                    hidden:true,
                  });
                },
        
              });

            },
          })
        }
        else{
          wx.saveImageToPhotosAlbum({
            filePath: self.data.preurl,
            success(res) {
              console.log("has auth,save photo is ok");
              wx.showModal({
                title: '提示',
                content: '图片已保存到相册，赶紧晒一下吧~',
                showCancel: false,
                complete() {
                  self.setData({
                    hidden: true,
                  });
                },
              });
            },
            fail(res) {
              console.log("has auth,save photo is fail");
            },
          })
        }
      },
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