/**
 * 数据工厂服务器
 * 提供活动数据的 API 接口
 * 
 * 启动方式：
 *   node server.js
 * 
 * 访问地址：
 *   http://localhost:3000/api/activities.json
 *   http://localhost:3000/health
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 静态文件服务
app.use(cors());
app.use(express.json());

// 数据路径
const DATA_FILE = path.join(__dirname, 'data', 'activities.json');

/**
 * 读取活动数据
 */
function getActivities() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
      return { data, lastUpdate: fs.statSync(DATA_FILE).mtime };
    }
  } catch (error) {
    console.error('读取数据文件失败:', error);
  }
  return { data: [], lastUpdate: null };
}

/**
 * API: 获取所有活动
 */
app.get('/api/activities', (req, res) => {
  const { data, lastUpdate } = getActivities();
  res.json({
    activities: data,
    count: data.length,
    lastUpdate: lastUpdate ? lastUpdate.toISOString() : null,
    source: 'venue-data-factory'
  });
});

/**
 * API: 健康检查
 */
app.get('/health', (req, res) => {
  const { data, lastUpdate } = getActivities();
  res.json({
    status: 'ok',
    activityCount: data.length,
    lastUpdate: lastUpdate ? lastUpdate.toISOString() : null
  });
});

/**
 * API: 手动触发抓取
 */
app.post('/api/crawl', async (req, res) => {
  try {
    res.json({ message: '抓取任务已提交，请查看日志' });
    // 异步执行抓取，不阻塞响应
    const { main } = require('./crawl');
    main().catch(err => console.error('抓取失败:', err));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 数据工厂服务器已启动`);
  console.log(`📍 活动 API: http://localhost:${PORT}/api/activities`);
  console.log(`💚 健康检查: http://localhost:${PORT}/health`);
});
