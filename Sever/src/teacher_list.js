// teacher_list.js
const express = require('express');
const router = express.Router();
const db = require('./db'); // Import the database connection

// Route to get all teachers
router.get('/teachers', (req, res) => {
    // Query to select all teachers from the database
    const query = 'SELECT * FROM teachers';
    // Execute the query
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching teachers:', err);
            res.status(500).send('Internal Server Error');
        } else {
            // Send the response with the fetched data
            res.status(200).json(results);
        }
    });
});

module.exports = router;
