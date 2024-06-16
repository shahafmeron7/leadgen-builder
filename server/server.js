const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const leadgenRoutes = require('./routes/leadgen');
const userRoutes = require('./routes/users');

const uri = require('./mongoDB/index');

const app = express();
app.use(cors({
  origin: ['https://localhost:5173', 'https://10.0.8.106:5173'] // Ensure this matches your client’s URL and port
}));
app.use(express.json());

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/leadgens', leadgenRoutes);
app.use('/api/users', userRoutes);

// HTTPS Configuration
const sslOptions = {
  key: fs.readFileSync(path.resolve(__dirname, '../certs/server.key')),
  cert: fs.readFileSync(path.resolve(__dirname, '../certs/server.cert'))
};

// Start HTTPS server
https.createServer(sslOptions, app).listen(443, () => {
  console.log('HTTPS Server running on port 443');
});

// Redirect HTTP to HTTPS
http.createServer((req, res) => {
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  res.end();
}).listen(80, () => {
  console.log('HTTP Server running on port 80 and redirecting to HTTPS');
});
