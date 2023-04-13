import RoomList from "./chat/RoomList";
import UserList from "./chat/UserList";
import MessageList from "./chat/MessageList";
import "../styles/chat.scss";

const Chat: React.FC = () => {
  return (
    <div className="chat">
      <RoomList />
      <MessageList />
      <UserList />
    </div>
  );
};

export default Chat;
