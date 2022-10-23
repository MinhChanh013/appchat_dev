import React, { useEffect, useState } from "react";
import Auth from "../modules/auth/Auth";
import Chat from "../modules/chat/Chat";
import { useRoutes, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
const Routes_Main = () => {
  const [loading, setLoading] = useState(true);
  const changeNavigate = useNavigate();
  useEffect(() => {
    const checkToken = setInterval(() => {
      let token =
        "Bearer " +
        document.cookie
          .split(";")
          .map((cookie) => cookie.split("="))
          .reduce(
            (accumulator, [key, value]) => ({
              ...accumulator,
              [key.trim()]: decodeURIComponent(value),
            }),
            {}
          ).token_api;
      if (token.trim() !== "Bearer" && token.trim() !== "Bearer undefined") {
        if (jwt_decode(token).exp < Date.now() / 1000) {
          document.cookie = `token_api=; Path=/; Expires=${Date()};`;
          changeNavigate("/", { state: { alert: "err" } });
        } else {
          if (window.location.pathname === "/") {
            setLoading(true);
            changeNavigate("/chats/message");
          }
        }
      } else {
        setLoading(false);
      }
    }, 1000);
    return () => {
      clearInterval(checkToken);
    };
  });
  return useRoutes([
    loading ? { path: "/*", element: "" } : { path: "/*", element: <Auth /> },
    { path: "/chats/*", element: <Chat /> },
  ]);
};

export default Routes_Main;
