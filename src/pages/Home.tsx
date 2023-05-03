import React from "react";
import { useAppDispatch } from "../state/store";
import { appLogout } from "../state/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Chat from "../components/Chat";
import Navbar from "../components/Navbar";
const Home: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};

export default Home;
