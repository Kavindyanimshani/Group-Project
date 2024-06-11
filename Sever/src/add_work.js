// add_works.js
const express = require('express');
const router = express.Router();
const pool = require('./db');

// Endpoint to add work
router.post('/add_work', async (req, res) => {
    const { StudentID, Place } = req.body;
   
        const query = 
            'INSERT INTO add_work (StudentID, Place) VALUES (?,?) ';
           db.query(query [StudentID, Place],(err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'Work added successfully', id: result.rows[0].id });
           })
       } );
      
   


module.exports = router;
