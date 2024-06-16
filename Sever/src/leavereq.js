// leavereq.js
const express = require('express');
const router = express.Router();
const db = require('./db'); // Adjust the path to your db configuration

// Endpoint to save the leave request data
router.post('/', (req, res) => {
    const { 
        studentID, 
        StudentName, 
        CourseName, 
        HeadOfDepartment, 
        LeaveDuration, 
        ReasonForLeave 
    } = req.body;

    console.log('Received data:', req.body); // Log received data

    // Insert new data
    const insertQuery = `INSERT INTO leaverequest 
    (studentID, StudentName, CourseName, HeadOfDepartment, LeaveDuration, ReasonForLeave) 
    VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(insertQuery, [
        studentID, 
        StudentName, 
        CourseName, 
        HeadOfDepartment, 
        LeaveDuration, 
        ReasonForLeave
    ], (err, result) => {
        if (err) {
            console.error('Error inserting data into leaverequest table:', err); // Log error details
            return res.status(500).json({ error: 'Failed to save the leave request data.' }); // Send JSON response
        }

        console.log('Leave request data saved successfully:', result); // Log success
        res.status(200).json({ message: 'Leave request data saved successfully.' }); // Send JSON response
    });
});

// Endpoint to fetch leave request data
router.get('/', (req, res) => {
    const selectQuery = `SELECT * FROM leaverequest`;

    db.query(selectQuery, (err, results) => {
        if (err) {
            console.error('Error fetching data from leaverequest table:', err);
            return res.status(500).json({ error: 'Failed to fetch the leave request data.' });
        }

        res.status(200).json(results);
    });
});

// Endpoint to delete a leave request by StudentID
router.delete('/:studentID', (req, res) => {
    const studentID = req.params.studentID;

    // Delete query
    const deleteQuery = `DELETE FROM leaverequest WHERE StudentID = ?`;

    db.query(deleteQuery, [studentID], (err, result) => {
        if (err) {
            console.error('Error deleting leave request:', err);
            return res.status(500).json({ error: 'Failed to delete the leave request.' });
        }

        console.log('Leave request deleted successfully:', result);
        res.status(200).json({ message: 'Leave request deleted successfully.' });
    });
});



module.exports = router;
