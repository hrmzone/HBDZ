// miniprogram/pages/subject/subject.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',
    flag:1, //1:显示大类，0：显示查询专业view
    subjectlist:[],
    num:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database();
    db.collection("msg").where({
      id:2
    }).get().then(
      res=>{
        this.setData({
          msg: res.data[0].content
        })
      }
    )
  },
  onChange(e) {
    console.log("onChange():1:",e.detail)
    this.setData({
      value:e.detail
    })
  },

  onSearch() {
    console.log("onSearch():1:",this.data.value)
    wx.showLoading({
      title: '搜索中...',
    })
    this.setData({
      flag:0
    })
    wx.cloud.callFunction({
      name:'getsubjectlist',
      data:{
        value:this.data.value==''?'建筑设计':this.data.value
      }
    }).then(
      res=>{
        wx.hideLoading();
        console.log("onSearch():2:",res.result.list.data);
        this.setData({
          num: res.result.list.data.length,
          subjectlist:res.result.list.data
        })
      }
    )

  },

  onCancel() {
    this.setData({
      flag:1
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