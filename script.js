let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const timeDisplay = document.getElementById('time');
const lapsContainer = document.getElementById('laps');

function updateTime() {
  const currentTime = Date.now() - startTime + elapsedTime;
  const milliseconds = Math.floor((currentTime % 1000) / 10);
  const seconds = Math.floor((currentTime / 1000) % 60);
  const minutes = Math.floor((currentTime / (1000 * 60)) % 60);

  timeDisplay.textContent = `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(number) {
  return number < 10 ? '0' + number : number;
}

document.getElementById('startBtn').addEventListener('click', () => {
  if (!isRunning) {
    startTime = Date.now();
    timerInterval = setInterval(updateTime, 10);
    isRunning = true;
  }
});

document.getElementById('pauseBtn').addEventListener('click', () => {
  if (isRunning) {
    clearInterval(timerInterval);
    elapsedTime += Date.now() - startTime;
    isRunning = false;
  }
});

document.getElementById('resetBtn').addEventListener('click', () => {
  clearInterval(timerInterval);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  timeDisplay.textContent = '00:00:00';
  lapsContainer.innerHTML = '';
});

document.getElementById('lapBtn').addEventListener('click', () => {
  if (isRunning) {
    const lapTime = timeDisplay.textContent;
    const lapElement = document.createElement('p');
    lapElement.textContent = lapTime;
    lapsContainer.appendChild(lapElement);
  }
});