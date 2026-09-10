# 🏭 场馆活动数据工厂 - 使用说明

## 这个项目是干嘛的？

就像一个小工厂：
- **输入**：各场馆官网的公开活动信息
- **加工**：自动抓取、整理成统一格式
- **输出**：一个 API 地址，你的小程序可以随时读取

---

## 📋 当前状态

✅ **已完成：**
- 数据工厂的框架代码
- API 服务器（提供 `/api/activities` 接口）
- 部署配置（Vercel）
- 小程序的网关代码（已经支持远程数据）

⚠️ **还需要你做：**
- 创建 GitHub 仓库并上传代码
- 部署到 Vercel
- **填写真实的爬虫逻辑**（需要对方网站的具体信息）

---

## 🚀 快速开始（3 步）

### 第 1 步：创建 GitHub 仓库

1. 打开 https://github.com/new
2. 仓库名：`venue-data-factory`
3. 勾选「Initialize with README」
4. 点「Create」
5. 复制仓库地址（长这样：`https://github.com/你的用户名/venue-data-factory.git`）

### 第 2 步：上传代码

打开终端（Terminal），依次运行：

```bash
cd "/Users/felix7/LF/deepseek harnees/蹲蹲狗/data-factory"
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/你的用户名/venue-data-factory.git
git push -u origin main
```

### 第 3 步：部署到 Vercel

1. 打开 https://vercel.com，用 GitHub 登录
2. 点「Add New...」→「Project」
3. 找到 `venue-data-factory`，点「Import」
4. 点「Deploy」
5. 等待成功后，复制给你的地址（比如 `https://venue-data-factory-xxx.vercel.app`）

---

## ⚙️ 配置小程序

### 1. 更新配置

打开 `miniprogram/config.js`，填入你的 Vercel 地址：

```js
REMOTE_API_URL: 'https://你的地址.vercel.app/api/activities',
```

### 2. 微信后台登记域名

1. 登录 https://mp.weixin.qq.com
2. 开发管理 → 开发设置 → 服务器域名
3. 在「request 合法域名」添加：
   ```
   https://你的地址.vercel.app
   ```

---

## 🔧 下一步：写真正的爬虫

现在爬虫代码还是模板，需要根据实际的网站结构来写。

**请告诉我：**
1. 云上浙博的官网活动页面 URL 是什么？
2. 灵展文旅的官网或活动页面 URL 是什么？

有了 URL，我就能帮你写出真正能抓取数据的代码！

---

## 💡 备选方案：先手动录入

如果对方网站不好抓，我们可以先手动录入一些真实数据，让小程序跑起来。

你只需要：
1. 打开对方的活动页面
2. 复制活动标题、时间、价格等信息
3. 我帮你整理成标准格式
4. 存入 `data/activities.json`

这样小程序就能显示真实数据了，后续再慢慢做自动化。

---

**你想先走哪条路？**
- A：给我官网 URL，我帮你写爬虫
- B：先手动录入一些数据，让小程序跑起来
