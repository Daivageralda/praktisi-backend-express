/**
 * @swagger
 * /getAllInformasi:
 *   get:
 *     summary: Mendapatkan semua informasi
 *     description: Mengembalikan daftar semua informasi.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             example: { data: [...informasi] }
 */
const express = require('express')
const router = express.Router()
const informasiController = require('../controllers/informasiController')

// Middleware
const logMiddleware = require('../middleware/log');
router.use(logMiddleware);

//Get Method
router.get('/getAllInformasi', informasiController.getAllInformasi)

module.exports = router