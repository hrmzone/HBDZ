// miniprogram/pages/survay/survay.js
var util = require('../../utils/util.js');
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
    ad:'',
    thing1:'',
    time2:'',
    thing3:'',
    thing4:''
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
    db.collection("focus").orderBy("id","desc").limit(1).get().then(
      res=>{
        console.log("onLoad:2:",res.data[0])
        this.setData({
          thing1:res.data[0].thing1,
          time2:res.data[0].time2,
          thing3:res.data[0].thing3,
          thing4:res.data[0].thing4
        })
      }
    )
  },

  formSubmit: function (e) {
    var time = util.formatTime(new Date());
    this.setData({
      time: time
    });
    if (e.detail.value.username == null) {
      console.log("username is null", this.data.userinfo)
      wx.showToast({
        title: '请填写您的姓名',
        icon: 'none'
      })
      return;
    }
    if (e.detail.value.phone == null) {
      console.log("phone is null", this.data.userinfo)
      wx.showToast({
        title: '请填写您的电话号码',
        icon: 'none'
      })
      return;
    }
    var reg_tel = new RegExp('^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\\d{8}$');
    if (!reg_tel.test(e.detail.value.phone)) {
      wx.showToast({
        title: '请填写正确的手机号码',
        icon: 'none'
      })
      return;
    }
    if (e.detail.value.qq == null) {
      console.log("qq is null", this.data.userinfo)
      wx.showToast({
        title: '请填写您的QQ号码',
        icon: 'none'
      })
      return;
    }
    if (e.detail.value.school == null) {
      console.log("school is null", this.data.userinfo)
      wx.showToast({
        title: '请填写您的毕业学校',
        icon: 'none'
      })
      return;
    }
    if (e.detail.value.subject == null) {
      console.log("subject is null", this.data.userinfo)
      wx.showToast({
        title: '请填写您感兴趣专业',
        icon: 'none'
      })
      return;
    }
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
        msg: this.data.msg,
        time:this.data.time
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
    const db=wx.cloud.database();
    db.collection("wx_user").add({
      data:{
        userinfo:e.detail.userinfo
      }
    }).then(
      res=>{
        console.log("add wx_user")
      }
    )
    wx.requestSubscribeMessage({
      tmplIds: ['ohIgAH8KVRw76EB05bvER1BOyyZc3cVhV3oIORTm1i0'],
      success(res) {
        console.log("requestSubscribeMessage")
       }
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

  },
  onShareTimeline:function() {

  }
})