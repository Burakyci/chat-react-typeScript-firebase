import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { IUserData } from "../types/IInitialUserType";

const UserList: React.FC = () => {
  const { userList } = useSelector((state: RootState) => state.userSlice);

  return (
    <div>
      {userList.user?.data?.map((value: IUserData) => (
        <div>
          <p>
            Name : {value.firstName}
            {value.lastName}
          </p>
          <p> id:{value.id}</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
