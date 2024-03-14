const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// 创建 MySQL 数据库连接池
const pool = mysql.createPool({
    connectionLimit: 10,
    host: '174.243243.154',
    user: 'nuclearreactor',
    password: 'dfufei6340',
    database: 'ChatDatabase'
});

// 解析 application/json 格式的请求体
app.use(bodyParser.json());

// 处理用户注册请求
app.post('/register', (req, res) => {
    const { email, password } = req.body;

    pool.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], (error, results) => {
        if (error) {
            console.error('Error registering user:', error);
            res.status(500).send('Failed to register user.');
            return;
        }
        res.status(200).send('User registered successfully.');
    });
});

// 处理用户登录请求
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    pool.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (error, results) => {
        if (error) {
            console.error('Error logging in:', error);
            res.status(500).send('Failed to log in.');
            return;
        }
        if (results.length > 0) {
            res.status(200).send('Login successful.');
        } else {
            res.status(401).send('Invalid email or password.');
        }
    });
});

// 处理发帖请求
app.post('/posts', (req, res) => {
    const { content, author } = req.body;

    pool.query('INSERT INTO posts (content, author) VALUES (?, ?)', [content, author], (error, results) => {
        if (error) {
            console.error('Error creating post:', error);
            res.status(500).send('Failed to create post.');
            return;
        }
        res.status(200).send('Post created successfully.');
    });
});

// 监听端口
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
