# HelloWorld 网站（Node.js）

我的第一个 AI 开发的网站。

## 项目结构

```
hello-world-site/
├── package.json   # 项目配置与启动脚本
├── server.js      # Node.js 服务器（零依赖，内置 http 模块）
├── index.html     # 页面模板（含服务器时间占位符）
└── README.md      # 本说明文件
```

## 运行步骤

```bash
cd hello-world-site

# 方式一：npm 启动（推荐）
npm start

# 方式二：直接运行
node server.js
```

启动后浏览器访问：<http://localhost:3000>

## 修改你的名字

打开 `server.js`，把第 8 行的 `MY_NAME` 改成你的名字即可，保存后刷新页面生效：

```js
const MY_NAME = '你的名字';
```

## 接口说明

| 路径          | 说明                     |
|---------------|--------------------------|
| `/`           | 主页，显示问候语和服务器时间 |
| `/api/time`   | 返回服务器当前时间（JSON）  |
