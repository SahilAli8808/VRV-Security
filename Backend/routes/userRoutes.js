const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.get('/admin', authMiddleware, roleMiddleware(['Admin']), (req, res) => {
  res.send('Welcome, Admin!');
});

router.get('/moderator', authMiddleware, roleMiddleware(['Moderator']), (req, res) => {
  res.send('Welcome, Moderator!');
});

router.get('/user', authMiddleware, roleMiddleware(['User', 'Admin', 'Moderator']), (req, res) => {
  res.send('Welcome, User!');
});

module.exports = router;
