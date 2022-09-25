import React from "react";
// library
// component
import RoutesChat from "../../routers/Routes_Chat";
import Header from "./components/layouts/Header";
import "./assets/styles/Chat.scss";
const Chat = ({ darkmode }) => {
  return (
    <div className="chat">
      <Header darkmode={darkmode} />
      <div style={{ width: "100%" }}>
        <RoutesChat />
      </div>
    </div>
  );
};

export default Chat;
