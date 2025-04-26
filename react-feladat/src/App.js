import React from "react";
import Game from "./Game";
import "./App.css";

function App() {
  return (
    <div>
      <nav>
        <ul className="menu">
          <li><a href="index.html">Főoldal</a></li>
          <li><a href="tabla.html">Táblázat</a></li>
          <li><a href="html5.html">HTML5 menük</a></li>
          <li><a href="diagram.html">Diagram</a></li>
          <li><a href="ajax.html">AJAX</a></li>
          <li><a href="oojs.html">OOJS</a></li>
          <li><a href="react.html" className="active">React</a></li>
        </ul>
      </nav>
      <div className="game-container">
        <h1>Kő-Papír-Olló Játék</h1>
        <Game />
      </div>
    </div>
  );
}

export default App;