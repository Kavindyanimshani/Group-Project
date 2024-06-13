const express = require('express');
const router = express.Router();
const db = require('./db'); // Ensure this path is correct for your db module

// Endpoint to get the count of modules and projects
router.get('/moduleAndProjectCounts', (req, res) => {
    const sql = "SELECT COUNT(CourseID) AS moduleCount FROM course WHERE CourseID LIKE 'MODULE%'"; // Assuming modules start with 'MODULE'
    db.query(sql, (err, moduleResult) => {
        if (err) {
            console.error('Error fetching module count:', err);
            res.status(500).json({ error: 'Database Error: ' + err.message });
            return;
        }

        const sql2 = "SELECT COUNT(CourseID) AS projectCount FROM course WHERE CourseID LIKE 'PROJECT%'"; // Assuming projects start with 'PROJECT'
        db.query(sql2, (err, projectResult) => {
            if (err) {
                console.error('Error fetching project count:', err);
                res.status(500).json({ error: 'Database Error: ' + err.message });
                return;
            }

            const moduleCount = moduleResult[0].moduleCount;
            const projectCount = projectResult[0].projectCount;

            res.status(200).json({ moduleCount, projectCount });
        });
    });
});

module.exports = router;
