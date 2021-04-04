const { addUser, getUser } = require('./userController');

const login = async (req, res, next) => {
  console.log('Login request', req.body);
  const { username } = req.body;

  try {
    const user = await getUser(username);
    console.log(`${user.username} logged in successfully`);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  console.log('Register request', req.body);
  try {
    const newUser = await addUser(req.body);
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  register,
};
