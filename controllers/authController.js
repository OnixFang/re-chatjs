const { addUser, getUser } = require('./userController');

const login = (req, res, next) => {
  console.log('Login request', req.body);
  const { username } = req.body;
  const user = getUser(username);

  if (user) {
    console.log('This user is already logged in');
    res.status(403).send('This user is already logged in');
  } else {
    addUser(username);
    console.log(`${username} logged in successfully`);
    res.status(200).json({ username });
  }
};

module.exports = {
  login,
};
