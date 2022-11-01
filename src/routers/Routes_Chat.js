import React from "react";

import Mess from "../modules/chat/pages/Mess/Mess";
import Todo from "../modules/chat/pages/Todo/Todo";
import Contact from "../modules/chat/pages/Contact/Contact";
import Setting from "../modules/chat/pages/Setting/Setting";

// api
import { getProfile } from "@/apis/auth.api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useRoutes } from "react-router-dom";
const Routes_Chat = () => {
  const { isLoading, isError, error, data } = useQuery(["getUser"], () => {
    return getProfile();
  });

  if (!isLoading && isError) {
    toast.error(error.message);
  }

  return useRoutes([
    { path: "/message", element: <Mess myUser = {!isLoading && !isError && data}/> },
    { path: "/notification", element: <Todo /> },
    { path: "/contact", element: <Contact /> },
    { path: "/setting", element: <Setting /> },
  ]);
};

export default Routes_Chat;
