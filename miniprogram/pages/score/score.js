// miniprogram/pages/score/score.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dzscore:[],
    tkscore:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name:'getscore'
    }).then(
      res=>{
        wx.hideLoading()
        console.log("onLoad:1-",res)
        this.setData({
          dzscore:res.result.dzscore.data,
          tkscore:res.result.tkscore.data
        })
        console.log(res.result.dzscore.data)
      }
    )
    //获取公告消息msg7
    const db=wx.cloud.database();
    db.collection("msg").where({
      id:7
    }).get().then(
      res=>{
        console.log("onLoad():msg7:", res.data[0].content)
        this.setData({
          msg:res.data[0].content
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

  },
  onShareTimeline:function() {

  }
})