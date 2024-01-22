const express = require('express')
const router = express.Router()
const informasiController = require('../controllers/informasiController')

// Middleware
const logMiddleware = require('../middleware/log');
router.use(logMiddleware);

//Get Method
router.get('/getAllInformasi', informasiController.getAllInformasi)

module.exports = router