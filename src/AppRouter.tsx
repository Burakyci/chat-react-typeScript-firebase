import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginAndSignup from "./pages/LoginAndSignup";
import { fireAuth } from "./config/FirebaseConfig";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./state/store";
import { authInit } from "./state/slices/authSlice";
import { RootState } from "./state/store";
import { getUserList } from "./state/slices/userSlice";
import Landing from "./pages/Landing";
import Page404Found from "./pages/Page404Found";
import { getRoomIds } from "./state/slices/chatSlice";
const AppRouter: React.FC = () => {
  const dispatch = useAppDispatch();

  const { user } = useSelector((state: RootState) => state.authSlice);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    const subscription = fireAuth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(authInit(user));
        dispatch(getRoomIds(user.uid));
      }
      setLoading(false);
    });
    return () => subscription();
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
