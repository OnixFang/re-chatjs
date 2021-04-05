const { mockLogout } = require('../routes/mockAuth');
const liveChat = 'Live chat';

const socketController = (io) => {
  const joinSocketToRooms = (socket, rooms) => {
    rooms.forEach((room) => {
      socket.join(room);
    });
  };

  // Returns an array of current online users
  const usersInRoom = () => {
    const userArray = [];
    const chatRoom = io.sockets.adapter.rooms.get(liveChat);
    if (chatRoom) {
      chatRoom.forEach((scket) => {
        userArray.push(io.sockets.sockets.get(scket).user.username);
      });
      return userArray;
    } else {
      return [];
    }
  };

  io.on('connection', (socket) => {
    socket.join(liveChat);

    // Get and attach user object to socket
    socket.on('set user', (payload) => {
      const { user, rooms } = payload;
      socket.user = user;
      console.log('New user connected:', user.username);

      // joinSocketToRooms(socket, rooms);

      const message = {
        from: 'Server',
        room: liveChat,
        message: `${user.username} joined the chat.`,
        dateSent: Date.now(),
      };

      // Add user to current users in chat
      const currentUsers = usersInRoom().sort();
      io.to(liveChat).emit('current users', currentUsers);

      // Send message of new user joining chat
      io.to(liveChat).emit('chat message', message);
    });

    // Chat message handler
    socket.on('chat message', (msg) => {
      io.to(msg.room).emit('chat message', msg);
    });

    socket.on('disconnect', (reason) => {
      if (socket.user) {
        const { username } = socket.user;
        const message = {
          from: 'Server',
          room: liveChat,
          message: `${username} left the chat.`,
          dateSent: Date.now(),
        };

        // Remove user from current users in chat
        mockLogout(username);
        const currentUsers = usersInRoom().sort();
        if (currentUsers.length) {
          io.to(liveChat).emit('current users', currentUsers);
        }

        // Send message of user leaving chat
        io.to(liveChat).emit('chat message', message);
        console.log('User disconnected: ', username);
      }
      console.log('Reason: ', reason);
    });
  });
};

module.exports = socketController;
