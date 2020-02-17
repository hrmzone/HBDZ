// miniprogram/pages/cate/cate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scate:'一类',
    catelist:[],
    num:0,
    msg:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    this.setData({
      scate:options.scate
    })
    const db = wx.cloud.database();
    db.collection("msg").where({
      id: 4
    }).get().then(
      res => {
        this.setData({
          msg: res.data[0].content
        })
      }
    )
    wx.cloud.callFunction({
      name:'getcatelist',
      data:{
        scate:this.data.scate
      }
    }).then(
      res=>{
        wx.hideLoading();
        console.log("onLoad():1:",res.result.list.data.length);
        this.setData({
          catelist: res.result.list.data,
          num: res.result.list.data.length
        })
      }
    )
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