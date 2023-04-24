import React from "react";
import { useAppDispatch } from "../state/store";
import { appLogout } from "../state/slices/authSlice";
import { useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
const Navbar: React.FC = () => {
  const navi = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.authSlice);
  const logout = async () => {
    await dispatch(appLogout());
  };

  return (
    <div>
      <button
        onClick={async () => {
          logout();
          await navi(`myProfile`);
        }}
      >
        Logout
      </button>
      <NavLink to="myProfile">Profile</NavLink>
    </div>
  );
};

export default Navbar;
