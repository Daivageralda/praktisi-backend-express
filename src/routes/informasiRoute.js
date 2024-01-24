const express = require('express')
const router = express.Router()
const informasiController = require('../controllers/informasiController')

// Middleware
const logMiddleware = require('../middleware/log');
router.use(logMiddleware);

//Get Method
router.get('/getallinformasi', informasiController.getAllInformasi)

//Post Method
router.post('/createinformasi', informasiController.createInformasi)

//Put Method
router.put('/updateinformasi/:kd_informasi', informasiController.updateInformasi)

//Delete Method
router.delete('/deleteinformasi/:kd_informasi', informasiController.deleteInformasi)

module.exports = router