const express = require('express')
const router = express.Router()
const nilaiakhirRoutes = require('../controllers/nilai_akhirController')

// Middleware
const logMiddleware = require('../middleware/log');
router.use(logMiddleware);

//Get Method
router.get('/getAllNilaiAkhir', nilaiakhirRoutes.getAllNilaiAkhir)

module.exports = router