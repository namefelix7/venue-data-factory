/**
 * Vercel Serverless Function
 * API 入口：/api/activities
 */

const fs = require('fs');
const path = require('path');

// 数据文件路径
const DATA_FILE = path.join(process.cwd(), 'data', 'activities.json');

/**
 * GET /api/activities - 获取所有活动
 */
export default async function handler(req, res) {
  // 允许跨域
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // 读取数据
    let activities = [];
    let lastUpdate = null;

    if (fs.existsSync(DATA_FILE)) {
      const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
      activities = data;
      lastUpdate = fs.statSync(DATA_FILE).mtime.toISOString();
    }

    res.status(200).json({
      activities,
      count: activities.length,
      lastUpdate,
      source: 'venue-data-factory'
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
}
