// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const dzscore=await db.collection("dzscore").orderBy("name","asc").get()
  const tkscore=await db.collection("tkscore").orderBy("name","asc").get()

  return {
    dzscore,
    tkscore
  }
}