import RoomList from "./chat/RoomList";
import UserList from "./chat/UserList";
import MessageList from "./chat/MessageList";

const Chat: React.FC = () => {
  return (
    <div>
      <RoomList />
      <MessageList />
      <UserList />
    </div>
  );
};

export default Chat;
