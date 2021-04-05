const currentUsers = [];

const mockLogin = (req, res, next) => {
  const { username } = req.body;
  console.log('Mock login request', req.body);
  try {
    if (currentUsers.indexOf(username) === -1) {
      currentUsers.push(username);
      const newUser = {
        username,
        createdDate: Date.now(),
        updatedDate: Date.now(),
      };
      console.log(`${username} logged in successfully`);
      console.log(currentUsers);
      res.status(200).json(newUser);
    } else {
      const err = new Error('Username already taken');
      err.status = 409;
      throw err;
    }
  } catch (error) {
    next(error);
  }
};

const mockLogout = (username) => {
  currentUsers.splice(currentUsers.indexOf(username), 1);
  console.log(currentUsers);
};

module.exports = {
  mockLogin,
  mockLogout,
};
