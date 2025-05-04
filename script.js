// --- Theme Toggle ---
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
  const newTheme = document.documentElement.getAttribute('data-theme') === 'dark'
    ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  themeBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

// --- Digital Clock ---
const clockDisplay = document.getElementById('clock');
function updateClock() {
  const now = new Date();
  clockDisplay.textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);

// --- Timer ---
const timerDisplay = document.getElementById('timer-display');
const startStopBtn = document.getElementById('start-stop');
const resetBtn = document.getElementById('reset');
let timerInterval;
let timerTime = 25 * 60; // 25 minutes in seconds
let isTimerRunning = false;

startStopBtn.addEventListener('click', () => {
  if (isTimerRunning) {
    clearInterval(timerInterval);
    startStopBtn.textContent = 'START';
  } else {
    startStopBtn.textContent = 'STOP';
    timerInterval = setInterval(() => {
      timerTime--;
      updateTimerDisplay();
      if (timerTime <= 0) {
        clearInterval(timerInterval);
        startStopBtn.textContent = 'START';
        timerTime = 25 * 60; // Reset to 25 minutes
      }
    }, 1000);
  }
  isTimerRunning = !isTimerRunning;
});

resetBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  timerTime = 25 * 60;
  updateTimerDisplay();
  startStopBtn.textContent = 'START';
  isTimerRunning = false;
});

function updateTimerDisplay() {
  const minutes = Math.floor(timerTime / 60);
  const seconds = timerTime % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// --- Lap Timer ---
const lapDisplay = document.getElementById('lap-display');
let lapInterval;
let lapTime = 0;

const startLapBtn = document.getElementById('start-lap');
const stopLapBtn = document.getElementById('stop-lap');
const resetLapBtn = document.getElementById('reset-lap');
const lapList = document.getElementById('lap-list');

startLapBtn.addEventListener('click', () => {
  lapInterval = setInterval(() => {
    lapTime++;
    updateLapDisplay();
  }, 1000);
  startLapBtn.disabled = true;
  stopLapBtn.disabled = false;
  resetLapBtn.disabled = false;
});

stopLapBtn.addEventListener('click', () => {
  clearInterval(lapInterval);
  startLapBtn.disabled = false;
  stopLapBtn.disabled = true;
  lapList.innerHTML += `<li>${formatTime(lapTime)}</li>`;
});

resetLapBtn.addEventListener('click', () => {
  clearInterval(lapInterval);
  lapTime = 0;
  updateLapDisplay();
  lapList.innerHTML = '';
  startLapBtn.disabled = false;
  stopLapBtn.disabled = true;
});

function updateLapDisplay() {
  lapDisplay.textContent = formatTime(lapTime);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}
