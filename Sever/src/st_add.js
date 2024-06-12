const express = require('express');
const router = express.Router();
const db = require('./db'); // Import the db connection from db.js

router.post('/students', (req, res) => {
    const { first_name, last_name, gender, age, email, phone_number, course_name, other_info, student_id, password } = req.body;

    const sql = "INSERT INTO students (firstName, lastName, gender, age, email, phoneNumber, courseName, otherInfo, studentId, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [first_name, last_name, gender, age, email, phone_number, course_name, other_info, student_id, password];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Database Error:', err);
            res.status(500).json({ error: 'Database Error: ' + err.message });
            return;
        }
        console.log('Received student data:', req.body);
        console.log('Inserted student with ID:', result.insertId);
        res.status(200).json({ message: 'Student added successfully', studentId: result.insertId });
    });
});

module.exports = router;
