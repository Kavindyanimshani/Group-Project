const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require('./db'); // Ensure this points to your database configuration

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder where files will be saved
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique file name
    }
});

const upload = multer({ storage: storage });

// Define the POST route to handle sick leave requests
router.post('/stdsick/add', upload.single('document'), (req, res) => {
    const { studentId, studentName, courseName, departmentHead, leaveDuration } = req.body;
    const documentPath = req.file.path; // Path of the uploaded file

    // SQL query to insert the sick leave request into the database
    const query = `
        INSERT INTO sick_leaves (student_id, student_name, course_name, department_head, leave_duration, document_path)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    // Execute the query
    db.query(query, [studentId, studentName, courseName, departmentHead, leaveDuration, documentPath], (err, results) => {
        if (err) {
            console.error('Error inserting sick leave request:', err);
            res.status(500).json({ error: 'Failed to apply sick leave' });
        } else {
            res.status(200).json({ message: 'Sick leave applied successfully' });
        }
    });
});

module.exports = router;
