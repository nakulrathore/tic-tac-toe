import React, { useState } from "react";
import PlayerElement from "./ui-components/player-element";
import "./App.scss";

function App() {
  const [selectedSide, setSelectedSide] = useState(); // o/x
  const [playMode, setPlayMode] = useState(); // ai/friend
  const [currentTurnOf, setCurrentTurn] = useState(); // x/o
  const [viewState, setViewState] = useState("selector"); // selector/play-area
  const [gameState, setGameState] = useState([...new Array(9)]);

  const selectSide = (which) => {
    setSelectedSide(which);
    setCurrentTurn(which);
  };

  const fillPlayableGrid = (gridLocation) => {
    const boardCopy = [...gameState];
    if (boardCopy[gridLocation] === undefined) {
      boardCopy[gridLocation] = currentTurnOf;
      setGameState(boardCopy);
      setCurrentTurn(currentTurnOf === "x" ? "o" : "x");
    }
  };

  const reset = () => {
    window.location.reload();
  };

  return (
    <div className="App">
      <section
        className={`initial-selection-view ${
          viewState !== "selector" ? "hidden" : ""
        }`}
      >
        <p className={`instruction ${!playMode ? "hidden" : ""}`}>
          Pick your side
        </p>
        <section className={`selection-wrapper ${playMode ? "in-prompt" : ""}`}>
          <PlayerElement
            which="x"
            selected={selectedSide}
            selectSide={selectSide}
          />
          <PlayerElement
            which="o"
            selected={selectedSide}
            selectSide={selectSide}
          />
        </section>
        <section className={`selection-prompt ${playMode ? "hidden" : ""}`}>
          <p>Choose your play mode</p>
          <button
            onClick={() => setPlayMode("ai")}
            className="ai"
            disabled={playMode ? "true" : ""}
          >
            With AI
          </button>
          <button
            onClick={() => setPlayMode("friend")}
            disabled={playMode ? "true" : ""}
          >
            With a friend
          </button>
        </section>
        <button
          className={`continue ${playMode ? "show" : ""}`}
          onClick={() => {
            setViewState("play-area");
          }}
        >
          Continue
        </button>
      </section>

      <section
        className={`playable-area ${viewState !== "selector" ? "visible" : ""}`}
      >
        <section className="player-stat">
          <>you</>
          <button>0 - 0</button>
          <>{playMode}</>
        </section>
        <p className="turn-info">
          its {currentTurnOf === selectedSide ? "your" : playMode + "'s"} turn
        </p>
        <section className="playable-grid">
          {[...new Array(9)].map((i, index) => (
            <div
              key={index}
              className="one-block"
              onClick={() => fillPlayableGrid(index)}
            >
              {gameState[index] === "x" ? (
                <PlayerElement
                  which="x"
                  selectSide={selectSide}
                  mode="playing"
                />
              ) : gameState[index] === "o" ? (
                <PlayerElement
                  which="o"
                  selectSide={selectSide}
                  mode="playing"
                />
              ) : null}
            </div>
          ))}
        </section>
        <p>game mechanics and ai is not implemented yet, its just ui</p>
        <button onClick={reset}>Reset UI</button>
      </section>
    </div>
  );
}

export default App;
