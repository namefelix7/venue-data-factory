// Vercel Serverless Function - 单一入口
// 所有请求都走这里

const ACTIVITIES = []; // 数据从这里读取

export default async function handler(req, res) {
  // 允许跨域
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 健康检查
  if (req.url === '/api/health' || req.url === '/health') {
    return res.json({ status: 'ok', message: '数据工厂运行中' });
  }

  // 活动数据
  if (req.url === '/api/activities' || req.url === '/activities') {
    return res.json({
      activities: ACTIVITIES,
      count: ACTIVITIES.length,
      lastUpdate: new Date().toISOString(),
      source: 'venue-data-factory'
    });
  }

  // 404
  res.status(404).json({ error: 'Not found' });
}
