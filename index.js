// 简单版 API - 直接返回数据
const activities = [];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  res.json({
    activities,
    count: 0,
    lastUpdate: null,
    source: 'venue-data-factory'
  });
}
