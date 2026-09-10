// Vercel API - 直接返回 JSON
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({
    activities: [],
    count: 0,
    lastUpdate: new Date().toISOString(),
    source: 'venue-data-factory'
  });
}
