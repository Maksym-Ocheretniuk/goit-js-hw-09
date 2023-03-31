// Знаходимо кнопки
const startBtnEl = document.querySelector(`[data-start]`);
const stopBtnEl = document.querySelector(`[data-stop]`);

// Знаходимо body
const body = document.body;

// Створюємо таймер
let timerId = null;

// Вішаємо слухачів подій на кнопки
startBtnEl.addEventListener('click', onStartChangeBcgColor);
stopBtnEl.addEventListener('click', onStopChangeBcgColor);

// Функція генерування випадкового кольору

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

// Функція запуску зміни кольору
function onStartChangeBcgColor() {
  startBtnEl.disabled = true;
  stopBtnEl.disabled = false;

  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

// Функція зупинки зміни кольору
function onStopChangeBcgColor() {
  startBtnEl.disabled = false;
  stopBtnEl.disabled = true;

  clearInterval(timerId);
}
