// server/scripts/insertDummyUsers.js
const mongoose = require('mongoose');
const User = require('../models/User');
const uri = require('../mongoDB');

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const users = [
  {
    email: 'user1@example.com',
    password: 'password123',
    name: 'User One',
  },
  {
    email: 'user2@example.com',
    password: 'password123',
    name: 'User Two',
  },
  {
    email: 'user3@example.com',
    password: 'password123',
    name: 'User Three',
  },
];

const insertUsers = async () => {
   try {
     await User.deleteMany({});
     await User.insertMany(users);
     console.log('Dummy users inserted');
   } catch (err) {
     console.error(err);
   } finally {
     mongoose.disconnect();
   }
 };
 
 insertUsers();
