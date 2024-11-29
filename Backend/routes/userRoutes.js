const express = require('express');
const { verifyToken } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');
const { getUsers } = require('../controllers/userController');

const router = express.Router();

router.get('/', verifyToken, requireRole(['Admin']), getUsers);

module.exports = router;
