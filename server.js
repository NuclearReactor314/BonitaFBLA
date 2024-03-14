const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// 创建数据库连接池
const pool = mysql.createPool({
  connectionLimit: 10,
  host: '76.168.46.4',      // 数据库主机名（手机的 IP 地址）
  user: 'nuclearreactor',   // 数据库用户名
  password: 'dfufei6340',   // 数据库密码
  database: 'ChatDatabase'  // 数据库名称
});

// 解析 JSON 格式的请求体
app.use(express.json());

// 存储新帖子到数据库
app.post('/posts', (req, res) => {
  const { content, author } = req.body;

  if (!content || !author) {
    res.status(400).send('Content and author are required.');
    return;
  }

  pool.query('INSERT INTO posts (content, author) VALUES (?, ?)', [content, author], (err, result) => {
    if (err) {
      console.error('Error inserting post into database:', err.stack);
      res.status(500).send('Error inserting post into database');
      return;
    }
    console.log('New post inserted with ID:', result.insertId);
    res.sendStatus(200);
  });
});

// 查询帖子和回帖
app.get('/posts', (req, res) => {
  pool.query('SELECT * FROM posts', (err, results) => {
    if (err) {
      console.error('Error querying database: ' + err.stack);
      res.status(500).send('Error querying database');
      return;
    }
    console.log('Posts:', results);
    res.json(results); // 将查询结果发送给客户端
  });
});

// 监听端口
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
