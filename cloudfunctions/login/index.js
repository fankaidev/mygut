const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext();

  // 检查用户是否存在
  const users = db.collection("users");
  const { data } = await users.where({ _id: OPENID }).get();

  if (data.length === 0) {
    // 新用户，创建记录
    await users.add({
      data: {
        _id: OPENID,
        createdAt: new Date(),
      },
    });
  }

  return { openid: OPENID };
};
