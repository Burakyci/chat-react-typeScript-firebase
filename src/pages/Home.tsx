import React from "react";
import { useAppDispatch } from "../state/store";
import { appLogout } from "../state/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Chat from "../components/Chat";
const Home: React.FC = () => {
  const navi = useNavigate();

  const dispatch = useAppDispatch();
  const logout = async () => {
    await dispatch(appLogout());
  };

  return (
    <div>
      Home
      <button
        onClick={async () => {
          logout();
          await navi("/");
        }}
      >
        Logout
      </button>
      <Chat />
    </div>
  );
};

export default Home;
