import React from "react";

import video from "./assets/video/background_video.m4v";
import Header from "./components/layout/Header";
import "./assets/styles/Auth.scss";
const Auth = () => {
  return (
    <div className="auth">
      <video className="auh_background" autoPlay loop muted src={video}></video>
      <div className="auth_container">
        <Header />
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            height: "100%",
            width: "20%",
            display: "grid",
            gridTemplateColumns: "1fr",
          }}
          className="auth__container-hiddent"
        >
          <div style={{ background: "red" }}></div>
          <div style={{ background: "red" }}></div>
          <div style={{ background: "red" }}></div>
          <div style={{ background: "red" }}></div>
          <div style={{ background: "red" }}></div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
