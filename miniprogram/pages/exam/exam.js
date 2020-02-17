// pages/exam/exam.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    main_info:[],
    msg:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database();
    db.collection("main_info").get().then(
      res => {
        console.log("onLoad():1:", res.data[0])
        this.setData({
          main_info: res.data[0]
        })
      }
    )
    db.collection("msg").where({
      id:1
    }).get().then(
      res=>{
        console.log(res)
        this.setData({
          msg:res.data[0].content
        })
    })
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