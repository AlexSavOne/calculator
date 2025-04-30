// src\components\Calculator.jsx
import React, { useState, useRef, useEffect } from "react";
import Display from "./Display";
import Button from "./Button";
import History from "./History";
import { evaluate } from "mathjs";

const Calculator = () => {
  const [display, setDisplay] = useState("");
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const operators = ["+", "-", "*", "/"];
  const appRef = useRef(null);

  const appendToDisplay = (value) => {
    if (error) {
      resetDisplay(value);
    } else {
      handleDisplayUpdate(value);
    }
  };

  const resetDisplay = (value) => {
    setDisplay(value);
    setError(null);
  };

  const handleDisplayUpdate = (value) => {
    const lastChar = display[display.length - 1];

    if (value === "," && display.includes(",")) return;

    if (operators.includes(value) && operators.includes(lastChar)) {
      setDisplay(display.slice(0, -1) + value);
    } else {
      setDisplay(display + value);
    }
  };

  const clearDisplay = () => {
    setDisplay("");
    setError(null);
  };

  const deleteLast = () => setDisplay(display.slice(0, -1));

  const calculateResult = () => {
    try {
      const formattedDisplay = display.replace(",", ".");
      const result = evaluate(formattedDisplay);

      if (isNaN(result) || !isFinite(result)) throw new Error("Invalid result");
      
      // Добавляем вычисление в историю
      setHistory(prevHistory => [
        {
          expression: display,
          result: result.toString()
        },
        ...prevHistory
      ].slice(0, 10)); // Ограничиваем историю 10 последними вычислениями
      
      setDisplay(result.toString());
      setError(null);
    } catch (e) {
      handleError(e);
    }
  };

  const handleError = (e) => {
    let errorMessage = "Error";

    if (e.message.includes("Invalid result")) {
      errorMessage = "Неверный результат";
    } else if (e.message.includes("divide by zero")) {
      errorMessage = "Деление на ноль";
    } else {
      errorMessage = "Неверный формат ввода";
    }

    setDisplay(errorMessage);
    setError(errorMessage);
  };

  const handleKeyDown = (event) => {
    const key = event.key;
    if ((key >= "0" && key <= "9") || operators.includes(key)) {
      appendToDisplay(key);
    } else if (key === ",") {
      appendToDisplay(",");
    } else if (key === "Backspace") {
      deleteLast();
    } else if (key === "Escape") {
      clearDisplay();
    } else if (key === "Enter") {
      calculateResult();
    }
  };

  const handleSelectResult = (result) => {
    setDisplay(result);
    setError(null);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  useEffect(() => {
    appRef.current?.focus();
  }, []);

  return (
    <div className="calculator-container">
      <div className="calculator" ref={appRef} onKeyDown={handleKeyDown} tabIndex="0">
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
          <Button label="0" onClick={() => appendToDisplay("0")} className="zero" />
          <Button label="," onClick={() => appendToDisplay(",")} />
        </div>
      </div>
      <History 
        history={history} 
        onSelectResult={handleSelectResult} 
        onClearHistory={clearHistory}
      />
    </div>
  );
};

export default Calculator;
