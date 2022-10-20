import React from "react";

import Sigin from "../modules/auth/pages/Sigin";
import Register from "../modules/auth/pages/Register";
import { useRoutes } from "react-router-dom";
const Routes_Auth = () => {
  return useRoutes([
    { path: "/", element: <Sigin /> },
    { path: "/register", element: <Register /> },
  ]);
};

export default Routes_Auth;
