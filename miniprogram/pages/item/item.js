// miniprogram/pages/item/item.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sname:'建筑设计',
    subjectinfo:[],
    subjectitems:[],
    num:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    this.setData({
      sname:this.getStr(options.sname)
    })
    console.log("onLoad():1:",this.data.sname);

    wx.cloud.callFunction({
      name:'getsubjectitem',
      data:{
        sname:this.data.sname
      }
    }).then(
      res=>{
        wx.hideLoading()
        console.log("onLoad:2:",res)
        this.setData({
          subjectinfo:res.result.subjectinfo.data[0],
          subjectitems:res.result.subjectitems.data,
          num: res.result.subjectitems.data
        })
        console.log("onLoad:2:", this.data.subjectinfo)
      }
    )
  },

//有些专业名称为：建筑工程技术(装配化施工)，需要去掉(符号之后的内容，只需要专业，无需方向。
  getStr(value) {
    let index=value.indexOf('(');
    let str=value.substring(0,index);
    console.log("method getStr():",str);
    return str;
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