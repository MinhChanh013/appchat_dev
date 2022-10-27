import React from "react";
import "./styles/App.scss";
import { BrowserRouter } from "react-router-dom";
import RoutesMain from "./routers/Routes_Main";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RoutesMain />
      </BrowserRouter>
    </div>
  );
}

export default App;
