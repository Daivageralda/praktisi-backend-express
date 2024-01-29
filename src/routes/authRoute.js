const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
// Middleware
const logMiddleware = require('../middleware/log');
router.use(logMiddleware);

//Post Method
router.post('/login', authController.login_user)

module.exports = router