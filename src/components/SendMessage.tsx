import React from "react";

const SendMessage: React.FC = () => {
  const sendMessage = (e: any) => {
    e.preventDefault();
    alert("asd");
  };
  return (
    <div>
      <form onSubmit={sendMessage}>
        <label htmlFor="">Send Massage</label>
        <input type="text" />
        <button type="submit">send</button>
      </form>
    </div>
  );
};

export default SendMessage;
