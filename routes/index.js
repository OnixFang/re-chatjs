const router = require('express').Router();
const { login, register } = require('./auth');
const { getRoomInfo, createRoom } = require('./room');

// User API
router.post('/login', login);
router.post('/register', register);
router.get('/room', getRoomInfo);
router.post('/room', createRoom);

module.exports = router;
