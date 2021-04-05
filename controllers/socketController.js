const liveChat = 'live chat';

const joinSocketToRooms = (socket, rooms) => {
  rooms.forEach((room) => {
    socket.join(room);
  });
};

const socketController = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected!');
    socket.join(liveChat);

    socket.on('set user', (payload) => {
      const { user, rooms } = payload;
      socket.user = user;

      // joinSocketToRooms(socket, rooms);

      const message = {
        from: 'Server',
        room: liveChat,
        message: `${user.username} joined the chat.`,
      };
      io.to(liveChat).emit('user joined', message);
    });

    socket.on('chat message', (payload) => {
      console.log(payload);
    });

    socket.on('disconnect', (reason) => {
      if (socket.user) {
        console.log('User disconnected: ', socket.user.username);
      }
      console.log('Reason: ', reason);
    });
  });
};

module.exports = socketController;
