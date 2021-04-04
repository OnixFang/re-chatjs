const { getDatabase } = require('./databaseController');
const HttpError = require('../customErrors/HttpError');

const getUser = async (username) => {
  try {
    const database = await getDatabase();
    const user = database.users.find((user) => user.username.toLowerCase() === username.toLowerCase());
    if (user) {
      return user;
    } else {
      throw new HttpError('User not found', 404);
    }
  } catch (error) {
    throw error;
  }
};

const addUser = async (username) => {
  try {
    const database = await getDatabase();

    if (!database.users.find((user) => user.username.toLowerCase() === username.toLowerCase())) {
      const newUser = {
        username,
      };
      database.users.push(newUser);
      await fs.writeFile(filename, database);

      return newUser;
    } else {
      throw new HttpError('Username already exists', 409);
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUser,
  addUser,
};
