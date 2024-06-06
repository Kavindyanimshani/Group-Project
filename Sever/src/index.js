const express = require('express');
const cors = require('cors');
const app = express();
const userRegisterRouter = require('./user_register');
const userSignInRouter = require('./user_signin');
const stListRouter = require('./st_list');
const stAddRouter = require('./st_add'); // Import the new route

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

app.use('/api', userRegisterRouter);
app.use('/api', userSignInRouter);
app.use('/api', stListRouter);
app.use('/api', stAddRouter); // Use the new route

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
