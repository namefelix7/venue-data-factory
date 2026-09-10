# Data Factory - 场馆活动数据工厂

一个自动抓取各场馆公开活动信息的「数据工厂」。

## 🚀 快速开始

### 本地开发
```bash
npm install
node index.js
```

### 部署到 Vercel
```bash
vercel --prod
```

## 📁 文件说明

| 文件 | 作用 |
|---|---|
| `api/activities.js` | API 接口（Vercel Serverless） |
| `api/health.js` | 健康检查接口 |
| `crawl.js` | 爬虫代码（抓取逻辑） |
| `index.js` | 本地运行入口 |
| `package.json` | 依赖配置 |

## 🔧 添加新场馆

在 `crawl.js` 里添加一个新的抓取函数：

```javascript
async function crawlNewVenue() {
  // 你的抓取逻辑
  return activities;
}
```

然后在 `main()` 里调用它。

## 📊 数据格式

```json
{
  "activities": [...],
  "count": 10,
  "lastUpdate": "2026-07-14T10:00:00.000Z"
}
```

## ⚠️ 合规提醒

只能抓取**公开展示**的信息，不能：
- 破解对方小程序的内部接口
- 高频请求（会被封 IP）
- 抓取需要登录才能看的内容

建议先联系对方馆方，申请官方数据接口或授权。
