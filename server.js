// ============================================================
// server.js —— HelloWorld 网站服务器（零依赖，仅用 Node 内置模块）
// 运行：npm start  （或直接 node server.js）
// ============================================================

const http = require('http');
const fs = require('fs');
const path = require('path');

// 在这里改成你自己的名字即可
const MY_NAME = '【你的名字】';

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// 读取 HTML 模板（每次请求时读取，方便改完刷新即生效）
const htmlPath = path.join(__dirname, 'index.html');

// 生成带服务器时间的页面 HTML
function renderPage() {
  const now = new Date();
  // 服务器当前时间，格式：2026-09-28 15:30:00 (UTC+8)
  const serverTime = formatTime(now);
  let html = fs.readFileSync(htmlPath, 'utf8');
  // 把模板中的两个占位符替换成真实内容
  html = html.replaceAll('{{MY_NAME}}', MY_NAME);
  html = html.replaceAll('{{SERVER_TIME}}', serverTime);
  return html;
}

// 格式化服务器时间为本地可读字符串
function formatTime(date) {
  const pad = (n) => String(n).padStart(2, '0');
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
    `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
  );
}

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0]; // 去掉查询参数

  // 接口：返回服务器当前时间（JSON），供页面定时刷新
  if (url === '/api/time') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ serverTime: formatTime(new Date()) }));
    return;
  }

  // 页面：返回渲染好的 HTML
  if (url === '/' || url === '/index.html') {
    try {
      const html = renderPage();
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('服务器内部错误：' + err.message);
    }
    return;
  }

  // 其他路径：404
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('404 Not Found');
});

// 启动服务器
server.listen(PORT, HOST, () => {
  console.log(`✅ HelloWorld 网站已启动`);
  console.log(`   浏览器访问: http://localhost:${PORT}`);
  console.log(`   时间接口:   http://localhost:${PORT}/api/time`);
});
