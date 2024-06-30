const express = require('express');
const router = express.Router();
const pool = require('./db'); // Assuming you are using a MySQL or PostgreSQL pool

// Endpoint to add work
router.post('/add_work', (req, res) => {
    const { StudentID, Place } = req.body;

    const query = 'INSERT INTO add_work (StudentID, Place) VALUES (?, ?)';
    pool.query(query, [StudentID, Place], (err, result) => {
        if (err) {
            console.error(err);
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
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});

// Endpoint to get assigned work
router.get('/assigned_work', (req, res) => {
    const query = `
        SELECT aw.*, s.firstName, s.lastName
        FROM add_work aw
        JOIN students s ON aw.StudentID = s.studentId
    `;

    pool.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});

// Endpoint to update assigned work
router.put('/update_work/:id', (req, res) => {
    const { id } = req.params;
    const { StudentID, Place } = req.body;

    const query = 'UPDATE add_work SET StudentID = ?, Place = ? WHERE id = ?';
    pool.query(query, [StudentID, Place, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Work updated successfully' });
    });
});


// Endpoint to get a single work by ID
router.get('/work/:id', (req, res) => {
    const { id } = req.params;

    const query = 'SELECT * FROM add_work WHERE id = ?';
    pool.query(query, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results[0]);
    });
});

module.exports = router;
