// miniprogram/pages/convert/convert.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    convertmap:[],
    grade:[
      { text: 'A', value: 0 },
      { text: 'B', value: 1 },
      { text: 'C', value: 2 },
      { text: 'D', value: 3 },
    ],
    titleName:[
      { text: '语文', value: 1 },
      { text: '数学', value: 2 },
      { text: '单招考试大类', value: 3 },
      { text: '学考等级', value: 4 }
    ],
    className:[
      { text: '一类', value: 0 },
      { text: '二类', value: 1 },
      { text: '三类', value: 2 },
      { text: '四类', value: 3 },
      { text: '五类', value: 4 },
      { text: '六类', value: 5 },
      { text: '七类', value: 6 },
      { text: '八类', value: 7 },
      { text: '九类', value: 8 },
      { text: '十类', value: 9 },
    ],
    titleValue1:1,
    titleValue2:2,
    titleValue3:3,
    titleValue4:4,
    gradeValue1:2,
    gradeValue2:2,
    gradeValue3:0,
    gradeValue4:2,
    score:0,
    course:'物理',
    college:'邢台职业技术学院',
    pro:'建设工程管理',
    label1:'',
    label2:'',
    msg:'',
    yscore:0,
    sscore:0,
    zscore:0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database();
    db.collection("convert").orderBy("id","asc").get().then(
      res=> {
        console.log(res.data[0].cate)
        this.setData({
          convertmap:res.data
        })
      }
    )

    db.collection("msg").where({
      id:9
    }).get().then(
      res=>{
        console.log(res.data[0].content)
        this.setData({
          msg: res.data[0].content
        })
      }
    )
  },

  onYChange(e) {
    console.log(e.detail)
    console.log(this.data.convertmap[10])
    this.setData({
      yscore:e.detail
    })
  },
  
  onCChange(e) {

  },

  /**
   * 计算三个科目总分
   */
  calc:function() {
    this.setData({
      score:yscore+sscore+zscore
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