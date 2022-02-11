var mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'api-nodejs',
});

conn.connect((err) => {
    if (err) throw err;
    console.log('Connected');
});

module.exports = conn;