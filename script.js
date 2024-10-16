function appendToDisplay(value) {
  const display = document.getElementById('display');
  display.value += value;
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
    display.value = eval(display.value) || '';
  } catch {
    display.value = 'Error';
  }
}

// Обработка нажатий клавиш
document.addEventListener('keydown', function (event) {
  const key = event.key;

  // Проверка на разрешённые клавиши
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
