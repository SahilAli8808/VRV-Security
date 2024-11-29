// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/authRoutes.js', './routes/userRoutes.js', './controllers/authController.js', './controllers/userController.js'];

swaggerAutogen(outputFile, endpointsFiles, {
  info: {
    title: 'User Authentication API',
    description: 'API for user authentication, registration, login, and profile management',
    version: '1.0.0',
  },
  host: 'localhost:5000',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: 'JWT authentication token',
    },
  },
  basePath: '/api/auth',
  security: [
    {
      bearerAuth: [],
    },
  ],
}).then(() => {
  console.log('Swagger documentation generated!');
});
