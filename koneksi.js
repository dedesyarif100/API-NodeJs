var mysql = require('mysql');

const conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'api-nodejs',
    port: 43306
});

conn.connect((err) => {
    if (err) throw err;
    console.log('Connected');
});

module.exports = conn;