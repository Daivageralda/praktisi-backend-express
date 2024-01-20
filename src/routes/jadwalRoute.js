const express = require('express')
const router = express.Router()
const jadwalController = require('../controllers/jadwalController')

// Middleware
const logMiddleware = require('../middleware/log');
router.use(logMiddleware);

//Get Method
router.get('/getAllJadwal', jadwalController.getAllJadwal)

module.exports = router