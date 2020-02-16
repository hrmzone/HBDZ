// 根据关键词，在subjectinfo表中模糊查询专业目录
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const list = await db.collection('subjectinfo').where({
    stitle: db.RegExp({
      regexp: '.*' + event.value + '.*',
      options: 'i'
    })
  }).orderBy('sid', 'desc').get()

  return {
    list
  }
}