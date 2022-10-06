import React, { useState } from "react";
// Library
import { Link } from "react-router-dom";
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
import backgroundForm from "./assets/images/background_register.png";
import backgroundlogin from "./assets/images/background_sigin.png";
import video1 from "./assets/video/background_2.mp4";
import video2 from "./assets/video/background_3.mp4";

import Header from "./components/layout/Header";
import "./assets/styles/Auth.scss";
const Auth = () => {
  const [active, setActive] = useState("main");

  return (
    <div className="auth">
      <div className={`header-login ${active !== "main" ? "active" : ""}`}>
        <Header />
      </div>
      <div className={`auth-container ${active}`}>
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
            <img className="auth-content__img" src="" alt=""></img>
            <h2 className="auth-content__text">CHAT EVERYWHERE</h2>
            <h4 className="auth-content__text">
              Mobile App and Website Chat connect everyone in the world
            </h4>
            <div className="auth-content__button">
              <Button onClick={() => setActive("register")} variant="outlined">
                Register
              </Button>
              <Button onClick={() => setActive("sigin")} variant="outlined">
                Sigin
              </Button>
            </div>
          </div>
        </div>
        <div className="auth-container__main">
          <video className="auth-video" autoPlay muted loop>
            <source src={video1} />
          </video>
          <div className="auth-main__register">
            <div className="auth-register__background">
              <img
                className="auth-background__register"
                src={backgroundForm}
                alt=""
              />
            </div>
            <form className="auth-register__form">
              <h3 className="auth-form__step">Step 1</h3>
              <div className="auth-form__title">
                <span style={{ "--i": 1 }}>R</span>
                <span style={{ "--i": 2 }}>e</span>
                <span style={{ "--i": 3 }}>g</span>
                <span style={{ "--i": 4 }}>i</span>
                <span style={{ "--i": 5 }}>s</span>
                <span style={{ "--i": 6 }}>t</span>
                <span style={{ "--i": 7 }}>e</span>
                <span style={{ "--i": 8 }}>r</span>
                <span style={{ "--i": 9 }}>.</span>
              </div>
              <p className="auth-form__description">
                Enter your phone number and information to register an account
                and use ChatApp service.
              </p>
              <div className="auth-form__container">
                <TextField label="User" />
                <TextField type="password" label="Password" />
                <TextField type="tel" label="Your Phone" />
                <Button variant="outlined">Register</Button>
                <p className="auth-change__login">
                  Already have a account?{" "}
                  <a
                    href={() => false}
                    onClick={() => {
                      setActive("sigin");
                    }}
                  >
                    Log in
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className="auth-container__main">
          <video className="auth-video" autoPlay muted loop>
            <source src={video2} />
          </video>
          <div className="auth-main__login">
            <form className="auth-login__form">
              <h3 className="auth-form__step">Step 2</h3>
              <div className="auth-form__title">
                <span style={{ "--i": 1 }}>S</span>
                <span style={{ "--i": 2 }}>i</span>
                <span style={{ "--i": 3 }}>g</span>
                <span style={{ "--i": 4 }}>i</span>
                <span style={{ "--i": 5 }}>n</span>
                <span style={{ "--i": 6 }}>.</span>
              </div>
              <p className="auth-form__description">
                Enter your phone number and information to sigin account and use
                ChatApp service.
              </p>
              <div className="auth-form__container">
                <TextField type="tel" label="Your Phone" />
                <TextField type="password" label="Password" />
                <a href={() => false} className="auth-form__forgot">
                  Forgot password ?
                </a>
                <Link to="/chats/message"><Button variant="outlined">Login</Button></Link>
                <p className="auth-change__login">
                  If you not account?{" "}
                  <a
                    href={() => false}
                    onClick={() => {
                      setActive("register");
                    }}
                  >
                    Register
                  </a>
                </p>
              </div>
            </form>
            <div className="auth-login__background">
              <img
                className="auth-background__login"
                src={backgroundlogin}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
