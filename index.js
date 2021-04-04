// Modules
const express = require('express');
const socketIo = require('socket.io');
const app = express();

// Controllers
const { login } = require('./controllers/authController');
const socketController = require('./controllers/socketController');
const apiRouter = require('./apiRouter');

const { HOST, PORT } = process.env;

app.use(express.json());

// CORS compliant request middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', `http://${HOST}:*`);
  next();
});

// API
app.use(apiRouter);

// 404 error handler
app.use((req, res, next) => {
  const error = new Error('API route not found');
  error.status = 404;
  next(error);
});

// Error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500).send(error.message);
});

const server = app.listen(PORT, () => {
  console.log(`App running on http://${HOST}:${PORT}`);
});

const io = socketIo(server);

io.on('connection', socketController);
