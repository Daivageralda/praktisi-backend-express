const express = require('express')
const router = express.Router()
const detailPengumpulanRoutes = require('../controllers/detail_pengumpulanController')
// Middleware
const logMiddleware = require('../middleware/log');
router.use(logMiddleware);

//Get Method
router.get('/getAllDetailPengumpulan', detailPengumpulanRoutes.getAllDetailPengumpulan)

module.exports = router