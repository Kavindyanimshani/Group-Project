const express = require('express');
const router = express.Router();
const db = require('./db'); // Ensure you have a db.js file for database connection

// Update course information
router.put('/courses/:courseId', (req, res) => {
    const { courseId } = req.params;
    const { courseName, moduleCoordinatorName, coordinatorPhoneNumber, noOfStudent, courseDuration, descriptionOfCourse } = req.body;

    // Logging for debugging
    console.log(`Received request to update course with ID: ${courseId}`);

    if (!courseName || !moduleCoordinatorName || !coordinatorPhoneNumber || !noOfStudent || !courseDuration) {
        return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    const query = `
        UPDATE course
        SET CourseName = ?, CourseCoordinator = ?, PhoneNumber = ?, NoOfStudents = ?, CourseDuration = ?, DescriptionOfCourse = ?
        WHERE CourseID = ?
    `;
    const values = [courseName, moduleCoordinatorName, coordinatorPhoneNumber, noOfStudent, courseDuration, descriptionOfCourse, courseId];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (result.affectedRows === 0) {
            console.log(`No course found with ID: ${courseId}`);
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json({ message: 'Course updated successfully!' });
    });
});

module.exports = router;
