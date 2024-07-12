// Import mysql
const mysql = require('mysql');

// Membuat connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_lobster'
});
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
});


//eksport untuk digunakan difile lain
module.exports = connection;