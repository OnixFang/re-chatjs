const fs = require('fs').promises;
const filename = 'mockdata.json';

const getDatabase = async () => {
  try {
    return JSON.parse(await fs.readFile(filename));
  } catch (error) {
    throw error;
  }
};

const saveDatabase = async (database) => {
  try {
    await fs.writeFile(filename, JSON.stringify(database, null, 2), 'utf8');
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getDatabase,
  saveDatabase,
};
