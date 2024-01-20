const express = require('express')
const router = express.Router()
const matkulController = require('../controllers/matkulController')

// Middleware
const logMiddleware = require('../middleware/log');
router.use(logMiddleware);

//Get Method
router.get('/getAllMatkul', matkulController.getAllMatkul)

module.exports = router