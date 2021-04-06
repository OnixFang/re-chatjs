export default function ChatMessage(props) {
  const { msg } = props;

  return (
    <div className={`chat-message ${msg.type}`}>
      <span className="from">{msg.from}</span>
      <span className="msg">{msg.message}</span>
      <span className="date">{new Date(msg.dateSent).toLocaleTimeString()}</span>
    </div>
  );
}
