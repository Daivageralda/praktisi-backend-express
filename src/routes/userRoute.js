const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

// Middleware
const logMiddleware = require('../middleware/log');
router.use(logMiddleware);

// Get Method
router.get('/getalluser', userController.getAllUsers)

module.exports = router