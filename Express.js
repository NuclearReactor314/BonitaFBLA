const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3000;

// 创建数据库连接
const connection = mysql.createConnection({
  host: '76.168.46.4',      // 数据库主机名（手机的 IP 地址）
  user: 'nuclearreactor',   // 数据库用户名
  password: 'dfufei6340',   // 数据库密码
  database: 'ChatDatabase'  // 数据库名称
});

// 连接到数据库
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database as id ' + connection.threadId);
});

// 提供 HTML 文件
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 创建 API 端点来获取帖子数据
app.get('/posts', (req, res) => {
  // 查询数据库获取所有帖子
  connection.query('SELECT * FROM posts', (err, results) => {
    if (err) {
      console.error('Error querying database: ' + err.stack);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
