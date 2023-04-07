import React from "react";
import { useAppDispatch } from "../state/store";
import { appLogout } from "../state/slices/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import UserList from "../components/UserList";
import SendMessage from "../components/SendMessage";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const logout = () => {
    dispatch(appLogout());
  };

  return (
    <div>
      Home
      <UserList />
      <button onClick={logout}>Logout</button>
      <SendMessage />
    </div>
  );
};

export default Home;
