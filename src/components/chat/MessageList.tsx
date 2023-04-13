import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import SendMessage from "./SendMessage";
import { FaCheck } from "react-icons/fa";
import "../../styles/messageList.scss";

const MessageList: React.FC = () => {
  const { roomsData } = useSelector((state: RootState) => state.chatSlice);

  return (
    <div className="messageList">
      <h1 style={{ color: "red" }}>{roomsData.roomsData?.data?.chatId}</h1>
      {roomsData.loading ? (
        <>Bir Oda Seç</>
      ) : (
        <div className="messages">
          {roomsData.roomsData?.data?.messages?.map((value, index) => (
            <div key={index}>
              <p>{value.message}</p>
              <p>{value.fromUser}</p>
              <FaCheck />
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
