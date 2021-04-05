// Modules
const path = require('path');
const router = require('express').Router();

// Controllers
// const { login, register } = require('./auth');
const { mockLogin } = require('./mockAuth');
const { getRoomInfo, createRoom, joinRoom, leaveRoom, getRoomList } = require('./room');

// React app
router.get('/', (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, '../', 'build', 'index.html'));
});

// User API
// router.post('/login', login);
router.post('/login', mockLogin);
// router.post('/register', register);
router.get('/room', getRoomInfo);
router.get('/rooms', getRoomList);
router.post('/room', createRoom);
router.post('/joinRoom', joinRoom);
router.post('/leaveRoom', leaveRoom);

module.exports = router;
