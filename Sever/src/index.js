const express = require('express');
const cors = require('cors');
const db = require('./db'); // Assuming your database connection is in db.js
const userRegisterRouter = require('./user_register'); // Assuming your routes are in user_register.js
const userSignuinRouter = require('./user_signin'); // Assuming your routes are in user
const app = express();

// Use CORS middleware with default settings (allow all origins)
app.use(cors());

app.use(express.json()); // Middleware to parse JSON bodies

// Use the user registration router
app.use('/api', userRegisterRouter);
app.use('/api', userSignuinRouter);


// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
