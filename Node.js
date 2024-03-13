const mysql = require('mysql');

// 创建数据库连接
const connection = mysql.createConnection({
  host: 'localhost',      // 数据库主机名
  user: 'nuclearreactor',  // 数据库用户名
  password: 'dfufei6340', // 数据库密码
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

// 在数据库上执行查询
connection.query('SELECT * FROM your_table', (err, results, fields) => {
  if (err) throw err;
  console.log('Query results:', results);
});

// 在关闭连接时进行清理
connection.end((err) => {
  if (err) {
    console.error('Error closing database connection: ' + err.stack);
    return;
  }
  console.log('Database connection closed.');
});
