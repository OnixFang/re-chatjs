import { useRef } from 'react';
import ChatMessage from './ChatMessage';

export default function ActiveChat(props) {
  const { room, user, onSubmit } = props;
  const message = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const chatMessage = {
      from: user.username,
      room: room.name,
      message: message.current.value,
      dateSent: Date.now(),
    };

    onSubmit(chatMessage);
    message.current.value = '';
  };

  return room ? (
    <div className="active-chat">
      <div className="room-bar">
        <img className="room-image" src={room.image} alt="Room image" />
        <div className="room-info">
          <span className="room-name">{room.name}</span>
          <span className="users">
            {room.users.map((user, index, array) => (index === array.length - 1 ? user : `${user}, `))}
          </span>
        </div>
      </div>
      <div className="chat-window">
        {room.messages.map((msg) => (
          <ChatMessage key={msg.dateSent} msg={msg} />
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
  ) : (
    <div className="active-chat"></div>
  );
}
