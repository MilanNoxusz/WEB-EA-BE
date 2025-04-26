import React, { useState } from "react";

const COLORS = ["red", "blue", "green", "yellow"];

function App() {
  const [secretColors, setSecretColors] = useState(generateRandomColors());
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState(["", "", "", ""]);
  const [feedback, setFeedback] = useState([]);

  function generateRandomColors() {
    return Array.from({ length: 4 }, () => COLORS[Math.floor(Math.random() * COLORS.length)]);
  }

  function handleColorChange(index, color) {
    const newGuess = [...currentGuess];
    newGuess[index] = color;
    setCurrentGuess(newGuess);
  }

  function handleSubmitGuess() {
    if (currentGuess.includes("")) {
      alert("Töltsd ki az összes mezőt!");
      return;
    }

    const feedback = calculateFeedback(currentGuess, secretColors);
    setGuesses([...guesses, currentGuess]);
    setFeedback([...feedback, feedback]);

    if (feedback.correct === 4) {
      alert("Gratulálok! Kitaláltad a kombinációt!");
    }
  }

  function calculateFeedback(guess, secret) {
    let correct = 0;
    let wrongPlace = 0;

    const secretCopy = [...secret];
    const guessCopy = [...guess];

    // Ellenőrizd a helyes pozíciókat
    for (let i = 0; i < 4; i++) {
      if (guessCopy[i] === secretCopy[i]) {
        correct++;
        secretCopy[i] = null;
        guessCopy[i] = null;
      }
    }

    // Ellenőrizd a rossz helyen lévő színeket
    for (let i = 0; i < 4; i++) {
      if (guessCopy[i] && secretCopy.includes(guessCopy[i])) {
        wrongPlace++;
        secretCopy[secretCopy.indexOf(guessCopy[i])] = null;
      }
    }

    return { correct, wrongPlace };
  }

  function resetGame() {
    setSecretColors(generateRandomColors());
    setGuesses([]);
    setCurrentGuess(["", "", "", ""]);
    setFeedback([]);
  }

  return (
    <div>
      <h1>Színes Kombináció Játék</h1>
      <p>Találd ki a 4 színből álló kombinációt!</p>
      <div>
        {currentGuess.map((color, index) => (
          <select
            key={index}
            value={color}
            onChange={(e) => handleColorChange(index, e.target.value)}
          >
            <option value="">Válassz színt</option>
            {COLORS.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        ))}
        <button onClick={handleSubmitGuess}>Tipp</button>
      </div>
      <button onClick={resetGame}>Új játék</button>
      <h2>Próbálkozások</h2>
      <ul>
        {guesses.map((guess, index) => (
          <li key={index}>
            {guess.join(", ")} - Helyes: {feedback[index]?.correct || 0}, Rossz helyen: {feedback[index]?.wrongPlace || 0}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;