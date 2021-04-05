const liveChat = 'live chat';

const socketController = (io) => {
  const joinSocketToRooms = (socket, rooms) => {
    rooms.forEach((room) => {
      socket.join(room);
    });
  };

  const usersInRoom = () => {
    const userArray = [];
    io.sockets.adapter.rooms.get(liveChat).forEach((scket) => {
      userArray.push(io.sockets.sockets.get(scket).user.username);
    });
    return userArray;
  };

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
        dateSent: Date.now(),
      };

      const currentUsers = usersInRoom().sort();

      io.to(liveChat).emit('current users', currentUsers);
      io.to(liveChat).emit('chat message', message);
    });

    socket.on('chat message', (msg) => {
      io.to(msg.room).emit('chat message', msg);
    });

    socket.on('disconnect', (reason) => {
      if (socket.user) {
        const message = {
          from: 'Server',
          room: liveChat,
          message: `${socket.user.username} left the chat.`,
          dateSent: Date.now(),
        };
        io.to(liveChat).emit('chat message', message);
        console.log('User disconnected: ', socket.user.username);
      }
      console.log('Reason: ', reason);
    });
  });
};

module.exports = socketController;
