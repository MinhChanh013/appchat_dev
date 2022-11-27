import React from "react";

import Sigin from "../modules/auth/pages/Sigin";
import Register from "../modules/auth/pages/Register";
import ResetPass from "../modules/auth/pages/ResetPass";
import { useRoutes } from "react-router-dom";
const Routes_Auth = () => {
  return useRoutes([
    { path: "/", element: <Sigin /> },
    { path: "/register", element: <Register /> },
    { path: "/resetpass", element: <ResetPass /> },
  ]);
};

export default Routes_Auth;
