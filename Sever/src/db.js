// db.js
const mysql = require('mysql');

const db = mysql.createConnection({
 
  host: 'localhost',
  user: 'root',
  password: '', // Ensure your password is correct
  database: 'capstone_project'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    process.exit(1); // Exit the process with a failure code
  }
  console.log('Connected to database.');
});

module.exports = db;
