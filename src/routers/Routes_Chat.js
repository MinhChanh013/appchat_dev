import React from "react";

import Mess from "../modules/chat/pages/Mess/Mess";
import Todo from "../modules/chat/pages/Todo/Todo";
import Contact from "../modules/chat/pages/Contact/Contact";
import Setting from "../modules/chat/pages/Setting/Setting";

import { useRoutes } from "react-router-dom";
const Routes_Chat = () => {
  return useRoutes([
    { path: "/message", element: <Mess /> },
    { path: "/notification", element: <Todo /> },
    { path: "/contact", element: <Contact /> },
    { path: "/setting", element: <Setting /> },
  ]);
};

export default Routes_Chat;
