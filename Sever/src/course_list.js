// course_edit.js
const express = require('express');
const router = express.Router();
const db = require('./db'); // assuming you have a db.js file for database connection

// Update course information
router.put('/courses/:courseId', (req, res) => {
    const { courseId } = req.params;
    const { courseName, moduleCoordinatorName, coordinatorPhoneNumber, noOfStudent, courseDuration, descriptionOfCourse } = req.body;

    if (!courseName || !moduleCoordinatorName || !coordinatorPhoneNumber || !noOfStudent || !courseDuration) {
        return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    const query = `
        UPDATE lectuers
        SET LecturerName = ?, Module = ?, ContactNumber = ?, OtherInfo = ?, LecturerName = ?
        WHERE LecturerID = ?
    `;
    const values = [courseName, moduleCoordinatorName, coordinatorPhoneNumber, noOfStudent, courseDuration, descriptionOfCourse, courseId];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json({ message: 'Course updated successfully!' });
    });
});

module.exports = router;
