// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const subjectinfo=await db.collection("subjectinfo").where({
    sname: db.RegExp({
      regexp: '.*' + event.sname + '.*',
      options: 'i'
    })
  }).get()

  const subjectitems = await db.collection("subjectitem").where({
    sname: db.RegExp({
      regexp: '.*' + event.sname + '.*',
      options: 'i'
    })
  }).orderBy('scode', 'asc').get()

  return {
    subjectinfo,
    subjectitems
  }
}