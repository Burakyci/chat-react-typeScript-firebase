import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { IUserData } from "../types/IInitialStateType";

const UserList: React.FC = () => {
  const { initUser } = useSelector((state: RootState) => state.authSlice);

  const { userList } = useSelector((state: RootState) => state.userSlice);
  const activeUser = initUser.user.uid;
  return (
    <div>
      <hr />
      {userList.user?.data?.map((value: IUserData, index) => (
        <div key={index}>
          <p>
            Name : {value.firstName}
            {value.lastName}
          </p>
          <div>
            {" "}
            {value.id === activeUser ? (
              <p style={{ color: "green" }}> id:{value.id} </p>
            ) : (
              <p> id:{value.id}</p>
            )}
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default UserList;
