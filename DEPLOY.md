# 🏭 场馆活动数据工厂 - 部署指南

这个项目是一个「数据工厂」，会自动从各场馆官网抓取公开活动信息，然后通过 API 提供给你的小程序使用。

---

## 🚀 第一步：创建 GitHub 仓库

1. 打开 https://github.com/new
2. 填写：
   - **Repository name**: `venue-data-factory`
   - **Description**: 场馆活动数据自动抓取工厂
   - **Public**（公开，方便 Vercel 部署）
3. 勾选「Initialize this repository with a README」
4. 点「Create repository」
5. 复制仓库地址（比如 `https://github.com/你的名字/venue-data-factory.git`）

---

## 📤 第二步：上传代码到 GitHub

在你的电脑上打开终端（Terminal），依次执行：

```bash
# 进入项目目录
cd "/Users/felix7/LF/deepseek harnees/蹲蹲狗/data-factory"

# 初始化 Git
git init
git add .
git commit -m "Initial commit: 数据工厂代码"

# 关联远程仓库（把下面的 URL 换成你自己的）
git remote add origin https://github.com/你的名字/venue-data-factory.git

# 上传代码
git push -u origin main
```

---

## ☁️ 第三步：部署到 Vercel（免费）

### 方法 A：一键部署（推荐）

1. 打开 https://vercel.com
2. 用 GitHub 账号登录
3. 点「Add New...」→「Project」
4. 找到 `venue-data-factory` 仓库，点「Import」
5. 点「Deploy」
6. 等几分钟，Vercel 会给你一个地址，比如：
   ```
   https://venue-data-factory-xxx.vercel.app
   ```

### 方法 B：命令行部署

```bash
# 安装 Vercel CLI
npm install -g vercel

# 进入项目目录
cd "/Users/felix7/LF/deepseek harnees/蹲蹲狗/data-factory"

# 部署
vercel --prod
```

---

## ⚙️ 第四步：配置小程序

### 1. 更新配置文件

打开项目里的 `miniprogram/config.js`，把 API 地址填上：

```js
REMOTE_API_URL: 'https://你的地址.vercel.app/api/activities',
```

### 2. 在微信后台登记域名

1. 登录 https://mp.weixin.qq.com
2. 进入你的小程序后台
3. 找到「开发管理」→「开发设置」
4. 向下滚动，找到「服务器域名」
5. 在「request 合法域名」里添加：
   ```
   https://你的地址.vercel.app
   ```
6. 点「保存」

---

## 🧪 第五步：测试

### 1. 本地测试数据工厂

```bash
cd data-factory
npm install
node index.js
```

应该看到：
```
🏛 正在抓取云上浙博...
🌱 正在抓取低碳科技馆...
🎫 正在抓取灵展文旅...
✅ 数据已保存到 data/activities.json
📊 共抓取 0 个活动
```

### 2. 在小程序里测试

1. 打开微信开发者工具
2. 点「编译」
3. 首页下拉刷新，看看能不能拉到数据

---

## 🔧 常见问题

### Q: 为什么抓取到 0 个活动？

A: 因为爬虫代码还是模板，需要根据实际网站结构调整。

**解决方法：**
1. 打开对方官网的活动页面
2. 右键 →「检查」→ 找到活动标题、时间等元素
3. 修改 `crawl.js` 里的选择器（参考 Cheerio 文档）

### Q: 如何添加新场馆？

A: 在 `crawl.js` 里复制一个函数，改个名字，加到 `main()` 里：

```javascript
async function crawlNewVenue() {
  // 新场馆的抓取逻辑
  return activities;
}

// 在 main() 里添加
const [..., newVenue] = await Promise.all([
  crawlZM(),
  crawlLC(),
  crawlLZXW(),
  crawlNewVenue()  // ← 加这里
]);
```

### Q: 怎么让它每天自动更新？

A: 部署到 Vercel 后，在「Settings」→「Git」里开启自动部署，或者用 Vercel Cron Jobs（需要 Pro 版）。

免费版可以用「Uptime Robot」监控，每 5 分钟访问一次 `/health` 接口触发更新。

---

## 📝 下一步

这个数据工厂的框架已经搭好了，但**爬虫的具体逻辑需要根据实际网站结构来写**。

你可以：
1. 把对方网站的 URL 告诉我，我帮你写具体的爬虫代码
2. 或者你自己研究一下网站结构，参考 `crawl.js` 里的模板自己写

有什么不懂的随时问我！
