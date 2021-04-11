import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage, addUsers } from '../../state/rooms/actions';
import { io } from 'socket.io-client';
import ActiveChat from './ActiveChat';
import RoomList from './RoomList';
let socket;

export default function Chat(props) {
  const rooms = useSelector((state) => state.rooms);
  const activeRoom = rooms.find((room) => room.active);
  const dispatch = useDispatch();
  const { user, endpoint, onLogout } = props;

  const handleNewMessage = (message) => {
    let type = '';
    if (message.from === 'Server') {
      type = 'from-server';
    } else if (message.from === user.username) {
      type = 'from-me';
    }
    message.type = type;

    dispatch(addMessage(message));
    if (activeRoom && activeRoom.name === message.room) {
      const chatWindow = document.querySelector('.chat-window');
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
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
        dispatch(addUsers(currentUsers));
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
      <RoomList user={user} rooms={rooms} onLogout={onLogout} activeRoom={activeRoom} />
      <ActiveChat user={user} room={activeRoom} onSubmit={handleSubmit} />
    </div>
  );
}
