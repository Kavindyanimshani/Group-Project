const express = require('express');
const router = express.Router();
const db = require('./db'); // assuming you have a db.js file for database connection

// Get all courses
router.get('/courses', (req, res) => {
    const query = 'SELECT * FROM lectuers';

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json(results);
    });
});

module.exports = router;
