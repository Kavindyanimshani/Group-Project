// course_list.js
const express = require('express');
const router = express.Router();
const db = require('./db'); // Import the database connection

// Route to get all courses
router.get('/courses', (req, res) => {
    // Query to select all courses from the database
    const query = 'SELECT CourseID, CourseName, CourseCoordinator, PhoneNumber, NoOfStudents, CourseDuration, DescriptionOfCourse FROM course';
    // Execute the query
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching courses:', err);
            res.status(500).send('Internal Server Error');
        } else {
            // Send the response with the fetched data
            res.status(200).json(results);
        }
    });
});

module.exports = router;
