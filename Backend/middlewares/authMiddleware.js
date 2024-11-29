const jwt = require('jsonwebtoken');

// In-memory store for blacklisted tokens
const blacklistedTokens = new Set();

exports.verifyToken = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Check if the token is blacklisted
    if (blacklistedTokens.has(token)) {
      return res.status(403).json({ message: 'Token is blacklisted.' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

exports.blacklistToken = async (token) => {
  try {
    const decoded = jwt.decode(token);
    if (decoded) {
      const expiry = decoded.exp * 1000 - Date.now();
      if (expiry > 0) {
        // Add token to the blacklist
        blacklistedTokens.add(token);

        // Automatically remove the token from the blacklist when it expires
        setTimeout(() => blacklistedTokens.delete(token), expiry);
      }
    }
  } catch (error) {
    console.error('Error blacklisting token:', error);
  }
};
