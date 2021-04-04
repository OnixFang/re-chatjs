const HttpError = require('../customErrors/HttpError');
const { addUser, getUser } = require('./userController');

const login = async (req, res, next) => {
  console.log('Login request', req.body);
  const { username } = req.body;

  try {
    const user = await getUser(username);
    console.log(`${user.username} logged in successfully`);
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.status).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
};

module.exports = {
  login,
};
