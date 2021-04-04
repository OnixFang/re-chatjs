const { addRoom, getRoom, addUserToRoom, removeUserFromRoom } = require('../controllers/roomController');

const getRoomInfo = async (req, res, next) => {
  const { roomName } = req.body;
  console.log('Get room request', roomName);
  try {
    const room = await getRoom(roomName);
    console.log('Got room', room);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

const createRoom = async (req, res, next) => {
  console.log('Creating new room', req.body);
  try {
    const room = await addRoom(req.body);
    console.log('Created room', room);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

const joinRoom = async (req, res, next) => {
  console.log('Updating room', req.body);
  try {
    const room = await addUserToRoom(req.body);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

const leaveRoom = async (req, res, next) => {
  console.log('Updating room', req.body);
  try {
    const room = await removeUserFromRoom(req.body);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRoomInfo,
  createRoom,
  joinRoom,
  leaveRoom,
};
