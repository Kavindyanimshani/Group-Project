// index.js
const express = require('express');
const cors = require('cors');
const app = express();
const userRegisterRouter = require('./user_register');
const userSignInRouter = require('./user_signin');
const stListRouter = require('./st_list');
const stAddRouter = require('./st_add');
const stEditRouter = require('./st_edit');
const teacherAddRouter = require('./teacher_add');
const teacherListRouter = require('./teacher_list');
const courseListRouter = require('./course_list'); // Import the course list router
const stUpdateRouter = require('./st_update');

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

app.use('/api', userRegisterRouter);
app.use('/api', userSignInRouter);
app.use('/api', stListRouter);
app.use('/api', stAddRouter);
app.use('/api', stEditRouter);
app.use('/api', teacherAddRouter);
app.use('/api', teacherListRouter);
app.use('/api', courseListRouter); // Mount the course list router with '/courses' prefix
app.use('/api', stUpdateRouter);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
