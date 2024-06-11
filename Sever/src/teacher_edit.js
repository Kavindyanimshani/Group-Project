// teacher_edit.js
const express = require('express');
const router = express.Router();
const db = require('./db'); // Make sure db is configured properly

// Route to handle teacher update
router.put('/teachers/:id', async (req, res) => {
    const teacherId = req.params.id;
    const { LecturerName, lnumber, Module, ContactNumber, Email, Gender, Password } = req.body;

    try {
        // Update the teacher information in the database
        const updateQuery = `
            UPDATE teachers
            SET LecturerName = ?, lnumber = ?, Module = ?, ContactNumber = ?, Email = ?, Gender = ?, Password = ?
            WHERE LecturerID = ?
        `;
        await db.query(updateQuery, [LecturerName, lnumber, Module, ContactNumber, Email, Gender, Password, teacherId]);

        res.status(200).json({ message: 'Teacher information updated successfully.' });
    } catch (error) {
        console.error('Error updating teacher information:', error);
        res.status(500).json({ error: 'An error occurred while updating teacher information.' });
    }
});

module.exports = router;
