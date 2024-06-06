const express = require('express');
const router = express.Router();
const db = require('./db'); // Assuming your database connection is in db.js

router.post('/students', (req, res) => {
    const { firstName, lastName, gender, age, email, phoneNumber, courseName, otherInfo, studentId, password } = req.body;

    if (!firstName || !lastName || !gender || !age || !email || !phoneNumber || !courseName || !studentId || !password) {
        console.error('Validation Error: All fields are required');
        return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = 'INSERT INTO students (first_name, last_name, gender, age, email, phone_number, course_name, other_info, student_id, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [firstName, lastName, gender, age, email, phoneNumber, courseName, otherInfo, studentId, password], (err, result) => {
        if (err) {
            console.error('Database Error:', err);
            return res.status(500).json({ error: 'Error inserting student' });
        }
        res.json({ message: 'Student added successfully', studentId: result.insertId });
    });
});

module.exports = router;
