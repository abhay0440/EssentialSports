import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Buffer } from 'buffer';
// import { setImmediate, clearImmediate } from 'timers';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


global.Buffer = Buffer;
