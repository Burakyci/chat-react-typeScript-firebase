import React, { useEffect } from "react";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import LoginAndSignup from "./pages/LoginAndSignup";
import Page404Found from "./pages/Page404Found";
import userService from "./services/userService";
import { fireAuth } from "./config/FirebaseConfig";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./state/store";
import { authInit } from "./state/slices/authSlice";
import { RootState } from "./state/store";
import { getUserList, updateUser } from "./state/slices/userSlice";
import { getRoomIds } from "./state/slices/chatSlice";
import chatService from "./services/chatService";
import { updateRoomsData } from "./state/slices/chatSlice";
import { Unsubscribe } from "firebase/firestore";
import { type } from "@testing-library/user-event/dist/types/setup/directApi";
const AppRouter: React.FC = () => {
  const dispatch = useAppDispatch();

  const { user } = useSelector((state: RootState) => state.authSlice);
  const { roomsData } = useSelector((state: RootState) => state.chatSlice);

  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    let roomsSub: Unsubscribe;
    let userSub: Unsubscribe;
    const subscription = fireAuth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(authInit(user));
        dispatch(getRoomIds(user.uid));
        userSub = userService.getUserSub((a) => {
          dispatch(updateRoomsData(a));
        });
        userService.getUserSub((a) => {
          dispatch(updateRoomsData(a));
        });
      }
      setLoading(false);
    });
    if (user) {
      roomsSub = chatService.getChatRoomSub(user?.uid, (rooms) => {
        dispatch(updateRoomsData(rooms));
      });
      chatService.getChatRoomSub(user.uid, (rooms) => {
        dispatch(updateRoomsData(rooms));
      });
      console.log(typeof roomsSub);
    }

    return () => {
      subscription();
      if (typeof roomsSub === "function") {
        roomsSub();
      } else {
        console.log("1");
      }
      if (typeof userSub === "function") {
        userSub();
      } else {
        console.log(`2`);
      }
    };
  }, [user]);
  useEffect(() => {
    dispatch(getUserList());
  }, []);

  return (
    <div>
      {loading === true ? (
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<Page404Found />} />
        </Routes>
      ) : (
        <Routes>
          {!user ? (
            <Route path="/" index={true} element={<LoginAndSignup />} />
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Page404Found />} />
            </>
          )}
        </Routes>
      )}
    </div>
  );
};

export default AppRouter;
