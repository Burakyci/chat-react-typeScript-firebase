import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../styles/userList.scss";
import { RootState, useAppDispatch } from "../../state/store";
import { IUserData } from "../../types";
import { createRoom } from "../../state/slices/chatSlice";
import { Unsubscribe } from "firebase/auth";
import userService from "../../services/userService";
import { updateUsers } from "../../state/slices/userSlice";
const UserList: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const { user } = useSelector((state: RootState) => state.authSlice);
  const { userList } = useSelector((state: RootState) => state.userSlice);
  const dispatch = useAppDispatch();
  const activeUser = user.uid;

  const createOneRoom = (to: string) => {
    const values = { to, from: user.uid };
    dispatch(createRoom(values));
  };
  useEffect(() => {
    let userSub: Unsubscribe;
    userSub = userService.getUsersSub(isOnline, (users) => {
      dispatch(updateUsers(users));
    });
    return () => {
      if (typeof userSub === "function") {
        userSub();
      }
    };
  }, [isOnline]);

  const onlineStyle = {
    display: "inline-block",
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: "green",
  };
  const offlineStyle = {
    display: "inline-block",
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: "red",
  };

  return (
    <div className="userList">
      <div className="activeUserCheckBoxContainer">
        <div>
          <span className="switch">
            <input
              onChange={() => setIsOnline(!isOnline)}
              type="checkbox"
              id="switch-round"
            />
            <label htmlFor="switch-round"></label>
          </span>
        </div>
      </div>

      {userList.data?.map((value: IUserData, key) => (
        <ul className="userLists">
          <div key={key} className="user">
            {value.id === activeUser ? (
              <li>
                <div>
                  <img
                    className="profilePhoto"
                    src={value.profilePhoto}
                    alt="profilePhoto"
                  />

                  <p style={{ color: "green" }}>
                    {" "}
                    {value.firstName.toLocaleUpperCase()}{" "}
                    {value.lastName.toLocaleUpperCase()}
                  </p>
                  <span>
                    {value.online ? (
                      <span style={onlineStyle}></span>
                    ) : (
                      <span style={offlineStyle}></span>
                    )}
                  </span>
                </div>
              </li>
            ) : (
              <div
                style={{ cursor: "pointer" }}
                onClick={() => createOneRoom(value.id)}
              >
                <div>
                  <img
                    className="profilePhoto"
                    src={value.profilePhoto}
                    alt="profilePhoto"
                  />

                  <p>
                    {value.firstName.toLocaleUpperCase()}{" "}
                    {value.lastName.toLocaleUpperCase()}
                  </p>
                  <span>
                    {value.online ? (
                      <span style={onlineStyle}></span>
                    ) : (
                      <span style={offlineStyle}></span>
                    )}
                  </span>
                </div>
              </div>
            )}
          </div>
        </ul>
      ))}
    </div>
  );
};

export default UserList;
