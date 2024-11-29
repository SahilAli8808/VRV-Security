// authController.js

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 */

/**
 * @desc Verify user email
 * @route GET /api/auth/verify-email/:token
 * @access Public
 */

/**
 * @desc User login
 * @route POST /api/auth/login
 * @access Public
 */

/**
 * @desc User logout
 * @route POST /api/auth/logout
 * @access Private
 */


const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { sendEmail } = require('../utils/sendEmail');
const { blacklistToken } = require('../middlewares/authMiddleware');
// Register User
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: 'User', // Default role
      emailVerified: false,
    });

    await user.save();

    // Generate email verification token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send verification email
    await sendEmail(email, 'Verify your email', `Click here to verify: ${process.env.BASE_URL}/api/auth/verify-email/${token}`);

    res.status(201).json({ message: 'User registered. Please verify your email.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Verify Email
exports.verifyEmail = async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'Invalid token' });

    if (user.emailVerified) {
      return res.status(400).json({ message: 'Email already verified' });
    }

    user.emailVerified = true;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};


// Login User
exports.login = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    // Validate input
    if (!email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    if (user.role !== role) {
      return res.status(403).json({ error: 'Role mismatch' });
    }

    if (!user.emailVerified) {
      return res.status(403).json({ error: 'Email not verified' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Secure Logout
exports.logout = async (req, res) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(400).json({ message: 'No token provided.' });

  try {
    await blacklistToken(token);
    res.status(200).json({ message: 'Logout successful.' });
  } catch (error) {
    res.status(500).json({ message: 'Logout failed.' });
  }
};