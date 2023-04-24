import React, { useEffect } from "react";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import LoginAndSignup from "./pages/LoginAndSignup";
import Page404Found from "./pages/Page404Found";
import { fireAuth } from "./config/FirebaseConfig";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./state/store";
import { authInit } from "./state/slices/authSlice";
import { RootState } from "./state/store";
import { getMyProfile, getUserList } from "./state/slices/userSlice";
import Profile from "./pages/Profile";
import MyProfile from "./pages/MyProfile";

const AppRouter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.authSlice);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    const subscription = fireAuth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(authInit(user));
        dispatch(getUserList());
        dispatch(getMyProfile(user.uid));
      }
      setLoading(false);
    });
    return () => subscription();
  }, [user]);

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

              <Route path="/users/:userId" element={<Profile />} />
              <Route path="/myProfile" element={<MyProfile />} />

              <Route path="*" element={<Page404Found />} />
            </>
          )}
        </Routes>
      )}
    </div>
  );
};

export default AppRouter;
