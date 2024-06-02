// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const leadgenRoutes = require('./routes/leadgen');
const userRoutes = require('./routes/users');

const uri = require('./mongoDB/index')

const app = express();
app.use(cors({
  origin: 'http://localhost:5173' // Replace with your client's URL
}));
app.use(express.json());

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/auth', authRoutes);
app.use('/api/leadgens', leadgenRoutes);
app.use('/api/users', userRoutes);


app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
