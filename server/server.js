// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const questionnaireRoutes = require('./routes/questionnaire');
const uri = require('./mongoDB/index')

const app = express();
app.use(express.json());

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/auth', authRoutes);
app.use('/api/questionnaires', questionnaireRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
