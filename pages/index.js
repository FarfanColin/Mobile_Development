import React from "react";
import ReactDOM from "react-dom";
import CONVERTER from "./CONVERTER";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <CONVERTER />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
