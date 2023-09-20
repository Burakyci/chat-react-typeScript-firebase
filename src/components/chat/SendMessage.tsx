import React, { useState } from "react";
import "../../style/sendMessageStyle.css";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../state/store";
import { sendMessage } from "../../state/slices/chatSlice";
import { IPropsRoomListToMessageList } from "../../types";

const SendMessage: React.FC<IPropsRoomListToMessageList> = ({ room }) => {
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.authSlice);
  const { roomsData } = useSelector((state: RootState) => state.chatSlice);

  const [message, setMessage] = useState("");
  const activeUser = user?.uid;

  let chatRoomId = roomsData?.data?.[room]?.chatId || null;
  const sendMessages = (message: string, e: any) => {
    e.preventDefault();
    if (!activeUser) {
      return;
    }
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
          placeholder="Write here..."
          name="text"
          className="input"
        />
        <button type="submit">
          <div className="svg-wrapper-1">
            <div className="svg-wrapper">
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
          <span>Send</span>
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
