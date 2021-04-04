const fs = require('fs').promises;
const filename = 'mockdata.json';

const getDatabase = async () => {
  try {
    return JSON.parse(await fs.readFile(filename));
  } catch (error) {
    throw error;
  }
};

const saveDatabase = async (database, item) => {
  try {
    const currentDatabase = JSON.stringify(await getDatabase(), null, 2);
    const newDatabase = JSON.stringify(database, null, 2);
    if (currentDatabase !== newDatabase) {
      if (item) {
        item.updatedDate = Date.now();
      }
      await fs.writeFile(filename, newDatabase, 'utf8');
    } else {
      console.log('There are no changes to make to the database');
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getDatabase,
  saveDatabase,
};
