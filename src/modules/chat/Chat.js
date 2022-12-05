import React from "react";
// library
// component
import RoutesChat from "../../routers/Routes_Chat";
import Header from "./components/layouts/Header";
import { toast } from "react-toastify";

import { getProfile } from "@/apis/auth.api";
import { useQuery } from "@tanstack/react-query";
import "./assets/styles/Chat.scss";
import io from "socket.io-client";
const socket = io.connect("https://appchat-be.herokuapp.com");
// const socket = io.connect("http://localhost:4001");

const Chat = () => {
  const { isLoading, isError, error, data } = useQuery(["getUser"], () => {
    return getProfile();
  });

  if (!isLoading && isError) {
    toast.error(error.message);
  }
  return (
    <div className="chat">
      <Header socket={socket} />
      <div style={{ width: "100%" }}>
        {!isLoading && !isError && <RoutesChat myUser={data} socket={socket} />}
      </div>
    </div>
  );
};

export default Chat;
