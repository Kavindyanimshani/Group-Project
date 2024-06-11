const express = require('express');
const cors = require('cors');
//const helmet = require('helmet');
//const morgan = require('morgan');
const app = express();
//require('dotenv').config();
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
const courseEditRouter = require('./course_edit');
const addWorkRouter = require('./add_work'); // Import the add_works route

app.use(cors());
app.use(express.json());

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
app.use('/api', courseEditRouter);
app.use('/api', addWorkRouter); // Use the add_works route

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
