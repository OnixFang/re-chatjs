const router = require('express').Router();
const { login, register } = require('./auth');
const { addUserToRoom } = require('../controllers/roomController');

// User API
router.post('/login', login);
router.post('/register', register);
router.post('/updateRoom', addUserToRoom);

module.exports = router;
