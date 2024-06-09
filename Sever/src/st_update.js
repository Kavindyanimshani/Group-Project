const express = require('express');
const router = express.Router();
const db = require('./db'); // Make sure db.js is correctly configured to connect to your database

// Update student information
router.put('/students/:studentId', (req, res) => {
    const studentId = req.params.studentId;
    const { firstName, lastName, gender, age, email, phoneNumber, courseName, password } = req.body;

    const query = `
        UPDATE students 
        SET 
            first_name = ?, 
            last_name = ?, 
            gender = ?, 
            age = ?, 
            email = ?, 
            phone_number = ?, 
            course_name = ?, 
            password = ?
        WHERE student_id = ?
    `;

    db.query(query, [firstName, lastName, gender, age, email, phoneNumber, courseName, password, studentId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Student updated successfully', result });
    });
});

module.exports = router;
