import React, { useEffect, useState } from "react";
import "./styles/App.scss";
import { BrowserRouter } from "react-router-dom";
import RoutesMain from "./routers/Routes_Main";

function App() {
  const [loading, setLoading] = useState(true);
  const [darkmode, setDarkMode] = useState("");

  const getCookie = (name) => {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin === -1) {
      begin = dc.indexOf(prefix);
      if (begin !== 0) return null;
    } else {
      begin += 2;
      var end = document.cookie.indexOf(";", begin);
      if (end === -1) {
        end = dc.length;
      }
    }
    return decodeURI(dc.substring(begin + prefix.length, end));
  };

  let checkCookie = () => {
    setDarkMode(getCookie("darkmode").split(";")[0]);
    // if (darkmode !== getCookie("darkmode").split(";")[0]) {
      // return true;
    // }
    // return false;
    // }
  };

  useEffect(() => {
    var myCookie = getCookie("darkmode");
    if (myCookie === null) {
      setLoading(false);
      document.cookie = `darkmode = mode`;
      setDarkMode("mode");
    } else {
      setDarkMode(myCookie.split(";")[0]);
      setLoading(false);
    }
    if (loading === false) {
      setInterval(() => {
        checkCookie();
        // if (checkCookie()) {
        //   console.log("dads");
        // }
      }, 1000);
    }
  }, [loading]);
  return (
    <>
      {loading ? (
        ""
      ) : (
        <div className={`App ${darkmode}`}>
          <BrowserRouter>
            <RoutesMain darkmode={darkmode} />
          </BrowserRouter>
        </div>
      )}
    </>
  );
}

export default App;
