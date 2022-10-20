import React from "react";
import Auth from "../modules/auth/Auth";
import Chat from "../modules/chat/Chat";
import { useRoutes } from "react-router-dom";
const Routes_Main = ({ darkmode }) => {
  return useRoutes([
    { path: "/*", element: <Auth /> },
    { path: "/chats/*", element: <Chat darkmode={darkmode} /> },
  ]);
};

export default Routes_Main;
