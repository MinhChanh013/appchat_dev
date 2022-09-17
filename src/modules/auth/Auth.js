import React from "react";
// Library
// Component
import Button from "@common/components/controls/CButton";
import TextField from "@common/components/controls/CTextField";
// Imgaes
import mountain1 from "./assets/images/mountain1.png";
import mountain2 from "./assets/images/mountain2.png";
import mountain3 from "./assets/images/mountain3.png";
import city from "./assets/images/city.png";
import rock from "./assets/images/rock.png";
import rockBack from "./assets/images/rock_back.png";
import cloud from "./assets/images/cloud.png";
import logo from "./assets/images/logo.svg";
import video1 from "./assets/video/background_1.mp4";
import video2 from "./assets/video/background_1.mp4";

import "./assets/styles/Auth.scss";
const Auth = () => {
  return (
    <div className="auth">
      <div className="auth-container">
        <div className="auth-container__main">
          <img className="auth__mountain" src={mountain1} alt=""></img>
          <img className="auth__mountain" src={mountain2} alt=""></img>
          <img className="auth__mountain" src={mountain3} alt=""></img>
          <img className="auth_city" src={city} alt=""></img>
          <img className="auth_rockBack" src={rockBack} alt=""></img>
          <img className="auth_rock" src={rock} alt=""></img>
          <div className="auth-container__cloud">
            <img className="auth_cloud" src={cloud} alt=""></img>
            <img className="auth_cloud" src={cloud} alt=""></img>
            <img className="auth_cloud" src={cloud} alt=""></img>
            <img className="auth_cloud" src={cloud} alt=""></img>
            <img className="auth_cloud" src={cloud} alt=""></img>
          </div>
          <div className="auth-main__content">
            <img className="auth-content__img" src={logo} alt=""></img>
            <h2 className="auth-content__text">CHAT EVERYWHERE</h2>
            <h4 className="auth-content__text">
              Mobile App and Website Chat connect everyone in the world
            </h4>
            <div className="auth-content__button">
              <Button variant="outlined">Register</Button>
              <Button variant="outlined">Sigin</Button>
            </div>
          </div>
        </div>
        <div className="auth-container__main">
          <video className="auth-video" autoPlay muted loop>
            <source src={video1} />
          </video>
          <div className="auth-main__register">
            <form className="auth-register__form">
              <div className="auth-form__title">
                <span style={{ "--i": 1 }}>R</span>
                <span style={{ "--i": 2 }}>e</span>
                <span style={{ "--i": 3 }}>g</span>
                <span style={{ "--i": 4 }}>i</span>
                <span style={{ "--i": 5 }}>s</span>
                <span style={{ "--i": 6 }}>t</span>
                <span style={{ "--i": 7 }}>e</span>
                <span style={{ "--i": 8 }}>r</span>
              </div>
              <TextField label="User" />
              <TextField type="password" label="Pass" />
              <TextField type="tel" label="Điện thoại" />
              <Button variant="outlined">Register</Button>
            </form>
          </div>
        </div>
        <div className="auth-container__main"></div>
      </div>
    </div>
  );
};

export default Auth;
