const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db'); // Ensure this path is correct for your db module

const app = express();

// Use the cors middleware
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json

// Endpoint to add a new course
app.post('/api/courses', (req, res) => {
    const {
        courseId,
        courseName,
        moduleCoordinatorName,
        coordinatorPhoneNumber,
        noOfStudent,
        courseDuration,
        descriptionOfCourse
    } = req.body;

    const sql = "INSERT INTO course (CourseID, CourseName, CourseCoordinator, PhoneNumber, NoOfStudents, CourseDuration, DescriptionOfCourse) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [
        courseId,
        courseName,
        moduleCoordinatorName,
        coordinatorPhoneNumber,
        noOfStudent,
        courseDuration,
        descriptionOfCourse
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Database Error:', err);
            res.status(500).json({ error: 'Database Error: ' + err.message });
            return;
        }
        res.status(200).json({ message: 'Course added successfully', courseId: result.insertId });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
