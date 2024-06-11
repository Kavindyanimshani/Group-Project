// add_work.js
const express = require('express');
const router = express.Router();
const pool = require('./db'); // Assuming you are using a MySQL or PostgreSQL pool

// Endpoint to add work
router.post('/add_work', (req, res) => {
    const { StudentID, Place } = req.body;

    const query = 'INSERT INTO add_work (StudentID, Place) VALUES (?, ?)';
    pool.query(query, [StudentID, Place], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Work added successfully', id: result.insertId });
    });
});

// Endpoint to get students without assigned work
router.get('/unmatched_students', (req, res) => {
    const query = `
        SELECT s.*
        FROM students s
        LEFT JOIN add_work aw ON s.studentId = aw.StudentID
        WHERE aw.StudentID IS NULL
    `;

    pool.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});

module.exports = router;
