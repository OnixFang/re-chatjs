import { Fragment, useState } from 'react';
import ChatRoom from './ChatRoom';

export default function RoomList(props) {
  const { user, activeRoom } = props;
  let [isOpen, setIsOpen] = useState(false);

  const openChatRooms = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Fragment>
      <div className={`chat-rooms ${isOpen ? 'open' : ''}`}>
        <div className="user-info">
          <img className="user-image" src="./assets/user.svg" alt="User image" />
          <span className="username">{user.username}</span>
          <button className="btn red icon-btn" onClick={props.onLogout}>
            <span className="icon power"></span>
          </button>
        </div>
        {props.rooms.map((room) => (
          <ChatRoom room={room} active={room === activeRoom} />
        ))}
      </div>
      <div className={`menu-button ${isOpen ? 'open' : ''}`} onClick={openChatRooms}>
        <span className="top"></span>
        <span className="middle"></span>
        <span className="bottom"></span>
      </div>
      <div className={`shade ${isOpen ? 'open' : ''}`} onClick={openChatRooms}></div>
    </Fragment>
  );
}
