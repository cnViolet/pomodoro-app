let isRunning = false;
let mode = 'focus';
let timeLeft = 25 * 60;
let timer = null;

const focusBtn = document.getElementById('focusBtn');
const breakBtn = document.getElementById('breakBtn');
const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const closeBtn = document.getElementById('closeBtn');

function updateDisplay() {
  const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const s = (timeLeft % 60).toString().padStart(2, '0');
  timeDisplay.textContent = `${m}:${s}`;
}

function switchMode(newMode) {
  clearInterval(timer);
  mode = newMode;
  timeLeft = mode === 'focus' ? 25 * 60 : 5 * 60;
  isRunning = false;
  startBtn.textContent = '开始';
  focusBtn.classList.toggle('active', mode === 'focus');
  breakBtn.classList.toggle('active', mode === 'break');
  updateDisplay();
}

focusBtn.addEventListener('click', () => switchMode('focus'));
breakBtn.addEventListener('click', () => switchMode('break'));

startBtn.addEventListener('click', () => {
  if (isRunning) {
    isRunning = false;
    startBtn.textContent = '开始';
  } else {
    isRunning = true;
    startBtn.textContent = '暂停';
    timer = setInterval(() => {
      timeLeft--;
      updateDisplay();
      if (timeLeft <= 0) {
        clearInterval(timer);
        isRunning = false;
        startBtn.textContent = '开始';
        window.electronAPI.showNotification(
          mode === 'focus' ? '专注结束' : '休息结束',
          mode === 'focus' ? '开始休息一下吧！' : '继续专注工作！'
        );
        switchMode(mode === 'focus' ? 'break' : 'focus');
      }
    }, 1000);
  }
});

resetBtn.addEventListener('click', () => {
  clearInterval(timer);
  isRunning = false;
  startBtn.textContent = '开始';
  timeLeft = mode === 'focus' ? 25 * 60 : 5 * 60;
  updateDisplay();
});

closeBtn.addEventListener('click', () => {
  window.electronAPI.closeWindow();
});

updateDisplay();