const apiRouter = require('express').Router();
const { login } = require('./controllers/authController');

// User API
apiRouter.post('/login', login);

module.exports = apiRouter;
