const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
console.log("jwtSecret",jwtSecret)
const authenticateToken = (req, res, next) => {
  const token = req.header('x-auth-token');
  console.log("Headers:", req.headers);  // Log all headers
  console.log("Token:", token);
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const verified = jwt.verify(token, jwtSecret);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

module.exports = { authenticateToken };