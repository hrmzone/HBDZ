// miniprogram/pages/college/college.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ccode:13400,
    subjectitems:[],
    num:0,
    collegeinfo:null,
    msg:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ccode:options.ccode
    })
    wx.showLoading({
      title: '加载中...',
    })
    console.log("onLoad():1:",this.data.ccode);
    wx.cloud.callFunction({
      name:'getsubjectitems',
      data:{
        ccode:parseInt(this.data.ccode)
      }
    }).then(
      res=>{
        console.log("onLoad():2:",res.result.subjectitems.data.length)
        console.log("onLoad():3:", res.result.collegeinfo.data[0])
        this.setData({
          subjectitems:res.result.subjectitems.data,
          num: res.result.subjectitems.data.length,
          collegeinfo: res.result.collegeinfo.data[0]
        })
        wx.hideLoading()
      }
    )

    //获取公告消息msg3
    const db = wx.cloud.database();
    db.collection("msg").where({
      id: 3
    }).get().then(
      res => {
        console.log("onLoad():4:", res.data[0].content)
        this.setData({
          msg: res.data[0].content
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