const liveChat = 'live chat';

const socketHandler = (socket) => {
  console.log('A user connected!');
  socket.join(liveChat);

  socket.on('set user', (user) => {
    socket.user = user;

    const message = {
      from: 'Server',
      room: liveChat,
      message: `${user.username} joined the chat room.`,
    };
    io.to(liveChat).emit('user connected', message);

    console.log(socket.rooms);
  });

  socket.on('disconnect', (reason) => {
    console.log(socket.rooms);
    if (socket.user) {
      console.log('User disconnected: ', socket.user.username);
    }
    console.log('Reason: ', reason);
  });
};

module.exports = socketHandler;
