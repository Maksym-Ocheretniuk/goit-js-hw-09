// Імпорт з документації
import flatpickr from 'flatpickr';

// one by one
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const TIMER_DELAY = 1000;

const startBt = document.querySelector('button[data-start]');
startBt.disabled = true;

const dataInput = document.querySelector('#datetime-picker');

const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('My friend! Please choose a date in the future');
    } else {
      startBt.disabled = false;
      const timer = {
        intervalId: null,
        start() {
          const selectedTime = selectedDates[0];

          this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = selectedTime - currentTime;
            const time = convertMs(deltaTime);
            updateDataValue(time);
            if (deltaTime <= 1000) {
              clearInterval(this.intervalId);
            }
          }, TIMER_DELAY);
        },
      };

      startBt.addEventListener('click', () => {
        timer.start();
      });
    }
  },
};

flatpickr(dataInput, {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
});
flatpickr(dataInput, options);

function updateDataValue({ days, hours, minutes, seconds }) {
  dataDays.textContent = `${days}`;
  dataHours.textContent = `${hours}`;
  dataMinutes.textContent = `${minutes}`;
  dataSeconds.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  if (value <= 2000) {
    return String(value).padStart(2, '0');
  }
  return String(value).padStart(3, '0');
}

function convertMs(ms) {
  // Кількість мілісекунд
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // днів
  const days = addLeadingZero(Math.floor(ms / day));

  // годин
  const hours = addLeadingZero(Math.floor((ms % day) / hour));

  // хвилин
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));

  // секунд
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
