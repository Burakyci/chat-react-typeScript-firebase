import React from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../state/store";
import { getRoom } from "../../state/slices/chatSlice";

const RoomList: React.FC = () => {
  const { userGetId } = useSelector((state: RootState) => state.chatSlice);
  const dispatch = useAppDispatch();
  const getRoomData = (roomId: string) => {
    dispatch(getRoom(roomId));
  };

  return (
    <div>
      {userGetId.loading ? (
        <p>Loading..</p>
      ) : (
        <div>
          {userGetId.roomIds?.data.roomId.map((roomId: string, key: number) => (
            <p onClick={() => getRoomData(roomId)} key={key}>
              {roomId}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomList;
