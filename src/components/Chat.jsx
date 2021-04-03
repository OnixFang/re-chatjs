import { useRef } from 'react';
import { io } from 'socket.io-client';
const endpoint = 'http://rechatjsapi:9010';
let socket;

export default function Chat(props) {
  // componentDidMount() {
  //   try {
  //     socket = io(endpoint, { transports: ['websocket'] });

  //     socket.emit('set user', this.state.user);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // componentWillUnmount() {
  //   socket.disconnect();
  // }

  const message = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(message.current.value);
    message.current.value = '';
  };

  return (
    <div className="chat">
      <div className="chat-rooms">
        <div className="user-info">
          <img className="user-image" src="./assets/user.svg" alt="User image" />
          <span className="username">{props.user.username}</span>
        </div>
        <div className="chat-room active">
          <img className="room-image" src="./assets/group.svg" alt="Room image" />
          <div className="room-info">
            <span className="room-name">Live chat</span>
          </div>
        </div>
        <div className="chat-room">
          <img className="room-image" src="./assets/group.svg" alt="Room image" />
          <div className="room-info">
            <span className="room-name">Live chat 2</span>
          </div>
        </div>
      </div>
      <div className="active-chat">
        <div className="room-bar">
          <img className="room-image" src="./assets/group.svg" alt="Room image" />
          <span className="room-name">Live chat</span>
        </div>
        <div className="chat-window"></div>
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
