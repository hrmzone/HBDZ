// 云函数入口文件
//根据专业的sid获取专业信息，从subjectinfo、subjectitem连个表中获取数据
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const subjectinfo=await db.collection("subjectinfo").where({
    sid: parseInt(event.sid)
  }).get()

  const subjectitems = await db.collection("subjectitem").where({
    sid: event.sid
  }).orderBy('scode', 'asc').get()

  return {
    subjectinfo,
    subjectitems
  }
}