const jwt = require('jsonwebtoken');
const redis = require('redis');
const { promisify } = require('util');
const client = redis.createClient();

const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);

exports.verifyToken = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const isBlacklisted = await getAsync(`blacklisted_${token}`);
    if (isBlacklisted) return res.status(403).json({ message: 'Token is blacklisted.' });

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
      await setAsync(`blacklisted_${token}`, true, 'PX', expiry);
    }
  } catch (error) {
    console.error('Error blacklisting token:', error);
  }
};
