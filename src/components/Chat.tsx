import { useEffect, useState } from "react";
import "../styles/chat.scss";
import RoomList from "./chat/RoomList";
import UserList from "./chat/UserList";
import MessageList from "./chat/MessageList";
import userService from "../services/userService";
import chatService from "../services/chatService";
import { RootState, useAppDispatch } from "../state/store";
import { useSelector } from "react-redux";
import { Unsubscribe } from "firebase/firestore";
import { updateUserRoomId, getRoomIds } from "../state/slices/chatSlice";
import { authInit } from "../state/slices/authSlice";
import { updateUsers, getUserList } from "../state/slices/userSlice";
import { updateRoomsData } from "../state/slices/chatSlice";
const Chat: React.FC = () => {
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
  let roomsSub: Unsubscribe;
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.authSlice);
  useEffect(() => {
    let roomIdSub: Unsubscribe;
    let userSub: Unsubscribe;
    let roomDataSub: Unsubscribe;
    dispatch(authInit(user));
    dispatch(getRoomIds(user.uid));
    dispatch(getUserList());

    roomIdSub = chatService.getRooomIdsSub(user.uid, (id) => {
      dispatch(updateUserRoomId(id));
    });
    userSub = userService.getUsersSub(true, (users) => {
      dispatch(updateUsers(users));
    });

    userService.isItOnline(user.uid, true);
    const timer = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - lastInteractionTime;

      console.log(1);
      if (elapsedTime > 30000) {
        userService.isItOnline(user.uid, false);
      }
    }, 30000);

    return () => {
      clearInterval(timer);
      if (typeof roomIdSub == "function") {
        roomIdSub();
      }

      if (typeof userSub === "function") {
        userSub();
      }
    };
  }, []);

  return (
    <div className="chat">
      <RoomList />
      <MessageList />
      <UserList />
    </div>
  );
};

export default Chat;
