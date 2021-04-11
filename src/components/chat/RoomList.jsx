import { Fragment, useState } from 'react';
import ChatRoom from './ChatRoom';
import UserInfo from './userInfo';

export default function RoomList(props) {
  const { rooms, activeRoom } = props;
  let [isOpen, setIsOpen] = useState(false);

  const openChatRooms = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Fragment>
      <div className={`chat-rooms ${isOpen ? 'open' : ''}`}>
        <UserInfo />
        <div className="room-list">
          {rooms.map((room) => (
            <ChatRoom key={room.createdDate} room={room} active={room === activeRoom} />
          ))}
        </div>
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
