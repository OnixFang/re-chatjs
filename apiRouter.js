const apiRouter = require('express').Router();
const { login, register } = require('./controllers/authController');

// User API
apiRouter.post('/login', login);
apiRouter.post('/register', register);

module.exports = apiRouter;
