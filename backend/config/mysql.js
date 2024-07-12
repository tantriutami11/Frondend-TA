// Import mysql
const mysql = require('mysql');

// Membuat connection
const connection = mysql.createConnection({
    host: '153.92.11.219',
    user: 'u537584813_tantri',
    password: 'Manaloe11.',
    database: 'u537584813_db_lobster'
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