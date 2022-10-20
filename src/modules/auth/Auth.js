import React from "react";
// image
import auth_1 from "./assets/images/auth_1.webp";
import auth_2 from "./assets/images/auth_2.webp";
import auth_4 from "./assets/images/auth_4.webp";
import auth_5 from "./assets/images/auth_5.webp";
import auth_7 from "./assets/images/auth_7.webp";

// Component
import RoutesAuth from "../../routers/Routes_Auth";
import SliderAuth from "./components/control/SliderAuth";

import "./assets/styles/Auth.scss";

const Auth = () => {
  return (
    <div className="auth">
      <div className="auth-container">
        <div className="sigin">
          <div className="sigin_auth">
            <div className="sigin-left">
              <SliderAuth data={[auth_1, auth_2, auth_4, auth_5, auth_7]} />
            </div>
            <div className="sigin_right">
              <RoutesAuth />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
