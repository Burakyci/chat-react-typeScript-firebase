import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import LoginAndSignup from "./pages/LoginAndSignup";
import { fireAuth } from "./config/FirebaseConfig";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./state/store";
import { authInit } from "./state/slices/authSlice";
import { RootState } from "./state/store";
import userService from "./services/userService";
import { getUserList } from "./state/slices/userSlice";

const AppRouter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { initUser } = useSelector((state: RootState) => state.authSlice);
  const { userList } = useSelector((state: RootState) => state.userSlice);
  useEffect(() => {
    const subscription = fireAuth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(authInit({ user }));
      }
      (async () => {
        dispatch(getUserList());
        console.log(userList);
      })();
    });
  }, []);

  return (
    <div>
      <Routes>
        {!initUser.user ? (
          <Route path="/" index={true} element={<LoginAndSignup />} />
        ) : (
          <>
            <Route path="/" element={<Home />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default AppRouter;
