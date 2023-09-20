import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../state/store";
import MessageList from "./MessageList";
import userService from "../../services/userService";
import { IUserData } from "../../types";
import { getAnotherUser } from "../../state/slices/userSlice";
import { RoomModel } from "../../models/chatModel";

const RoomList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { roomsData } = useSelector((state: RootState) => state.chatSlice);
  const { user } = useSelector((state: RootState) => state.authSlice);
  const [room, setRoom] = React.useState<IUserData[]>();

  const [whichRoom, setWhichRoom] = useState<number>(0);
  useEffect(() => {
    (async () => {
      let userId = roomsData?.data?.[whichRoom].members.filter(
        (value: string) => {
          if (user) return value !== user.uid;
        }
      );
      if (userId) {
        dispatch(getAnotherUser(userId[0]));
      }
    })();
  }, [whichRoom]);
  useEffect(() => {
    let anotherUserData: IUserData[] = [];
    if (user)
      roomsData?.data?.map(async (value: RoomModel) => {
        let anotherUserId = value.members.filter(
          (data: string) => data !== user.uid
        );
        const { data } = await userService.getUser(anotherUserId[0]);
        if (data) {
          anotherUserData.push(data);
          setRoom(anotherUserData);
        }
      });
  }, [roomsData]);
  return (
    <div className="roomListContainer">
      <div className="roomList">
        {room?.map((value, key) => (
          <div onClick={() => setWhichRoom(key)} key={key}>
            <img src={value.profilePhoto} alt="ProfilePhoto" />

            <p>
              {value.lastName.toLocaleUpperCase()}{" "}
              {value.firstName.toLocaleUpperCase()}
            </p>
          </div>
        ))}
      </div>

      <div>
        <MessageList room={whichRoom} />
      </div>
    </div>
  );
};

export default RoomList;
