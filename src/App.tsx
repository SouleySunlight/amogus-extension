import React, { useEffect, useState } from "react";
import red from "./images/red.svg";
import blue from "./images/blue.svg";
import cyan from "./images/cyan.svg";
import green from "./images/green.svg";
import orange from "./images/orange.svg";
import pink from "./images/pink.svg";
import white from "./images/white.svg";
import yellow from "./images/yellow.svg";

import "./App.css";
import { DOMMessage, DOMMessageResponse } from "./types/DOMMessages";

function App() {
  const amogus = [red, blue, cyan, green, orange, pink, white, yellow];
  const [currentAmogus, setCurrentAmogus] = useState(red);
  const [titleList, setTitleList] = useState<string[]>([]);

  useEffect(() => {
    chrome.tabs &&
      chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
        await chrome.tabs
          .sendMessage(tabs[0].id ?? 0, {
            type: "GET_DOM",
          } as DOMMessage)
          .then((response: DOMMessageResponse) =>
            setTitleList(response.headlines)
          )
          .catch((error) => console.log(error));
      });
  }, []);

  const changeAmogus = () => {
    setCurrentAmogus(amogus[Math.floor(Math.random() * amogus.length)]);
  };
  return (
    <div className="App">
      <header className="App-header">
        <>
          <button onClick={changeAmogus}>
            <img src={currentAmogus} className="App-logo" alt="logo" />
          </button>
          <p>
            {titleList.length === 0
              ? "pas de h1 pour cet onglet"
              : titleList.map((title) => <p>{title}</p>)}
          </p>
        </>
      </header>
    </div>
  );
}

export default App;
