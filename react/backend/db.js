const mysql = require('mysql');

// MySQL database connection configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'lakshithajayathilaka'
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Function to execute SQL queries
const executeQuery = (sql, params, callback) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database: ', err);
      callback(err, null);
      return;
    }
    connection.query(sql, params, (queryErr, result) => {
      connection.release();
      if (queryErr) {
        console.error('Error executing query: ', queryErr);
        callback(queryErr, null);
        return;
      }
      callback(null, result);
    });
  });
};

module.exports = {
  executeQuery
};
