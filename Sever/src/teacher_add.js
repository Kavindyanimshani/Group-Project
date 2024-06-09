const express = require('express');
const router = express.Router();
const db = require('./db');

// Add a new teacher
router.post('/teachers', (req, res) => {
    const { lectureId, name, module, contactNumber, email, gender, password } = req.body;

    const query = `
        INSERT INTO teachers (LecturerID, LecturerName, Module, ContactNumber, Email, Gender, Password) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [lectureId, name, module, contactNumber, email, gender, password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Teacher added successfully', result });
    });
});

module.exports = router;
