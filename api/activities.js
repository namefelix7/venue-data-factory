/**
 * API 入口
 */
const fs = require('fs');
const path = require('path');

// 数据文件路径（使用绝对路径）
const DATA_FILE = path.resolve(__dirname, '..', 'data', 'activities.json');

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
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
