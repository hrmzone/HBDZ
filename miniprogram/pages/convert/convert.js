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
    gradeValue1:0,
    gradeValue2:0,
    gradeValue3:0,
    gradeValue4:0,
    score:0,
    course:'物理',
    college:'邢台职业技术学院、石家庄理工职业学院',
    pro:'建设工程管理、建筑设计',
    label1:'',
    label2:'',
    msg:'',
    yscore:130,
    sscore:130,
    zscore:90,

  },

  /**
   * 生命周期函数--监听页面加载
   * 获取转换表数据以及msg第9条广告通知
   */
  onLoad: function (options) {
    const db = wx.cloud.database();
    db.collection("convert").orderBy("id","asc").get().then(
      res=> {
        // console.log(res.data[0].cate)
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
/**
 * 根据学考等级，计算语文成绩
 * @param {*} e 
 */
  onYChange(e) {
    console.log(e.detail)
    // console.log(this.data.convertmap[10])
    let that=this
    // console.log(this.gradeConvert(this.data.convertmap[0],e.detail))
    this.setData({
      yscore:that.gradeConvert(this.data.convertmap[10],e.detail)
    })
    this.calc()
  },

  /**
   * 根据学考等级，计算数学成绩
   * @param {*} e 
   */
  onSChange(e) {
    console.log(e.detail)
    let that=this
    this.setData({
      sscore:that.gradeConvert(this.data.convertmap[11],e.detail)
    })
    this.calc()
  },

  /**
   * 根据单招大类和学考等级，计算专业基础知识成绩
   * @param {*} e 
   */
  onZChange(e) {
    console.log(e.detail)
    // console.log(this.data.convertmap[10])
    let that=this
    // console.log(this.gradeConvert(this.data.convertmap[0],e.detail))
    this.setData({
      zscore:that.gradeConvert(this.data.convertmap[this.data.gradeValue3],e.detail)
    })
    this.calc()
  },

    /**
   * 根据不同考试科目和序号，将等级转换为相应的分数
   * 0->A...3->D
   */
  gradeConvert:function(classCate,grade) {
    if(grade==0) {
      // console.log(classCate.A)
      return classCate.A
    } else if(grade==1) {
      return classCate.B
    } else if(grade==2) {
      return classCate.C
    } else if(grade==3) {
      return classCate.D
    } else {
      return 0
    }
  },

/**
 * 职业技能单招大类选择触发动作函数，将大类信息（考试科目、院校等）填充至变量
 * @param {*} e 
 */
  onCChange(e) {
    console.log(e.detail)
    let that=this
    this.cateConvert(that.data.convertmap[e.detail])
    this.calc()
  },

/**
 * 
 * 根据所选单招考试大类，讲大类考试科目、推荐院校、专业以及label填充相应的值
 * 用于被onCChange方法调用
 */
  cateConvert:function(classCate) {
    console.log(classCate.course,classCate.cate)
    this.setData({
      course:classCate.course,
      college:classCate.college,
      pro:classCate.pro,
      label1:classCate.label1,
      label2:classCate.label2,
      gradeValue3:classCate.id
    })
  },



  /**
   * 计算三个科目总分
   */
  calc:function() {
    let that=this
    console.log(that.data.yscore,that.data.sscore,that.data.zscore)
    this.setData({
      score:that.data.yscore+that.data.sscore+that.data.zscore
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