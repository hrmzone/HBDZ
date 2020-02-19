// miniprogram/pages/survay/survay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    phone:'',
    qq:'',
    school:'',
    subject:'',
    college:'',
    msg:'',
    flag:1,
    ad:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db=wx.cloud.database();
    db.collection("msg").where({
      id:6
    }).get().then(
      res=>{
        console.log("onLoad:1:",res.data[0].content)
        this.setData({
          ad:res.data[0].content
        })
      }
    )
  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    this.setData({
      username: e.detail.value.username,
      phone: e.detail.value.phone,
      qq: e.detail.value.qq,
      school: e.detail.value.school,
      subject: e.detail.value.subject,
      college: e.detail.value.college,
      msg: e.detail.value.msg,
    })
    const db=wx.cloud.database();
    db.collection("comment").add({
      data:{
        userinfo:this.data.userinfo,
        username: this.data.username,
        phone: this.data.phone,
        qq: this.data.qq,
        school: this.data.school,
        subject: this.data.subject,
        college: this.data.college,
        msg: this.data.msg
      }
    }).then(
      res=>{
        console.log("formSubmit():",res)
        this.setData({
          flag:0
        })
      }
    )
  },
  onGotUserInfo: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    this.setData({
      userinfo: e.detail.userInfo
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