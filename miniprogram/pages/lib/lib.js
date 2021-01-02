// miniprogram/pages/lib.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tklist:[],
    openid:'',
    isAccept: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    this.getOpenid()

    const db = wx.cloud.database();
    db.collection("lib").orderBy("id","asc").get().then(
      res=> {
        wx.hideLoading();
        console.log("onLoad() 1:",res.data[0])
        this.setData({
          tklist:res.data
        })
      }
    )
  },

  getOpenid:function() {
    let that = this;
    wx.showLoading({
      title: '数据加载中',
    })
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log('云函数获取到的openid: ', res.result.openid)
        var openid = res.result.openid;
        that.setData({
          openid: openid
        })
      }
    })
  },

  subscriptionNotice: function(event) {
    wx.vibrateShort();
    console.log("function-subscriptionNotice")
    console.log("subscriptionNotice",event.currentTarget.dataset.idx)
    this.setData({
      idx:event.currentTarget.dataset.idx
    })
    let that = this;
    let id = '5uQ5M5TgBz1aZ5f-KZ8j5yU7l6ALwk3rSt9-zQx6IFQ'; // 订阅消息模版id
    if (wx.requestSubscribeMessage) {
      wx.requestSubscribeMessage({
        tmplIds: [id],
        success(res) {
          if (res[id] == 'accept') {
            that.sendMessageByCloud()
          } else {
            //用户拒绝了订阅或当前游戏被禁用订阅消息
            wx.showToast({
              title: '订阅失败'
            })
          }
        },
        fail(res) {
          console.log(res)
        },
        complete(res) {
          console.log("subscriptionNotice():",res)
        }
      })
    } else {
    // 兼容处理
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },

  sendMessageByCloud() {
    let that = this;
    wx.showLoading({
      title: '正在申请文件',
    })
    wx.cloud.callFunction({
      name: 'sendmessage', // 上一篇文章中给到的云函数
      data:{
        cate:this.data.tklist[this.data.idx-1].cate,
        url:this.data.tklist[this.data.idx-1].qqurl,
        pass:this.data.tklist[this.data.idx-1].qqpass
      },
      complete: res => {
        console.log("sendMessageByCloud():",res);
        wx.hideLoading();
      }
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