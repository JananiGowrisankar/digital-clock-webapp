function updateClock() {
    const now = new Date();
    const clock = document.getElementById("clock");
    clock.innerText = now.toLocaleTimeString();
  }
  setInterval(updateClock, 1000);
  
  let startTime, interval;
  let elapsedTime = 0;
  let isRunning = false;
  
  const stopwatch = document.getElementById("stopwatch");
  const startBtn = document.getElementById("start");
  const stopBtn = document.getElementById("stop");
  const resetBtn = document.getElementById("reset");
  
  function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  }
  
  startBtn.onclick = () => {
    if (!isRunning) {
      startTime = Date.now() - elapsedTime;
      interval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        stopwatch.innerText = formatTime(elapsedTime);
      }, 1000);
      isRunning = true;
    }
  };
  
  stopBtn.onclick = () => {
    if (isRunning) {
      clearInterval(interval);
      isRunning = false;
    }
  };
  
  resetBtn.onclick = () => {
    clearInterval(interval);
    elapsedTime = 0;
    isRunning = false;
    stopwatch.innerText = "00:00:00";
  };
  