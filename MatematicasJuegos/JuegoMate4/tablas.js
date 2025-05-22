const zonaJuego = document.getElementById('zona-juego');
const respuestas = document.getElementById('respuestas');
const nivelTitle = document.getElementById('nivel-title');
const puntosDisplay = document.getElementById('puntos');

// Sonidos
const audioBien = document.getElementById('audioBien');
const audioMal = document.getElementById('audioMal');
const audioSiguiente = document.getElementById('audioSiguiente');

let nivelActual = 1;
let puntos = 0;

function generarPreguntas(n) {
  zonaJuego.innerHTML = '';
  respuestas.innerHTML = '';
  nivelTitle.textContent = `Nivel ${n}: Tabla del ${n}`;

  const preguntas = [];
  for (let i = 1; i <= 12; i++) {
    const resultado = i * n;
    preguntas.push({ texto: `${n} x ${i} = ___`, resultado });
  }

  preguntas.forEach((p) => {
    const div = document.createElement('div');
    div.className = 'pregunta';
    div.dataset.resultado = p.resultado;
    div.textContent = p.texto;
    div.addEventListener('dragover', (e) => e.preventDefault());
    div.addEventListener('drop', manejarDrop);
    zonaJuego.appendChild(div);
  });

  const opciones = preguntas.map(p => p.resultado);

  // Agregar opciones distractoras
  while (opciones.length < 20) {
    const random = Math.floor(Math.random() * 150);
    if (!opciones.includes(random)) {
      opciones.push(random);
    }
  }

  opciones.sort(() => Math.random() - 0.5);

  opciones.forEach((valor) => {
    const span = document.createElement('div');
    span.className = 'respuesta';
    span.textContent = valor;
    span.setAttribute('draggable', 'true');
    span.addEventListener('dragstart', manejarDragStart);
    respuestas.appendChild(span);
  });
}

function manejarDragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.textContent);
}

function manejarDrop(e) {
  const valor = parseInt(e.dataTransfer.getData('text/plain'));
  const esperado = parseInt(e.target.dataset.resultado);

  if (valor === esperado && !e.target.classList.contains('correcto')) {
    e.target.textContent = e.target.textContent.replace('___', valor);
    e.target.classList.add('correcto');
    const usada = [...document.querySelectorAll('.respuesta')].find(
      (r) => r.textContent == valor
    );
    if (usada) usada.classList.add('usada');
    puntos += 10;
    audioBien.play();
  } else {
    e.target.classList.add('incorrecto');
    puntos -= 2;
    audioMal.play();
  }

  puntosDisplay.textContent = puntos;
}

function siguienteNivel() {
  if (nivelActual < 12) {
    nivelActual++;
    generarPreguntas(nivelActual);
    audioSiguiente.play();
  } else {
    alert('🎉 ¡Has completado todas las tablas!');
  }
}

function reiniciarJuego() {
  nivelActual = 1;
  puntos = 0;
  puntosDisplay.textContent = puntos;
  generarPreguntas(nivelActual);
}

document.addEventListener('DOMContentLoaded', () => {
  generarPreguntas(nivelActual);
});
