import React from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../state/store";
import { IUserData } from "../../types";
import { createRoom } from "../../state/slices/chatSlice";

const UserList: React.FC = () => {
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

  return (
    <div className="userList">
      {userList.data?.data?.map((value: IUserData, key) => (
        <div key={key} className="user" onClick={() => createOneRoom(value.id)}>
          {value.id === activeUser ? (
            <div>
              <p style={{ color: activeUser === value.id ? "green" : "wite" }}>
                {value.firstName}{" "}
              </p>
            </div>
          ) : (
            <p style={{ color: activeUser === value.id ? "green" : "white" }}>
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
