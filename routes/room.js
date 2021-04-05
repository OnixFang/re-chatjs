const { addRoom, getRoom, addUserToRoom, removeUserFromRoom, getUserRooms } = require('../controllers/roomController');

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

const getRoomList = async (req, res, next) => {
  console.log('Getting room list for', req.body.username);
  try {
    const rooms = await getUserRooms(req.body.username);
    res.status(200).json(rooms);
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
  getRoomList,
  createRoom,
  joinRoom,
  leaveRoom,
};
