const mysql = require('mysql');

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

// 查询帖子和回帖
connection.query('SELECT * FROM posts', (err, results, fields) => {
  if (err) {
    console.error('Error querying database: ' + err.stack);
    return;
  }
  console.log('Posts:', results);
  // 在这里处理结果，例如将结果发送到前端显示
});

// 关闭数据库连接
connection.end((err) => {
  if (err) {
    console.error('Error closing database connection: ' + err.stack);
    return;
  }
  console.log('Database connection closed.');
});

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: '76.168.46.4',
    user: 'nuclearreactor',
    password: 'dfufei6340',
    database: 'ChatDatabase'
});

app.post('/posts', (req, res) => {
    const { content, author } = req.body;

    const sql = 'INSERT INTO posts (content, author) VALUES (?, ?)';
    connection.query(sql, [content, author], (err, result) => {
        if (err) {
            console.error('Error inserting post into database:', err);
            res.status(500).send('Error inserting post into database');
            return;
        }
        console.log('Post inserted into database:', result);
        res.status(200).send('Post inserted into database');
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

node server.js
