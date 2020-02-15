// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',
    collegelist:[],
    num:null,
    msg:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取全部collegelist
    wx.showLoading({
      title: '加载中....',
    });
    wx.cloud.callFunction({
      name:'getcollegelist'
    }).then(
      res=>{
        console.log("onLoad():1:",res.result.dbResult.data.length)
        this.setData({
          collegelist:res.result.dbResult.data,
          num: res.result.dbResult.data.length
        })
        wx.hideLoading()
      }
    );

    //获取公告消息msg1
    const db=wx.cloud.database();
    db.collection("msg").where({
      id:1
    }).get().then(
      res=>{
        console.log("onLoad():2:", res.data[0].content)
        this.setData({
          msg:res.data[0].content
        })
      }
    )
  },

  onChange(e) {
    this.setData({
      value:e.detail
    });
  },

  onSearch() {
    console.log("onSearch():",this.data.value);
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name:'getcollege',
      data:{
        value:this.data.value
      }
    }).then(
      res=>{
        console.log("onSearch():2:",res.result.dbResult.data.length);
        this.setData({
          collegelist: res.result.dbResult.data,
          num: res.result.dbResult.data.length
        });
        wx.hideLoading();
      }
    )
  },

  onCancel() {
    this.setData({
      value:''
    });
    console.log("onCancel():",this.data.value);
    wx.cloud.callFunction({
      name: 'getcollegelist'
    }).then(
      res => {
        console.log("onLoad():1:", res.result.dbResult.data.length)
        this.setData({
          collegelist: res.result.dbResult.data,
          num: res.result.dbResult.data.length
        })
      }
    );
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