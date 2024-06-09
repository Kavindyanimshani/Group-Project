// course_add.js

const express = require('express');
const router = express.Router();
const db = require('./db');

router.post('/courses', (req, res) => { // Change the route path to '/'
    const {
        courseId, courseName, moduleCoordinatorName, coordinatorPhoneNumber, noOfStudent, courseDuration, descriptionOfCourse
    } = req.body;

    const sql = "INSERT INTO course (CourseID, CourseName, CourseCoordinator, PhoneNumber, NoOfStudents, CourseDuration, DescriptionOfCourse) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [ courseId,  courseName,  moduleCoordinatorName,  coordinatorPhoneNumber, noOfStudent, courseDuration, descriptionOfCourse ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Database Error:', err);
            res.status(500).json({ error: 'Database Error: ' + err.message });
            return;
        }
        res.status(200).json({ message: 'Course added successfully', courseId: result.insertId });
    });
});

module.exports = router;
