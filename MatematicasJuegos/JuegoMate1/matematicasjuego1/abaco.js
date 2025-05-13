const columnValues = [1000000, 100000, 10000, 1000, 100, 10, 1];
const labels = ['Millón', 'C Mil', 'D Mil', 'U Mil', 'Centenas', 'Decenas', 'Unidades'];
let targetNumber = Math.floor(Math.random() * 10000000);
document.getElementById('target-display').textContent = targetNumber;
const targetDisplay = document.getElementById('target-display');
const resultDisplay = document.getElementById('scoreboard');

const scoreDisplay = document.getElementById('scoreboard');
const feedback = document.getElementById('feedback');
const retryBtn = document.getElementById('retry');
const correctSound = new Audio('audios/video-game-score.mp3');
const incorrectSound = new Audio('audios/wrong.mp3');
const beadSound = new Audio('audios/move.mp3');

function createLabels() {
  const labelContainer = document.getElementById('labels-container');
  labelContainer.innerHTML = '';
  labels.forEach(label => {
    const labelDiv = document.createElement('div');
    labelDiv.classList.add('label');
    labelDiv.textContent = label;
    labelContainer.appendChild(labelDiv);
  });
}

function createAbacus() {
  const container = document.getElementById('columns-container');
  container.innerHTML = '';

  columnValues.forEach((value, colIndex) => {
    const column = document.createElement('div');
    column.classList.add('column');
    column.setAttribute('data-value', value);

    const line = document.createElement('div');
    line.classList.add('line');
    column.appendChild(line);

    for (let i = 0; i < 9; i++) {
      const bead = document.createElement('div');
      bead.classList.add('bead');
      bead.style.backgroundColor = getColorByColumn(colIndex);
      bead.addEventListener('click', () => toggleBead(bead));
      bead.addEventListener('touchstart', () => toggleBead(bead));
      column.appendChild(bead);
    }

    container.appendChild(column);
  });
}

function getColorByColumn(colIndex) {
  const columnColors = ['#e74c3c', '#f1c40f', '#2ecc71', '#3498db', '#9b59b6', '#ff9800', '#00bcd4'];
  return columnColors[colIndex % columnColors.length];
}

function updateScore() {
  const columns = document.querySelectorAll('.column');
  let total = 0;

  columns.forEach((column, index) => {
    const movedBeads = column.querySelectorAll('.bead.clicked').length;
    total += movedBeads * columnValues[index];
  });

  scoreDisplay.textContent = `Número formado: ${total}`;

  if (total === targetNumber) {
    feedback.textContent = '¡Correcto!';
    correctSound.play();
  } else if (total > targetNumber) {
    feedback.textContent = 'Incorrecto, te pasaste.';
    incorrectSound.play();
  } else {
    feedback.textContent = '';
  }
}

function toggleBead(bead) {
  const column = bead.parentElement;
  const beads = Array.from(column.querySelectorAll('.bead')).reverse(); // De arriba hacia abajo
  const index = beads.indexOf(bead);

  // Permitir bajar si la anterior ya fue bajada, o es la primera
  if (!bead.classList.contains('clicked')) {
    for (let i = 0; i < index; i++) {
      if (!beads[i].classList.contains('clicked')) {
        return; // No baja si la de arriba no está abajo
      }
    }
  } else {
    for (let i = beads.length - 1; i > index; i--) {
      if (beads[i].classList.contains('clicked')) {
        return; // No sube si la de abajo no está arriba
      }
    }
  }

  bead.classList.toggle('clicked');
  beadSound.currentTime = 0;
  beadSound.play();
  updateScore();

  const currentValue = parseInt(scoreDisplay.textContent.replace(/\D/g, '')) || 0;

  if (currentValue > targetNumber) {
    feedback.textContent = 'Incorrecto, te pasaste.';
    incorrectSound.play();
  } else if (currentValue === targetNumber) {
    feedback.textContent = '¡Correcto!';
    correctSound.play();
  } else {
    feedback.textContent = '';
  }
}
function resetBeads() {
  document.querySelectorAll('.bead.clicked').forEach(bead => { bead.classList.remove('clicked'); });
}
retryBtn.addEventListener('click', () => {
  resetBeads();
  generateTargetNumber();
  feedback.textContent = '';
  updateScore();
});

document.addEventListener('DOMContentLoaded', () => {
  createLabels();
  createAbacus();
  updateScore();
});

function generateTargetNumber() {
  const newNumber = Math.floor(Math.random() * 10000000); // Número de 0 a 9,999,999
  targetNumber = newNumber;
  targetDisplay.textContent = ` ${targetNumber.toString().padStart(7, '0')}`;
}


