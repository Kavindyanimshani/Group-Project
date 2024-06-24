const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const { executeQuery } = require('./db'); // Adjust the path as necessary

const app = express();
const PORT = 3001;

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Parse JSON request body
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Handle form submission
app.post('/submit-leave', upload.single('document'), (req, res) => {
  const { studentId, studentName, courseName, hodName, leaveDuration } = req.body;
  const documentPath = req.file ? req.file.filename : null;

  // Insert data into the database
  const query = 'INSERT INTO student_leave (student_id, student_name, course_name, hod_name, leave_duration, document) VALUES (?,?,?,?,?,?)';
  executeQuery(query, [studentID, studentName, courseName, hodName, leaveDuration, documentPath], (err, result) => {
    if (err) {
      console.error('Error inserting data into the database: ', err);
      res.status(500).send('Error inserting data into the database');
      return;
    }
    res.status(200).send('Data inserted successfully');
  });
});

// API endpoint to fetch data from the database
app.get('/api/sickleaves', (req, res) => {
  const sqlSelect = "SELECT id, sID, name, Cname, hod_name , leave_duration,  document FROM student_leave";
  executeQuery(sqlSelect, [], (err, result) => {
    if (err) {
      console.error('Error fetching data from the database: ', err);
      res.status(500).send('Error fetching data from the database');
      return;
    }
    res.json(result);
  });
});

// Delete a sick leave request by ID
app.delete('/api/sickleaves/:id', (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM leaverequest WHERE id = ${id}`;
  executeQuery(query, [], (err, results) => {
    if (err) {
      console.error('Error deleting data from the database: ', err);
      res.status(500).send('Error deleting data from the database');
      return;
    }
    res.send(`Row with id ${id} deleted successfully`);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
