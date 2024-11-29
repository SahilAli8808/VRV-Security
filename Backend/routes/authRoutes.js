const express = require('express');
const { register, login, verifyEmail, logout } = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify-email/:token', verifyEmail);
router.post('/logout', verifyToken, logout);

module.exports = router;
