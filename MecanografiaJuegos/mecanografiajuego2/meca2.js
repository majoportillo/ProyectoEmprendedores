const wordDisplay = document.getElementById('word-display');
const inputBox = document.getElementById('input-box');
const scoreEl = document.getElementById('score');
const mistakesEl = document.getElementById('mistakes');
const timerEl = document.getElementById('timer');
const keys = document.querySelectorAll('.key');
const bonusMessage = document.getElementById('bonusMessage');

const correctSound = new Audio('audio/correct.mp3');
const wrongSound = new Audio('audio/wrong.mp3');
const bonusSound = new Audio('audio/video-game-bonus.mp3');
const loseSound = new Audio('audio/video-game-lose-sound.mp3');
const milestoneSound = new Audio('audio/video-game-score.mp3'); // El sonido de victoria

let currentWord = '';
let score = 0;
let mistakes = 0;
let timeLeft = 60; // Temporizador en segundos
let typingTimeout;

// Lista de palabras en español
const words = [
  "elefante", "mecanografia", "pantalon", "zapato", "computadora", "programacion", "javascript",
  "desarrollador", "teclado", "pantalla", "abecedario", "bicicleta", "perro", "gato", "escritorio",
  "ventana", "ordenador", "dinosaurio", "pelicula", "musica", "zapateria"
];

function generateRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function updateScoreboard() {
  scoreEl.textContent = score;
  mistakesEl.textContent = mistakes;
}

function startNewWord() {
  currentWord = generateRandomWord(); // Genera una palabra aleatoria
  wordDisplay.textContent = currentWord;
  inputBox.value = ''; // Limpia el campo de entrada
  inputBox.focus();
}

function resetGame() {
  score = 0;
  mistakes = 0;
  timeLeft = 60;
  updateScoreboard();
  startNewWord();
  startTimer();
}

function startTimer() {
  clearInterval(typingTimeout);
  typingTimeout = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(typingTimeout);
      loseSound.play(); // Sonido al terminar el tiempo
      alert("¡El tiempo se ha agotado!");
      resetGame();
    }
  }, 1000);
}

function highlightKey(key, status) {
  keys.forEach(k => {
    if (k.dataset.key === key) {
      k.classList.add(status);
      setTimeout(() => k.classList.remove(status), 500);
    }
  });
}

// Función para detectar si la tecla presionada es correcta o incorrecta
function checkKeyPress(e) {
  const pressedKey = e.key.toLowerCase(); // Asegura que la letra sea en minúscula

  // Verifica si la letra presionada es la correcta
  if (pressedKey === currentWord[0]) {
    correctSound.play();
    currentWord = currentWord.slice(1); // Elimina la letra correcta
    wordDisplay.textContent = currentWord;

    if (currentWord === '') { // Cuando se termina la palabra
      score++;
      updateScoreboard();
      inputBox.value = ''; // Limpia el campo de entrada
      if (score % 10 === 0) {
        bonusSound.play();
      }
      if (score === 50) {  // Sonido de victoria al llegar a 50 aciertos
        milestoneSound.play();
      }
      if (score === 100) {
        milestoneSound.play();
        bonusMessage.textContent = "¡Sigue así!";
      }
      startNewWord();
    }
  } else {
    if (currentWord.length > 0) { // Si la letra presionada no coincide
      mistakes++;
      updateScoreboard();
      wrongSound.play();
      highlightKey(pressedKey, 'wrong');
    }
  }
}

inputBox.addEventListener('input', checkKeyPress); // Detecta la tecla presionada

document.addEventListener('keydown', checkKeyPress); // Detecta la tecla presionada

// Inicializa el juego
resetGame();
