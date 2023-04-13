import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import SendMessage from "./SendMessage";

const MessageList: React.FC = () => {
  const { roomsData } = useSelector((state: RootState) => state.chatSlice);
  return (
    <div>
      {roomsData.loading ? (
        <>Bir Oda Seç</>
      ) : (
        <div>
          <h1 style={{ color: "red" }}>{roomsData.roomsData?.data?.chatId}</h1>
          {roomsData.roomsData?.data?.messages?.map((value, index) => (
            <div key={index}>
              <p>{value.message}</p>
              <p>{value.fromUser}</p>
              <p>{value.read}</p>
              <p>{value.date}</p>
              <p>{value.toUserId}</p>
            </div>
          ))}
        </div>
      )}
      <SendMessage />
    </div>
  );
};

export default MessageList;
