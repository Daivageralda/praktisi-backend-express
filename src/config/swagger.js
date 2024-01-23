const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'PRAKTISI REST API DOCUMENTATION',
    description: 'Description'
  },
  host: 'localhost:3000'
};

const outputFile = '../../swagger-output.json';
const routes = ['../../index.js'];

swaggerAutogen(outputFile, routes, doc);