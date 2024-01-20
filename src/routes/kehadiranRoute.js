const express = require('express')
const router = express.Router()
const kehadiranRoutes = require('../controllers/kehadiranController')

// Middleware
const logMiddleware = require('../middleware/log');
router.use(logMiddleware);

//Get Method
router.get('/getAllKehadiran', kehadiranRoutes.getAllKehadiran)

module.exports = router