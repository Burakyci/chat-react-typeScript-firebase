import React from "react";
import { useAppDispatch } from "../state/store";
import { appLogout } from "../state/slices/authSlice";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import Search from "./Search";
const Navbar: React.FC = () => {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const logout = async () => {
    await dispatch(appLogout());
  };

  return (
    <div>
      <div className="navbar">
        <NavLink className="navlink" to="/">
          Home
        </NavLink>
        <NavLink className="navlink" to="myProfile">
          Profile
        </NavLink>
        <Search />
        <button
          className="link"
          onClick={() => {
            navigation(-1);
          }}
        >
          Back
        </button>{" "}
        <button
          onClick={async () => {
            logout();
            await navigation(`myProfile`);
          }}
        >
          Logout
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default Navbar;
