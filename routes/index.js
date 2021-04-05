const router = require('express').Router();
const { login, register } = require('./auth');
const { getRoomInfo, createRoom, joinRoom, leaveRoom, getRoomList } = require('./room');

// User API
router.post('/login', login);
router.post('/register', register);
router.get('/room', getRoomInfo);
router.get('/rooms', getRoomList);
router.post('/room', createRoom);
router.post('/joinRoom', joinRoom);
router.post('/leaveRoom', leaveRoom);

module.exports = router;
