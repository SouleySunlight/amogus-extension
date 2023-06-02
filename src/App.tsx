import React, { useState } from "react";
import red from "./images/red.svg";
import blue from "./images/blue.svg";
import cyan from "./images/cyan.svg";
import green from "./images/green.svg";
import orange from "./images/orange.svg";
import pink from "./images/pink.svg";
import white from "./images/white.svg";
import yellow from "./images/yellow.svg";

import "./App.css";

function App() {
  const amogus = [red, blue, cyan, green, orange, pink, white, yellow];
  const [currentAmogus, setCurrentAmogus] = useState(red);

  const changeAmogus = () => {
    setCurrentAmogus(amogus[Math.floor(Math.random() * amogus.length)]);
  };
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={changeAmogus}>
          <img src={currentAmogus} className="App-logo" alt="logo" />
        </button>
      </header>
    </div>
  );
}

export default App;
