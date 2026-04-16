const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();
const _ = db.command;

exports.main = async (event) => {
  const { OPENID } = cloud.getWXContext();
  const { startDate, endDate } = event;

  if (!startDate || !endDate) {
    return { error: "startDate and endDate are required" };
  }

  const collection = db.collection("stool_records");
  const MAX_LIMIT = 1000;
  const allData = [];

  // 云函数端单次最多 1000 条，可能需要分页
  let hasMore = true;
  while (hasMore) {
    const { data } = await collection
      .where({
        userId: OPENID,
        deletedAt: _.exists(false),
        date: _.gte(startDate).and(_.lte(endDate)),
      })
      .orderBy("date", "asc")
      .skip(allData.length)
      .limit(MAX_LIMIT)
      .get();

    allData.push(...data);
    hasMore = data.length === MAX_LIMIT;
  }

  // 按日期聚合统计
  const dailyData = {};
  allData.forEach((record) => {
    if (!dailyData[record.date]) {
      dailyData[record.date] = { count: 0, records: [] };
    }
    dailyData[record.date].count += 1;
    dailyData[record.date].records.push({ bristol: record.bristol });
  });

  // 转换为数组格式
  const result = Object.entries(dailyData)
    .map(([date, data]) => ({ date, count: data.count, records: data.records }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return { data: result };
};
