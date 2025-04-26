import React, { useState } from "react";

function Game() {
  const [userChoice, setUserChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");

  const choices = ["Kő", "Papír", "Olló"];

  const playGame = (userSelection) => {
    setUserChoice(userSelection);

    // Véletlenszerű választás a számítógép részéről
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerSelection = choices[randomIndex];
    setComputerChoice(computerSelection);

    // Eredmény meghatározása
    if (userSelection === computerSelection) {
      setResult("Döntetlen!");
    } else if (
      (userSelection === "Kő" && computerSelection === "Olló") ||
      (userSelection === "Papír" && computerSelection === "Kő") ||
      (userSelection === "Olló" && computerSelection === "Papír")
    ) {
      setResult("Nyertél!");
    } else {
      setResult("Vesztettél!");
    }
  };

  return (
    <div>
      <div>
        {choices.map((choice) => (
          <button key={choice} onClick={() => playGame(choice)}>
            {choice}
          </button>
        ))}
      </div>
      <div className="result">
        <h2>Te választottad: {userChoice}</h2>
        <h2>Számítógép választása: {computerChoice}</h2>
        <h2>Eredmény: {result}</h2>
      </div>
    </div>
  );
}

export default Game;