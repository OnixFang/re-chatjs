const express = require('express');
const socketIo = require('socket.io');
const app = express();
let testvar = 0;

const socketHandler = require('./controllers/socketController');

const { HOST, PORT } = process.env;

app.use(express.json());

// CORS compliant request middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res, next) => {
  res.status(200).send('Server running OK');
});

const server = app.listen(PORT, () => {
  console.log(`App running on http://${HOST}:${PORT}`);
});

const io = socketIo(server);

io.on('connection', socketHandler);
