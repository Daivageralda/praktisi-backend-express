const express = require('express')
const router = express.Router()
const jadwalController = require('../controllers/jadwalController')

// Middleware
const logMiddleware = require('../middleware/log');
router.use(logMiddleware);

// Get Method
router.get('/getAllJadwal', jadwalController.getAllJadwal)

// Post Method
router.post('/createJadwal', jadwalController.createJadwal)

// Put Method
router.put('/updateJadwal/:kd_jadwal', jadwalController.updateJadwal)

// Delete Method
router.delete('/deleteJadwal/:kd_jadwal', jadwalController.deleteJadwal)


module.exports = router