// user_register.js
const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./db'); // Assuming db.js exports the database connection

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  // Check if the email already exists
  const checkEmailSql = 'SELECT * FROM users WHERE email = ?';
  db.query(checkEmailSql, [email], async (err, results) => {
    if (err) {
      console.error('Error checking email:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length > 0) {
      // Email already exists
      return res.status(400).json({ message: 'Email already registered' });
    }

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the new user into the database
      const insertUserSql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      db.query(insertUserSql, [username, email, hashedPassword], (err, result) => {
        if (err) {
          console.error('Error inserting user into database:', err);
          return res.status(500).json({ message: 'Internal server error' });
        }

        res.status(201).json({ message: 'User registered successfully' });
      });
    } catch (error) {
      console.error('Error in signup process:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
});

module.exports = router;
