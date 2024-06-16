// kitchen_duty.js
const express = require('express');
const router = express.Router();
const db = require('./db'); // Adjust the path to your db configuration

// Endpoint to save the kitchen duty data
router.post('/', (req, res) => {
    const { 
        firstStudentName, 
        secondStudentName, 
        thirdStudentName, 
        fourthStudentName, 
        fiveStudentName, 
        firstStudentID, 
        secondStudentID, 
        thirdStudentID, 
        fourthStudentID, 
        fivethStudentID 
    } = req.body;

    console.log('Received data:', req.body); // Log received data

    // Clear the existing data
    const clearTableQuery = 'TRUNCATE TABLE kitchen_duty';

    db.query(clearTableQuery, (err) => {
        if (err) {
            console.error('Error clearing the kitchen duty table:', err); // Log error details
            return res.status(500).send('Failed to clear the kitchen duty table.');
        }

        // Insert new data
        const insertQuery = `INSERT INTO kitchen_duty 
        (firstStudentName, secondStudentName, thirdStudentName, fourthStudentName, fiveStudentName, firstStudentID, secondStudentID, thirdStudentID, fourthStudentID, fivethStudentID) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        db.query(insertQuery, [
            firstStudentName, 
            secondStudentName, 
            thirdStudentName, 
            fourthStudentName, 
            fiveStudentName, 
            firstStudentID, 
            secondStudentID, 
            thirdStudentID, 
            fourthStudentID, 
            fivethStudentID
        ], (err, result) => {
            if (err) {
                console.error('Error inserting data into kitchen duty table:', err); // Log error details
                return res.status(500).send('Failed to save the kitchen duty data.');
            }

            console.log('Kitchen duty data saved successfully:', result); // Log success
            res.status(200).send('Kitchen duty data saved successfully.');
        });
    });
});

module.exports = router;
