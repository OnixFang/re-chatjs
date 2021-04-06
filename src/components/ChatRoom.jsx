export default function ChatRoom(props) {
  const { room, active } = props;

  return (
    <div className={`chat-room${active ? ' active' : ''}`}>
      <img className="room-image" src="./assets/group.svg" alt="Room image" />
      <div className="room-info">
        <span className="room-name">{room}</span>
      </div>
    </div>
  );
}
