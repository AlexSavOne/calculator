// src/App.jsx
import "./App.css";
import { useState } from "react";

function App() {
  const [display, setDisplay] = useState("");

  const operators = ["+", "-", "*", "/"];

  const appendToDisplay = (value) => {
    const lastChar = display[display.length - 1];
    if (operators.includes(value) && operators.includes(lastChar)) {
      setDisplay(display.slice(0, -1) + value);
    } else {
      setDisplay(display + value);
    }
  };

  const clearDisplay = () => {
    setDisplay("");
  };

  const deleteLast = () => {
    setDisplay(display.slice(0, -1));
  };

  const calculateResult = () => {
    try {
      const result = eval(display);
      if (
        result === undefined ||
        result === null ||
        isNaN(result) ||
        !isFinite(result)
      ) {
        throw new Error("Invalid result");
      }
      setDisplay(result.toString());
    } catch {
      setDisplay("Error");
    }
  };

  const handleKeyDown = (event) => {
    const key = event.key;
    if ((key >= "0" && key <= "9") || operators.includes(key)) {
      appendToDisplay(key);
    } else if (key === "Backspace") {
      deleteLast();
    } else if (key === "Escape") {
      clearDisplay();
    } else if (key === "Enter") {
      calculateResult();
    }
  };

  return (
    <div className="calculator" onKeyDown={handleKeyDown} tabIndex="0">
      <input type="text" id="display" value={display} disabled />
      <div className="buttons">
        <button onClick={clearDisplay}>C</button>
        <button onClick={deleteLast}>DEL</button>
        <button onClick={() => appendToDisplay("/")}>/</button>
        <button onClick={() => appendToDisplay("*")}>*</button>
        <button onClick={() => appendToDisplay("7")}>7</button>
        <button onClick={() => appendToDisplay("8")}>8</button>
        <button onClick={() => appendToDisplay("9")}>9</button>
        <button onClick={() => appendToDisplay("-")}>-</button>
        <button onClick={() => appendToDisplay("4")}>4</button>
        <button onClick={() => appendToDisplay("5")}>5</button>
        <button onClick={() => appendToDisplay("6")}>6</button>
        <button onClick={() => appendToDisplay("+")}>+</button>
        <button onClick={() => appendToDisplay("1")}>1</button>
        <button onClick={() => appendToDisplay("2")}>2</button>
        <button onClick={() => appendToDisplay("3")}>3</button>
        <button onClick={calculateResult}>=</button>
        <button className="zero" onClick={() => appendToDisplay("0")}>
          0
        </button>
        <button onClick={() => appendToDisplay(".")}>.</button>
      </div>
    </div>
  );
}

export default App;
