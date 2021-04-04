// Modules
const express = require('express');
const socketIo = require('socket.io');
const router = require('./routes');
const socketController = require('./controllers/socketController');

// Server variables
const app = express();
const { HOST, PORT } = process.env;

// Server configuration
app.use(express.json());
// CORS compliant request middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', `http://${HOST}:*`);
  next();
});

// Router
app.use(router);
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

// Server launch
const server = app.listen(PORT, () => {
  console.log(`App running on http://${HOST}:${PORT}`);
});
const io = socketIo(server);
io.on('connection', socketController);
