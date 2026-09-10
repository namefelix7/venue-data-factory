/**
 * 数据工厂入口
 * 支持两种模式：
 * 1. 单次抓取：node index.js
 * 2. 定时运行：node index.js --watch
 */

const cron = require('node-cron');
const { main } = require('./crawl');
const { startServer } = require('./server');

const MODE = process.argv[2] || 'crawl';

if (MODE === 'server') {
  // 启动 HTTP 服务器模式
  startServer(3000);
} else if (MODE === 'watch') {
  // 定时抓取模式：每天凌晨 3 点执行
  cron.schedule('0 3 * * *', () => {
    console.log('\n⏰ 定时抓取任务开始...');
    main().catch(console.error);
  });
  console.log('⏰ 定时任务已启动：每天凌晨 3 点自动抓取');
  console.log('💡 提示：可以通过 POST /api/crawl 手动触发');
} else {
  // 单次抓取模式
  console.log('🚀 开始抓取活动数据...\n');
  main().then(() => {
    console.log('\n✅ 抓取完成！');
  }).catch(console.error);
}
