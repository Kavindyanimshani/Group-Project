const express = require('express');
const router = express.Router();
const db = require('./db'); // Ensure this path is correct for your db module

// Endpoint to get stats for admin dashboard
router.get('/stats', (req, res) => {
    let studentCount, teacherCount, courseCount;

    // Query to get the count of students
    db.query('SELECT COUNT(*) AS studentCount FROM students', (err, studentsResult) => {
        if (err) {
            console.error('Error fetching student count:', err.message);
            return res.status(500).json({ error: 'Failed to fetch student count' });
        }
        studentCount = studentsResult[0].studentCount;

        // Query to get the count of teachers
        db.query('SELECT COUNT(*) AS teacherCount FROM teachers', (err, teachersResult) => {
            if (err) {
                console.error('Error fetching teacher count:', err.message);
                return res.status(500).json({ error: 'Failed to fetch teacher count' });
            }
            teacherCount = teachersResult[0].teacherCount;

            // Query to get the count of courses
            db.query('SELECT COUNT(*) AS courseCount FROM course', (err, coursesResult) => {
                if (err) {
                    console.error('Error fetching course count:', err.message);
                    return res.status(500).json({ error: 'Failed to fetch course count' });
                }
                courseCount = coursesResult[0].courseCount;

                // Respond with the counts
                res.status(200).json({
                    students: studentCount,
                    teachers: teacherCount,
                    courses: courseCount
                });
            });
        });
    });
});

// Endpoint to get all student data
router.get('/students', (req, res) => {
    db.query('SELECT * FROM students', (err, results) => {
        if (err) {
            console.error('Error fetching student data:', err.message);
            return res.status(500).json({ error: 'Failed to fetch student data' });
        }
        res.status(200).json(results);
    });
});

module.exports = router;
