// kitchen_duty.js

const express = require('express');
const router = express.Router();
const db = require('./db'); // Adjust the path as necessary

// Route to fetch all kitchen duty data
router.get('/', (req, res) => {
    const query = 'SELECT * FROM kitchen_duty';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching kitchen duty data:', err);
            return res.status(500).json({ error: 'Database fetch failed' });
        }

        res.json(results);
    });
});

// Route to add new kitchen duty data
router.post('/', (req, res) => {
    const {
        firstStudentName, secondStudentName, thirdStudentName,
        fourthStudentName, fiveStudentName,
        firstStudentID, secondStudentID, thirdStudentID,
        fourthStudentID, fivethStudentID
    } = req.body;

    const query = `
        INSERT INTO kitchen_duty 
        (firstStudentName, secondStudentName, thirdStudentName, fourthStudentName, fiveStudentName,
        firstStudentID, secondStudentID, thirdStudentID, fourthStudentID, fivethStudentID)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [
        firstStudentName, secondStudentName, thirdStudentName,
        fourthStudentName, fiveStudentName,
        firstStudentID, secondStudentID, thirdStudentID,
        fourthStudentID, fivethStudentID
    ], (err, results) => {
        if (err) {
            console.error('Error inserting kitchen duty:', err);
            return res.status(500).json({ error: 'Database insertion failed' });
        }

        res.status(201).json({ message: 'Kitchen duty data saved successfully', results });
    });
});

// Route to delete a specific kitchen duty data entry
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM kitchen_duty WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error deleting kitchen duty data:', err);
            return res.status(500).json({ error: 'Database deletion failed' });
        }

        res.status(200).json({ message: 'Kitchen duty data deleted successfully' });
    });
});

module.exports = router;
