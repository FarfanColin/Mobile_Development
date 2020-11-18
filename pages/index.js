import React from "react";
import ReactDOM from "react-dom";
import converter from "./converter";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <converter />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
