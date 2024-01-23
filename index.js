const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const userRoutes = require('./src/routes/userRoute')
const matkulRoutes = require('./src/routes/matkulRoute')
const jadwalRoutes = require('./src/routes/jadwalRoute')
const tugasRoutes = require('./src/routes/tugasRoute')
const informasiRoutes = require('./src/routes/informasiRoute')
const nilai_akhirRoutes = require('./src/routes/nilai_akhirRoute')
const kehadiranRoutes = require('./src/routes/kehadiranRoute')
const detail_pengumpulanRoutes = require('./src/routes/detail_pengumpulanRoute')

const swaggerRoutes = require('./src/routes/swaggerRoute')

// Body-Parser
app.use(bodyParser.json()); // Menggunakan JSON parser
app.use(bodyParser.urlencoded({ extended: true })); // Untuk parsing data dari form

// Middleware
const sync = require('./src/middleware/sync')
sync();

// Documentation

// Root Endpoint
// Coming Soon


// Model Endpoints
app.use('/matkul', matkulRoutes)
app.use('/users', userRoutes)
app.use('/jadwal', jadwalRoutes)
app.use('/tugas', tugasRoutes)
app.use('/informasi', informasiRoutes)
app.use('/nilai_akhir', nilai_akhirRoutes)
app.use('/kehadiran', kehadiranRoutes)
app.use('/detail_pengumpulan', detail_pengumpulanRoutes)


// Documentation Endpoint
app.use('/api-docs', swaggerRoutes)


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})