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

const getUserRooms = async (username) => {
  try {
    const database = await getDatabase();
    const rooms = [];
    database.rooms.map((room) => {
      if (room.users.indexOf(username) !== -1) {
        rooms.push(room.name);
      }
    });
    return rooms;
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

const addUserToRoom = async (roomInfo) => {
  const { roomName, users } = roomInfo;
  if (typeof roomName === 'string' && typeof users !== 'string' && users.hasOwnProperty('length')) {
    try {
      const database = await getDatabase();
      const room = findRoom(database, roomName);
      users.forEach((user) => {
        if (room.users.indexOf(user) === -1) {
          room.users.push(user);
        }
      });

      await saveDatabase(database, room);

      return room;
    } catch (error) {
      throw error;
    }
  } else {
    throw new HttpError('Bad request', 400);
  }
};

const removeUserFromRoom = async (roomInfo) => {
  const { roomName, users } = roomInfo;
  if (typeof roomName === 'string' && typeof users !== 'string' && users.hasOwnProperty('length')) {
    try {
      const database = await getDatabase();
      const room = findRoom(database, roomName);

      room.users = room.users.filter((user) => {
        for (let index = 0; index < users.length; index++) {
          if (user === users[index]) {
            return false;
          }
        }
        return user;
      });

      await saveDatabase(database, room);

      return room;
    } catch (error) {
      throw error;
    }
  } else {
    throw new HttpError('Bad request', 400);
  }
};

module.exports = {
  getRoom,
  getUserRooms,
  addRoom,
  addUserToRoom,
  removeUserFromRoom,
};
