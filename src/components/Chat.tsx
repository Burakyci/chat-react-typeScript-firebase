import { useEffect, useId, useState } from "react";
import "../styles/chat.scss";
import RoomList from "./chat/RoomList";
import UserList from "./chat/UserList";
import userService from "../services/userService";
import { RootState, useAppDispatch } from "../state/store";
import { useSelector } from "react-redux";
import { Unsubscribe } from "firebase/firestore";
import { authInit } from "../state/slices/authSlice";
import { updateUsers, getUserList } from "../state/slices/userSlice";
import chatService from "../services/chatService";
import { getRoomData, updateRoomsData } from "../state/slices/chatSlice";
import Search from "./Search";

const Chat: React.FC = () => {
  const [lastInteractionTime] = useState(Date.now());
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.authSlice);

  useEffect(() => {
    chatService.getChatRoom(user.uid);
    let userSub: Unsubscribe;
    let chatDataSub: Unsubscribe;
    dispatch(authInit(user));
    dispatch(getRoomData(user.uid));
    dispatch(getUserList());
    userSub = userService.getUsersSub(true, (user) => {
      dispatch(updateUsers(user));
    });

    chatDataSub = chatService.getChatRoomSub(user.uid, (room) => {
      dispatch(updateRoomsData(room));
    });

    userService.isItOnline(user.uid, true);
    const timer = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - lastInteractionTime;

      if (elapsedTime > 30000) {
        userService.isItOnline(user.uid, false);
      }
    }, 30000);

    return () => {
      clearInterval(timer);

      if (typeof chatDataSub === "function") {
        chatDataSub();
      }
      if (typeof userSub === "function") {
        userSub();
      }
    };
  }, []);

  return (
    <div className="chat">
      {/* <Search /> */}
      <div>
        <RoomList />
        <UserList />
      </div>
    </div>
  );
};

export default Chat;
