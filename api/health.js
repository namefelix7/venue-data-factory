/**
 * Vercel Serverless Function
 * 健康检查：/api/health
 */

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  res.status(200).json({
    status: 'ok',
    message: '数据工厂运行中',
    timestamp: new Date().toISOString()
  });
}
