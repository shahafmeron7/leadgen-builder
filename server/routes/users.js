const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {authenticateToken} = require('../middleware/auth');
// GET /api/users - Get all users
router.get('/', authenticateToken, async (req, res) => {
  try {
    const users = await User.find().select('-password'); 
    console.log(users)
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/:userId',authenticateToken, async (req, res) => {
  try {
    console.log('get user',req.params.userId)
    const user = await User.findById(req.params.userId).select('-password'); 
    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;