// st_edit.js
const express = require('express');
const router = express.Router();
const db = require('./db');

// Update student information
router.put('/students/:studentId', (req, res) => {
    const studentId = req.params.studentId;
    const { firstName, lastName, gender, age, email, phoneNumber, courseName, password } = req.body;

    const query = `
        UPDATE students 
        SET 
            firstName = ?, 
            lastName = ?, 
            gender = ?, 
            age = ?, 
            email = ?, 
            phoneNumber = ?, 
            courseName = ?, 
            password = ?
        WHERE studentId = ?
    `;

    db.query(query, [firstName, lastName, gender, age, email, phoneNumber, courseName, password, studentId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Student updated successfully', result });
    });
});

module.exports = router;
