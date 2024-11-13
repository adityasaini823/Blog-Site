const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db'); // Correct path to db.js
const adminRoutes = require('./routes/admin');
const userRoutes=require('./routes/user');
dotenv.config(); // Load environment variables from .env

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB(); // Ensures your database connects when the server starts

// Routes
app.use('/admins', adminRoutes);
app.use('/', userRoutes);


// Start the server
const PORT = process.env.PORT || 3000; // Use environment variable for PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
