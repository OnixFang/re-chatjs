import { useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
const endpoint = 'http://rechatjsapi:9010';
let socket;

export default function Chat(props) {
  const [room, setRoom] = useState({
    name: 'live chat',
    messages: [],
    users: [],
  });

  const message = useRef();

  const handleNewMessage = (message) => {
    const newMessage = { ...message };
    let type = '';
    if (message.from === 'Server') {
      type = 'from-server';
    } else if (message.from === props.user.username) {
      type = 'from-me';
    }
    newMessage.type = type;

    setRoom((prevState) => ({ ...prevState, messages: [...prevState.messages, newMessage] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const chatMessage = {
      from: props.user.username,
      room: 'live chat',
      message: message.current.value,
      dateSent: Date.now(),
    };

    socket.emit('chat message', chatMessage);
    message.current.value = '';
  };

  useEffect(() => {
    try {
      socket = io(endpoint, { transports: ['websocket'] });
      if (props.user) {
        socket.emit('set user', { user: props.user });
      }

      socket.on('chat message', (msg) => {
        handleNewMessage(msg);
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
      <div className="chat-rooms">
        <div className="user-info">
          <img className="user-image" src="./assets/user.svg" alt="User image" />
          <span className="username">{props.user.username}</span>
          <button className="btn red icon-btn" onClick={props.onLogout}>
            <span className="icon power"></span>
          </button>
        </div>
        <div className="chat-room active">
          <img className="room-image" src="./assets/group.svg" alt="Room image" />
          <div className="room-info">
            <span className="room-name">Live chat</span>
          </div>
        </div>
      </div>
      <div className="active-chat">
        <div className="room-bar">
          <img className="room-image" src="./assets/group.svg" alt="Room image" />
          <span className="room-name">{room.name}</span>
        </div>
        <div className="chat-window">
          {room.messages.map((msg) => (
            <div key={msg.dateSent} className={`chat-message ${msg.type}`}>
              <span className="from">{msg.from}</span>
              <span className="msg">{msg.message}</span>
              <span className="date">{new Date(msg.dateSent).toLocaleTimeString()}</span>
            </div>
          ))}
        </div>
        <form className="chat-input" onSubmit={handleSubmit} autoComplete="off">
          <input
            className="text-input"
            type="text"
            id="message"
            ref={message}
            required
            placeholder="Write a message..."
          />
          <button className="btn icon-btn" type="submit">
            <span className="icon send"></span>
          </button>
        </form>
      </div>
    </div>
  );
}
