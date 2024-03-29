import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import SendMessage from "./SendMessage";
import { FaCheck } from "react-icons/fa";
import { IPropsRoomListToMessageList } from "../../types";
import { IMessageModel } from "../../models/chatModel";

const MessageList: React.FC<IPropsRoomListToMessageList> = ({ room }) => {
  const { roomsData } = useSelector((state: RootState) => state.chatSlice);
  const { anotherUser } = useSelector((state: RootState) => state.userSlice);
  return (
    <div className="messageBox">
      <ul>
        {roomsData?.data && room !== undefined ? (
          <li>
            <div className="anotherUser">
              <img src={anotherUser.data?.profilePhoto} alt="" />
              <h4>
                {anotherUser.data?.firstName.toLocaleUpperCase()}{" "}
                {anotherUser.data?.lastName.toLocaleUpperCase()}
                {anotherUser.data?.online ? <span></span> : <span></span>}
              </h4>
            </div>
            {roomsData.data[room]?.messages?.map(
              (value: IMessageModel, index: number) => (
                <div className="eachBox" key={index}>
                  <div className="messageCheck">
                    <p className="message">{value.message}</p>
                    <FaCheck className="check" />
                  </div>
                  <p className="date">
                    {value.date ? value.date.toDate().toLocaleString() : ""}
                  </p>
                  <hr />
                </div>
              )
            )}
          </li>
        ) : (
          <>no message</>
        )}
      </ul>
      <div>
        <SendMessage room={room} />
      </div>
    </div>
  );
};
export default MessageList;
