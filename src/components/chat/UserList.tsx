import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../state/store";
import { IUserData } from "../../types";
import { createRoom } from "../../state/slices/chatSlice";
import { Unsubscribe } from "firebase/auth";
import userService from "../../services/userService";
import { updateUsers } from "../../state/slices/userSlice";
import { boolean } from "yup";
const UserList: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const { user } = useSelector((state: RootState) => state.authSlice);
  const { userList } = useSelector((state: RootState) => state.userSlice);
  const dispatch = useAppDispatch();
  const activeUser = user.uid;

  const createOneRoom = (to: string) => {
    const values = {
      to,
      from: user.uid,
    };
    dispatch(createRoom(values));
  };
  useEffect(() => {
    let userSub: Unsubscribe;

    userSub = userService.getUsersSub(isOnline, (users) => {
      dispatch(updateUsers(users));
    });
    console.log(isOnline);
    return () => {
      if (typeof userSub === "function") {
        userSub();
      }
    };
  }, [isOnline]);

  return (
    <div className="userList">
      <label htmlFor="">only Online Users</label>
      <input
        id="onlineUsers"
        type="checkbox"
        checked={isOnline}
        onChange={() => setIsOnline(!isOnline)}
      />

      {userList.data?.map((value: IUserData, key) => (
        <div key={key} className="user" onClick={() => createOneRoom(value.id)}>
          {value.id === activeUser ? (
            <div>
              <span style={{ color: "green" }}>{value.firstName} </span>
              <span>
                {value.online ? (
                  <span
                    style={{
                      display: "inline-block",
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: "green",
                    }}
                  ></span>
                ) : (
                  <span
                    style={{
                      display: "inline-block",
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: "red",
                    }}
                  ></span>
                )}
              </span>
            </div>
          ) : (
            <p>
              {value.firstName}
              <span>
                {value.online ? (
                  <span
                    style={{
                      display: "inline-block",
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: "green",
                    }}
                  ></span>
                ) : (
                  <span
                    style={{
                      display: "inline-block",
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: "red",
                    }}
                  ></span>
                )}
              </span>
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserList;
