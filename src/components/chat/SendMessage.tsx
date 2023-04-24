import React, { useState, useEffect } from "react";
import "../../styles/sendMessage.scss";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../state/store";
import { sendMessage } from "../../state/slices/chatSlice";
import { IPropsRoomListToMessageList } from "../../types";

const SendMessage: React.FC<IPropsRoomListToMessageList> = ({ room }) => {
  const dispatch = useAppDispatch();
  const { roomsData } = useSelector((state: RootState) => state.chatSlice);

  useEffect(() => {}, [room]);

  const { user } = useSelector((state: RootState) => state.authSlice);
  const activeUser = user.uid;
  const [message, setMessage] = useState("");

  let chatRoomId = roomsData?.data?.[room]?.chatId || null;
  const sendMessages = (message: string, e: any) => {
    e.preventDefault();
    const values = {
      from: activeUser,
      roomId: chatRoomId as string,
      message,
    };
    dispatch(sendMessage(values));
    setMessage("");
  };

  return (
    <div className="sendMessage">
      <form className="form" onSubmit={(e) => sendMessages(message, e)}>
        <input
          onChange={(e: any) => {
            setMessage(e.target.value);
          }}
          value={message}
          type="text"
          placeholder="message...."
        />
        <button type="submit">send</button>
      </form>
    </div>
  );
};

export default SendMessage;
