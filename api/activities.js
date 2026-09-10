// Vercel Serverless Function - 直接返回数据
// 注意：在 Vercel 中，我们直接内嵌数据，不读取外部文件

const ACTIVITIES = []; // 数据放在这里，或从环境变量读取

export default async function handler(req, res) {
  // CORS 允许跨域
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 返回数据
  res.json({
    activities: ACTIVITIES,
    count: ACTIVITIES.length,
    lastUpdate: new Date().toISOString(),
    source: 'venue-data-factory'
  });
}
