const express = require('express')
const router = express.Router()
const tugasController = require('../controllers/tugasController')

// Middleware
const logMiddleware = require('../middleware/log');
router.use(logMiddleware);

//Get Method
router.get('/getAllTugas', tugasController.getAllTugas)

module.exports = router