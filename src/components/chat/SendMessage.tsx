import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../state/store";
import { sendMessage } from "../../state/slices/chatSlice";
import "../../styles/sendMessage.scss";

const SendMessage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { user } = useSelector((state: RootState) => state.authSlice);
  const { roomsData } = useSelector((state: RootState) => state.chatSlice);
  const activeUser = user.uid;
  const [message, setMessage] = useState("");

  const sendMessages = (message: string, e: any) => {
    e.preventDefault();
    const values = {
      to: roomsData.roomsData?.data?.members?.find(
        (userId: string) => userId !== activeUser
      ),
      from: activeUser,
      roomId: roomsData.roomsData?.data?.chatId,
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
