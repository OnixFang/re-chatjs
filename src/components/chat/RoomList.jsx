import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../state/user/actions';
import ChatRoom from './ChatRoom';

export default function RoomList(props) {
  const { user, rooms, activeRoom } = props;
  const dispatch = useDispatch();
  let [isOpen, setIsOpen] = useState(false);

  const openChatRooms = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    dispatch(removeUser());
  };

  return (
    <Fragment>
      <div className={`chat-rooms ${isOpen ? 'open' : ''}`}>
        <div className="user-info">
          <img className="user-image" src="./assets/user.svg" alt="User image" />
          <span className="username">{user.username}</span>
          <button className="btn red icon-btn" onClick={handleClick}>
            <span className="icon power"></span>
          </button>
        </div>
        {rooms.map((room) => (
          <ChatRoom key={room.createdDate} room={room} active={room === activeRoom} />
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
