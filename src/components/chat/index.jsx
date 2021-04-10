import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import ActiveChat from './ActiveChat';
import RoomList from './RoomList';
let socket;

export default function Chat(props) {
  const { user, endpoint, onLogout } = props;
  const [activeRoom, setActiveRoom] = useState({
    name: 'Live chat',
    image: './assets/group.svg',
    users: [],
    messages: [],
  });
  const [rooms, setRooms] = useState(['Live chat', 'Live chat 2']);

  const handleNewMessage = (message) => {
    let type = '';
    if (message.from === 'Server') {
      type = 'from-server';
    } else if (message.from === user.username) {
      type = 'from-me';
    }
    message.type = type;

    setActiveRoom((prevState) => ({ ...prevState, messages: [...prevState.messages, message] }));
    const chatWindow = document.querySelector('.chat-window');
    chatWindow.scrollTop = chatWindow.scrollHeight;
  };

  const handleSubmit = (newMessage) => {
    socket.emit('chat message', newMessage);
  };

  useEffect(() => {
    try {
      socket = io(endpoint, { transports: ['websocket'] });
      if (user) {
        socket.emit('set user', { user: user });
      }

      socket.on('chat message', (msg) => {
        handleNewMessage(msg);
      });

      socket.on('current users', (currentUsers) => {
        setActiveRoom((prevState) => ({ ...prevState, users: currentUsers }));
      });
    } catch (error) {
      console.log(error);
    }

    // Unmount function
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="chat">
      <RoomList user={user} rooms={rooms} onLogout={onLogout} activeRoom={activeRoom.name} />
      <ActiveChat user={user} room={activeRoom} onSubmit={handleSubmit} />
    </div>
  );
}
