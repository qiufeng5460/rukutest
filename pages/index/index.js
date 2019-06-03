//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    post_list:[],
    is_last_page:false,
    page:1,
    page_count:5,
    cat:2
  },
 
  onLoad: function () {
    this.get_posts();
  },
  
  get_posts:function(){
    var self=this;
    if(self.data.is_last_page)
    return;

    var HOST_URI ='https://dx7y.fun/wp-json/wp/v2/';
    var url = HOST_URI + 'posts?per_page=' + self.data.page_count + '&page=' + self.data.page+'&categories='+self.data.cat;
    wx.request({
      url:url,
      success(res){
        console.log(res.data);
        if(res.statusCode===200){
          if(res.data.length){
            //如果收到的数据数组长度小于希望的长度（page_count=5）则表明是最后一页
            if(res.data.length<self.data.page_count){
              self.setData({is_last_page:true});
            }  

            self.setData({post_list:self.data.post_list.concat(res.data)});
          }
        }
        else{
          //rest_post_invalid_page_number：请求的页码大于总页数
          if (res.data.code == "rest_post_invalid_page_number") {
            self.setData({ is_last_page: true });
          }
        }
      },
      fail(e){
        console.log(e);
      }
    });
  },
  //onReachBotton需要有下滑条时才能触发
  onReachBottom:function(){
    var self=this;
    self.setData({page:self.data.page+1}); 
    this.get_posts(); 
  },

  toDetail:function(e){
    console.log(e.currentTarget.id);
    var url ='../detail/detail?id='+e.currentTarget.id;
    wx.navigateTo({
      url: url,
    })
  }

})



