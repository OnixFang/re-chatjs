const fs = require('fs').promises;
const filename = 'mockdata.json';

const getDatabase = async () => {
  try {
    return JSON.parse(await fs.readFile(filename));
  } catch (error) {
    throw error;
  }
};

module.exports = { getDatabase };
