const express = require('express')
const router = express.Router()
const tugasController = require('../controllers/tugasController')

// Middleware
const logMiddleware = require('../middleware/log');
router.use(logMiddleware);

//Get Method
router.get('/getalltugas', tugasController.getAllTugas)

//Post Method
router.post('/createtugas', tugasController.createTugas)

//Put Method
router.put('/updatetugas/:kd_tugas', tugasController.updateTugas)

//Delete Method
router.delete('/deletetugas/:kd_tugas', tugasController.deleteTugas)

module.exports = router