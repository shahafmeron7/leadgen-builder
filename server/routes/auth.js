const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const jwtSecret = process.env.JWT_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

const router = express.Router();
const generateTokens = (user) => {
  const payload = { user: { id: user._id } };

  const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
  const refreshToken = jwt.sign(payload, jwtRefreshSecret, { expiresIn: '7d' });

  return { token, refreshToken };
};
router.post('/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({
      email,
      password,
      name,
      
    });

    await user.save();
    const { token, refreshToken } = generateTokens(user);
    res.status(201).json({ token, refreshToken, user: { id: user.id, email: user.email, name: user.name } });
     
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'This email is not registred.' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    const { token, refreshToken } = generateTokens(user);
    res.json({ token, refreshToken, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/refresh-token', (req, res) => {
  const { token: refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: 'Access Denied' });

  try {
    const verified = jwt.verify(refreshToken, jwtRefreshSecret);
    const payload = { user: { id: verified.user.id } };
    const newToken = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

    res.json({ token: newToken });
  } catch (error) {
    res.status(400).json({ message: 'Invalid Token' });
  }
});

module.exports = router;