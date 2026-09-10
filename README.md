# 🏭 场馆活动数据工厂

自动抓取各场馆公开活动信息的「数据工厂」。

## 🎯 这个项目是干嘛的？

简单说：**帮你自动把其他场馆的活动信息「抄」过来，放到你自己的小程序里显示。**

就像你有一个记事本（小程序），但这个工厂会自动帮你把别人公告栏上的新消息抄到你的本子里。

---

## 🚀 快速开始

### 第 1 步：安装依赖
```bash
npm install
```

### 第 2 步：运行抓取
```bash
# 抓取一次
node index.js

# 或者启动服务器（提供 API）
node server.js
```

### 第 3 步：部署到 Vercel（免费）
```bash
# 安装 Vercel CLI
npm install -g vercel

# 部署
vercel --prod
```

部署后会给你一个地址，比如：
```
https://venue-data-factory-xxx.vercel.app
```

把这个地址填到小程序的 `config.js` 里：
```js
REMOTE_API_URL: 'https://venue-data-factory-xxx.vercel.app/api/activities'
```

---

## 📁 文件说明

| 文件 | 作用 |
|---|---|
| `crawl.js` | 爬虫代码（去对方网站抄数据） |
| `server.js` | 服务器代码（提供 API 接口） |
| `index.js` | 入口文件（支持定时任务） |
| `package.json` | 依赖配置 |
| `data/activities.json` | 抓取到的活动数据（自动生成） |

---

## ⚙️ 配置说明

### 修改抓取逻辑

打开 `crawl.js`，找到对应的函数：

```javascript
async function crawlZM() {
  // 在这里修改抓取逻辑
  // 1. 替换 URL 为真实的公开页面地址
  // 2. 根据页面结构调整选择器（用 cheerio 解析）
}
```

### 添加新场馆

复制一个函数，改个名字，加到 `main()` 里：

```javascript
async function crawlNewVenue() {
  // 新场馆的抓取逻辑
}

// 在 main() 里添加
const [zm, lc, lzxw, newVenue] = await Promise.all([
  crawlZM(),
  crawlLC(),
  crawlLZXW(),
  crawlNewVenue()  // ← 添加这一行
]);
```

---

## 🔒 合规提醒

**重要：只能抓取公开展示的信息！**

- ✅ 可以：访问对方官网的公开活动页面
- ✅ 可以：解析对方公众号文章里的公开排期
- ❌ 不可以：破解对方小程序的内部接口
- ❌ 不可以：高频请求（会被封 IP）
- ❌ 不可以：抓取需要登录才能看的内容

**建议：** 在抓取前，先联系对方馆方，询问是否提供数据接口或授权。

---

## 📊 数据格式

抓取到的数据格式如下：

```json
[
  {
    "id": "zm-001",
    "sourceCode": "zm",
    "venueName": "浙江省博物馆",
    "title": "宋韵江南——馆藏宋版古籍与书画特展",
    "type": "exhibition",
    "tags": ["特展", "宋代", "免费"],
    "desc": "汇集馆藏 120 余件宋版古籍善本...",
    "address": "杭州市西湖区之江路 275 号",
    "startTime": "2026-07-14",
    "endTime": "2026-10-12",
    "timeLabel": "09:00-17:00",
    "price": "免费（需预约）",
    "bookable": true,
    "ticketing": {
      "releaseAt": "2026-07-17 09:00",
      "channel": "云上浙博小程序",
      "note": "每周五 09:00 放票"
    },
    "schedule": [
      { "date": "2026-07-19", "time": "10:00" }
    ]
  }
]
```

---

## 🤝 合作建议

如果你们想长期合作，可以向对方申请：
1. **官方数据接口**（最稳定）
2. **RSS/Atom 订阅**（如果有）
3. **定期导出的 Excel/CSV**（人工维护）

这样比爬虫更可靠，也不会违反对方的规则。
