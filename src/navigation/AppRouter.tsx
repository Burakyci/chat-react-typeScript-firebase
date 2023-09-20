import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import AUTHROUTE from "./AUTHROUTE";
import MAINROUTE from "./MAINROUTE";
import { RootState, useAppDispatch } from "../state/store";
import { fireAuth } from "../config/FirebaseConfig";
import { authInit } from "../state/slices/authSlice";
import { getMyProfile, getUserList } from "../state/slices/userSlice";
import { BrowserRouter as Router } from "react-router-dom";
import { Navbar } from "react-bootstrap";

const AppRouter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.authSlice);
  useEffect(() => {
    const subscription = fireAuth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(authInit(user));
        dispatch(getUserList());
        dispatch(getMyProfile(user.uid));
      }
    });
    return () => subscription();
  }, [user]);

  return (
    <div className="bg-dark vh-100">
      {!user ? (
        <AUTHROUTE />
      ) : (
        <>
          <MAINROUTE />
          <Navbar />
        </>
      )}
    </div>
  );
};

export default AppRouter;
