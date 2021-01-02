// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'college-lah60',
})

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.subscribeMessage.send({
      
      touser: cloud.getWXContext().OPENID, // 通过 getWXContext 获取 OPENID
      lang: 'zh_CN',
      page: 'pages/subject/subject',
      data: {
        thing2: {
          value: event.cate
        },
        character_string3: {
          value: event.url
        },
        character_string4: {
          value: event.pass
        }
      },
      templateId: '5uQ5M5TgBz1aZ5f-KZ8j5yU7l6ALwk3rSt9-zQx6IFQ'
    })
    console.log(result)
    // result 结构
    // { errCode: 0, errMsg: 'openapi.templateMessage.send:ok' }
    return result
  } catch (err) {
    // 错误处理
    // err.errCode !== 0
    throw err
  }
}