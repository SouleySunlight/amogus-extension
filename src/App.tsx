import React, { useEffect, useMemo, useState } from "react";
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
import { getBitGrid, hash } from "./utils";

function App() {
  const amogus = [red, blue, cyan, green, orange, pink, white, yellow];
  const [currentAmogus, setCurrentAmogus] = useState(red);
  const [addedCode, setAddedCode] = useState("");
  const [hashedCode, setHashedCode] = useState("");

  hash(addedCode).then((result) => setHashedCode(result));
  const bitsGrid = useMemo(() => getBitGrid(hashedCode), [hashedCode]);

  const primaryAmogus = amogus[parseInt(bitsGrid[0].slice(0, 3), 2)];
  const secondaryAmogus = amogus[parseInt(bitsGrid[1].slice(0, 3), 2)];

  useEffect(() => {
    chrome.tabs &&
      chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
        await chrome.tabs
          .sendMessage(tabs[0].id ?? 0, {
            type: "GET_DOM",
          } as DOMMessage)
          .then((response: DOMMessageResponse) =>
            setAddedCode(response.addedCode)
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
          {addedCode === "" && (
            <button onClick={changeAmogus}>
              <img src={currentAmogus} className="App-logo" alt="logo" />
            </button>
          )}

          {addedCode === "" ? (
            "Rendez vous sur un commit sur github puis relancer l'extension"
          ) : (
            <div className="amogus-grid-container">
              {bitsGrid.map((bitLine) => {
                const bitLineArray = Object.assign([], bitLine);
                return (
                  <div className="amogus-grid-line">
                    {bitLineArray.map((bit) => {
                      return (
                        <img
                          src={bit === "1" ? primaryAmogus : secondaryAmogus}
                          className="grid-amogus"
                          alt="amogus"
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </>
      </header>
    </div>
  );
}

export default App;
