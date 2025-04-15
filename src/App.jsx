// src/App.jsx
import "./App.css";
import { useState, useEffect, useRef } from "react";
import Display from "./components/Display";
import Button from "./components/Button";

function App() {
  const [display, setDisplay] = useState("");
  const operators = ["+", "-", "*", "/"];
  const appRef = useRef(null);

  const appendToDisplay = (value) => {
    const lastChar = display[display.length - 1];
    if (operators.includes(value) && operators.includes(lastChar)) {
      setDisplay(display.slice(0, -1) + value);
    } else {
      setDisplay(display + value);
    }
  };

  const clearDisplay = () => setDisplay("");
  const deleteLast = () => setDisplay(display.slice(0, -1));

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

  useEffect(() => {
    const ref = appRef.current;
    if (ref) {
      ref.focus();
    }
  }, []);

  return (
    <div
      className="calculator"
      ref={appRef}
      onKeyDown={handleKeyDown}
      tabIndex="0"
    >
      <Display value={display} />
      <div className="buttons">
        <Button label="C" onClick={clearDisplay} />
        <Button label="DEL" onClick={deleteLast} />
        <Button label="/" onClick={() => appendToDisplay("/")} />
        <Button label="*" onClick={() => appendToDisplay("*")} />
        <Button label="7" onClick={() => appendToDisplay("7")} />
        <Button label="8" onClick={() => appendToDisplay("8")} />
        <Button label="9" onClick={() => appendToDisplay("9")} />
        <Button label="-" onClick={() => appendToDisplay("-")} />
        <Button label="4" onClick={() => appendToDisplay("4")} />
        <Button label="5" onClick={() => appendToDisplay("5")} />
        <Button label="6" onClick={() => appendToDisplay("6")} />
        <Button label="+" onClick={() => appendToDisplay("+")} />
        <Button label="1" onClick={() => appendToDisplay("1")} />
        <Button label="2" onClick={() => appendToDisplay("2")} />
        <Button label="3" onClick={() => appendToDisplay("3")} />
        <Button label="=" onClick={calculateResult} />
        <Button
          label="0"
          onClick={() => appendToDisplay("0")}
          className="zero"
        />
        <Button label="." onClick={() => appendToDisplay(".")} />
      </div>
    </div>
  );
}

export default App;
