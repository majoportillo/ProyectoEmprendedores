const keyDisplay = document.getElementById('key-display');
const keys = document.querySelectorAll('.key');
const scoreEl = document.getElementById('score');
const mistakesEl = document.getElementById('mistakes');
const bonusMessage = document.getElementById('bonusMessage');

let currentKey = '';
let score = 0;
let mistakes = 0;

// 🎵 Audios
const correctSound = new Audio('audio/correct.mp3');
const wrongSound = new Audio('audio/wrong.mp3');
const bonusSound = new Audio('audio/video-game-bonus.mp3');
const loseSound = new Audio('audio/video-game-lose-sound.mp3');
const milestoneSound = new Audio('audio/video-game-score.mp3');

function getRandomKey() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return letters[Math.floor(Math.random() * letters.length)];
}

function getFingerClass(key) {
  const element = [...keys].find(k => k.dataset.key === key);
  if (element) {
    return [...element.classList].find(cls =>
      ['pinky', 'ring', 'middle', 'index'].includes(cls)
    );
  }
  return '';
}

function setNewKey() {
  currentKey = getRandomKey();
  const finger = getFingerClass(currentKey);
  keyDisplay.textContent = currentKey;
  keyDisplay.className = `finger-color ${finger}`;
}

function highlightKey(key, status) {
  keys.forEach(k => {
    if (k.dataset.key === key) {
      k.classList.add(status);
      setTimeout(() => k.classList.remove(status), 500);
    }
  });
}

function updateScoreboard() {
  scoreEl.textContent = score;
  mistakesEl.textContent = mistakes;
}

function resetScore() {
  score = 0;
  mistakes = 0;
  bonusMessage.textContent = '';
  updateScoreboard();
  setNewKey();
}

// Evento principal de teclado
document.addEventListener('keydown', e => {
  const pressed = e.key.toUpperCase();
  if (!/^[A-Z]$/.test(pressed)) return;

  if (pressed === currentKey) {
    correctSound.currentTime = 0;
    correctSound.play();

    score++;
    updateScoreboard();

    if (score % 10 === 0 && score < 100) {
      bonusSound.currentTime = 0;
      bonusSound.play();
    }

    if (score === 100) {
      milestoneSound.currentTime = 0;
      milestoneSound.play();
      bonusMessage.textContent = "¡Sigue así!";
    }

    highlightKey(pressed, 'correct');
    setNewKey();
  } else {
    wrongSound.currentTime = 0;
    wrongSound.play();

    mistakes++;
    updateScoreboard();

    if (mistakes > 10) {
      loseSound.currentTime = 0;
      loseSound.play();
      alert("¡Oops! Muchos errores. Reiniciando...");
      resetScore();
    }

    highlightKey(pressed, 'wrong');
  }
});

// Inicializar primer tecla
setNewKey();


scoreEl.textContent = score;
mistakesEl.textContent = mistakes;
