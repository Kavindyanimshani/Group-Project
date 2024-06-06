const express = require('express');
const router = express.Router();
const db = require('./db'); // Assuming your database connection is in db.js

// Route to fetch students from the database
router.get('/students', (req, res) => {
  const sql = 'SELECT * FROM students';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching students:', err);
      res.status(500).json({ error: 'Error fetching students' });
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
