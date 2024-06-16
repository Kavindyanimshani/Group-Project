const express = require('express');
const cors = require('cors');
const app = express();

// Import all route handlers
const userRegisterRouter = require('./user_register');
const userSignInRouter = require('./user_signin');
const stListRouter = require('./st_list');
const stAddRouter = require('./st_add');
const stEditRouter = require('./st_edit');
const teacherAddRouter = require('./teacher_add');
const teacherListRouter = require('./teacher_list');
const courseListRouter = require('./course_list');
const stUpdateRouter = require('./st_update');
const teacherEditRouter = require('./teacher_edit');
const courseEditRouter = require('./course_edit'); // Import the course edit route
const courseAddRouter = require('./course_add');
const addWorkRouter = require('./add_work');
const adminRouter = require('./admin');
const kitchenDutyRouter = require('./kitchen_duty');
const leaveReqRouter = require('./leavereq'); // Import leave request route

// Middleware
app.use(cors());
app.use(express.json());

// Use routes
app.use('/api', userRegisterRouter);
app.use('/api', userSignInRouter);
app.use('/api', stListRouter);
app.use('/api', stAddRouter);
app.use('/api', stEditRouter);
app.use('/api', teacherAddRouter);
app.use('/api', teacherListRouter);
app.use('/api', courseListRouter);
app.use('/api', stUpdateRouter);
app.use('/api', teacherEditRouter);
app.use('/api', courseEditRouter); // Use the course edit route
app.use('/api', courseAddRouter);
app.use('/api', addWorkRouter);
app.use('/api/admin', adminRouter);
app.use('/api/kitchen_duty', kitchenDutyRouter);
app.use('/api/leavereq', leaveReqRouter); // Use leave request route

// Root endpoint
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
