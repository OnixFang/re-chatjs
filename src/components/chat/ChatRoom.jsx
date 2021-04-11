import { useDispatch } from 'react-redux';
import { activateRoom } from '../../state/rooms/actions';

export default function ChatRoom(props) {
  const { room, active } = props;
  const dispatch = useDispatch();

  const setActiveRoom = (room) => {
    dispatch(activateRoom(room));
  };

  return (
    <div className={`chat-room${active ? ' active' : ''}`} onClick={() => setActiveRoom(room)}>
      <img className="room-image" src="./assets/group.svg" alt="Room image" />
      <div className="room-info">
        <span className="room-name">{room.name}</span>
      </div>
    </div>
  );
}
