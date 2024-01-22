const express = require('express')
const router = express.Router()
const swaggerUi = require('swagger-ui-express')
const swaggerConfig = require('../../swagger-output.json')

// Middleware
const logMiddleware = require('../middleware/log');
router.use(logMiddleware);

// Swagger UI
router.use('/',swaggerUi.serve, swaggerUi.setup(swaggerConfig))

module.exports = router