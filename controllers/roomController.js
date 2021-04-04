const { getDatabase, saveDatabase } = require('./databaseController');
const HttpError = require('../customErrors/HttpError');

const findRoom = (database, roomName) => {
  const room = database.rooms.find((room) => room.name === roomName);
  if (room) {
    return room;
  } else {
    throw new HttpError('Room not found', 404);
  }
};

const getRoom = async (roomName) => {
  try {
    const database = await getDatabase();
    return findRoom(database, roomName);
  } catch (error) {
    throw error;
  }
};

const addRoom = async (roomInfo) => {
  const { roomName, users } = roomInfo;
  if (typeof roomName === 'string' && typeof users !== 'string' && users.hasOwnProperty('length')) {
    try {
      const database = await getDatabase();
      if (!database.rooms.find((room) => room.name === roomName)) {
        const newDate = Date.now();
        const newRoom = {
          name: roomName,
          users,
          messages: [],
          createdDate: newDate,
          updatedDate: newDate,
        };

        database.rooms.push(newRoom);
        await saveDatabase(database);

        return newRoom;
      } else {
        throw new HttpError('Room name already exists', 409);
      }
    } catch (error) {
      throw error;
    }
  } else {
    throw new HttpError('Bad request', 400);
  }
};

const addUserToRoom = async (roomName, username) => {
  try {
    const database = await getDatabase();
    const room = findRoom(database, roomName);
    room.users.push(username);

    return { rooms: database.rooms, room };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getRoom,
  addRoom,
  addUserToRoom,
};
