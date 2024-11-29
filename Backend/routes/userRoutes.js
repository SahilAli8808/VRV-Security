const express = require('express');
const { verifyToken } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');
const { getUsers } = require('../controllers/userController');

const router = express.Router();
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieves a list of all users (only accessible by Admins)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns list of users
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden, insufficient role
 */
router.get('/', verifyToken, requireRole(['Admin']), getUsers);



module.exports = router;
