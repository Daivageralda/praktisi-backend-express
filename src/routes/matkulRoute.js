const express = require('express')
const router = express.Router()
const matkulController = require('../controllers/matkulController')

// Middleware
const logMiddleware = require('../middleware/log');
router.use(logMiddleware);

// Get Method
router.get('/getallmatkul', matkulController.getAllMatkul)

// // Post Method
// router.post('/addmatkul', matkulController.addMatkul)

// // Put Method
// router.put('/updatematkul/:kd_matkul', matkulController.updateMatkul)

// // Deleter Method
// router.delete('/deletematkul/:kd_matkul', matkulController.deleteMatkul)

module.exports = router