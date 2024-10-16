function appendToDisplay(value) {
  const display = document.getElementById('display');
  const lastChar = display.value[display.value.length - 1];
  const operators = ['+', '-', '*', '/'];

  if (operators.includes(value) && operators.includes(lastChar)) {
    display.value = display.value.slice(0, -1) + value;
  } else {
    display.value += value;
  }
}

function clearDisplay() {
  document.getElementById('display').value = '';
}

function deleteLast() {
  const display = document.getElementById('display');
  display.value = display.value.slice(0, -1);
}

function calculateResult() {
  const display = document.getElementById('display');
  try {
    const result = eval(display.value);
    if (result === undefined || result === null || isNaN(result) || !isFinite(result)) {
      throw new Error('Invalid result');
    }
    display.value = result;
  } catch (error) {
    display.value = 'Error';
  }
}

document.addEventListener('keydown', function (event) {
  const key = event.key;
  if ((key >= '0' && key <= '9') || ['+', '-', '*', '/'].includes(key)) {
    appendToDisplay(key);
  } else if (key === 'Backspace') {
    deleteLast();
  } else if (key === 'Escape') {
    clearDisplay();
  } else if (key === 'Enter') {
    calculateResult();
  }
});
