// Estado centralizado do cronômetro
const timerState = {
  minutes: 0,
  seconds: 0,
  totalSeconds: 0,
  isRunning: false,
  isPaused: false,
  intervalId: null,
};

// Elementos do DOM
const elements = {
  minutesInput: document.getElementById('minutesInput'),
  secondsInput: document.getElementById('secondsInput'),
  startBtn: document.getElementById('startBtn'),
  pauseBtn: document.getElementById('pauseBtn'),
  resetBtn: document.getElementById('resetBtn'),
  timeDisplay: document.getElementById('timeDisplay'),
  timerStatus: document.getElementById('timerStatus'),
  timerForm: document.getElementById('timerForm'),
  minutesError: document.getElementById('minutesError'),
  secondsError: document.getElementById('secondsError'),
};

// Validar entrada com feedback ao usuário
function validateInput(value, fieldName, errorElement) {
  const num = Number(value);
  
  if (isNaN(num) || num < 0) {
    errorElement.textContent = `${fieldName} deve ser um número positivo`;
    return null;
  }
  
  if (num > 59 && fieldName === 'Segundos') {
    errorElement.textContent = `${fieldName} não pode exceder 59`;
    return null;
  }
  
  if (num > 999 && fieldName === 'Minutos') {
    errorElement.textContent = `${fieldName} não pode exceder 999`;
    return null;
  }
  
  errorElement.textContent = '';
  return num;
}

// Limpar erros
function clearErrors() {
  elements.minutesError.textContent = '';
  elements.secondsError.textContent = '';
}

// Formatar display com zero padding
function formatTime(mins, secs) {
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Atualizar display
function updateDisplay() {
  elements.timeDisplay.textContent = formatTime(timerState.minutes, timerState.seconds);
}

// Desabilitar/habilitar inputs
function toggleInputs(disabled) {
  elements.minutesInput.disabled = disabled;
  elements.secondsInput.disabled = disabled;
}

// Atualizar estado dos botões
function updateButtonStates() {
  const hasTime = timerState.totalSeconds > 0;
  
  elements.startBtn.disabled = timerState.isRunning || !hasTime;
  elements.pauseBtn.disabled = !timerState.isRunning;
  elements.resetBtn.disabled = !timerState.isRunning && !timerState.isPaused;
}

// Tick do cronômetro
function tick() {
  if (timerState.seconds > 0) {
    timerState.seconds--;
  } else if (timerState.minutes > 0) {
    timerState.minutes--;
    timerState.seconds = 59;
  } else {
    finishTimer();
    return;
  }
  
  updateDisplay();
}

// Iniciar cronômetro
function startTimer() {
  clearErrors();
  
  const minutes = validateInput(elements.minutesInput.value, 'Minutos', elements.minutesError);
  const seconds = validateInput(elements.secondsInput.value, 'Segundos', elements.secondsError);
  
  if (minutes === null || seconds === null) {
    return;
  }
  
  if (minutes === 0 && seconds === 0) {
    elements.minutesError.textContent = 'Digite um tempo válido';
    return;
  }
  
  timerState.minutes = minutes;
  timerState.seconds = seconds;
  timerState.totalSeconds = minutes * 60 + seconds;
  timerState.isRunning = true;
  timerState.isPaused = false;
  
  toggleInputs(true);
  updateDisplay();
  updateButtonStates();
  updateStatus('Cronômetro iniciado');
  
  // Event listener FORA do interval (evita memory leak)
  timerState.intervalId = setInterval(tick, 1000);
}

// Pausar cronômetro
function pauseTimer() {
  if (!timerState.isRunning) return;
  
  clearInterval(timerState.intervalId);
  timerState.isRunning = false;
  timerState.isPaused = true;
  
  updateButtonStates();
  updateStatus('Cronômetro pausado');
}

// Retomar cronômetro
function resumeTimer() {
  if (!timerState.isPaused) return;
  
  timerState.isRunning = true;
  timerState.isPaused = false;
  
  updateButtonStates();
  updateStatus('Cronômetro retomado');
  
  timerState.intervalId = setInterval(tick, 1000);
}

// Resetar cronômetro
function resetTimer() {
  clearInterval(timerState.intervalId);
  
  timerState.minutes = 0;
  timerState.seconds = 0;
  timerState.totalSeconds = 0;
  timerState.isRunning = false;
  timerState.isPaused = false;
  
  toggleInputs(false);
  updateDisplay();
  updateButtonStates();
  updateStatus('');
  clearErrors();
  
  elements.minutesInput.value = '0';
  elements.secondsInput.value = '0';
}

// Finalizar cronômetro
function finishTimer() {
  clearInterval(timerState.intervalId);
  timerState.isRunning = false;
  timerState.isPaused = false;
  
  toggleInputs(false);
  updateButtonStates();
  updateStatus('✓ Cronômetro finalizado!');
  playNotification();
}

// Notificação sonora (simples)
function playNotification() {
  // Usar Web Audio API ou just feedback visual
  elements.timeDisplay.style.animation = 'pulse 0.3s ease-in-out';
  setTimeout(() => {
    elements.timeDisplay.style.animation = '';
  }, 300);
}

// Atualizar mensagem de status
function updateStatus(message) {
  elements.timerStatus.textContent = message;
}

// Event listeners
elements.startBtn.addEventListener('click', () => {
  if (timerState.isPaused) {
    resumeTimer();
  } else {
    startTimer();
  }
});

elements.pauseBtn.addEventListener('click', pauseTimer);

elements.resetBtn.addEventListener('click', resetTimer);

// Prevenir submit do form
elements.timerForm.addEventListener('submit', (e) => {
  e.preventDefault();
});

// Validação em tempo real
elements.minutesInput.addEventListener('input', (e) => {
  validateInput(e.target.value, 'Minutos', elements.minutesError);
});

elements.secondsInput.addEventListener('input', (e) => {
  validateInput(e.target.value, 'Segundos', elements.secondsError);
});

// Cleanup ao sair da página
window.addEventListener('beforeunload', () => {
  clearInterval(timerState.intervalId);
});

// Inicializar display
updateDisplay();
