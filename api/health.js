// 健康检查 API
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({
    status: 'ok',
    message: '数据工厂运行正常',
    timestamp: new Date().toISOString()
  });
}
