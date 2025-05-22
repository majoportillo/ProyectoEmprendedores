const frases = [
  { oracion: "_____ el sol está brillante.", opciones: ["Hoy", "Ayer", "Mañana"], correcta: "Hoy" },
  { oracion: "_____ llovió todo el día.", opciones: ["Hoy", "Ayer", "Mañana"], correcta: "Ayer" },
  { oracion: "_____ iremos a la playa.", opciones: ["Ayer", "Mañana", "Hoy"], correcta: "Mañana" },
  { oracion: "_____ terminé mi tarea temprano.", opciones: ["Hoy", "Ayer", "Mañana"], correcta: "Ayer" },
  { oracion: "_____ tengo una presentación en clase.", opciones: ["Mañana", "Ayer", "Hoy"], correcta: "Hoy" },
  { oracion: "_____ fue mi cumpleaños.", opciones: ["Ayer", "Hoy", "Mañana"], correcta: "Ayer" },
  { oracion: "_____ celebraremos el Día del Niño.", opciones: ["Mañana", "Hoy", "Ayer"], correcta: "Mañana" },
  { oracion: "_____ vamos a jugar fútbol.", opciones: ["Hoy", "Ayer", "Mañana"], correcta: "Hoy" },
];

let indiceFrase = 0;
let respuestaSeleccionada = '';

const fraseIncompleta = document.getElementById('frase-incompleta');
const opcionesContainer = document.getElementById('opciones');
const mensaje = document.getElementById('message');
const nivelDisplay = document.getElementById('nivel-actual');

function cargarFrase() {
  mensaje.textContent = '';
  respuestaSeleccionada = '';
  const frase = frases[indiceFrase];

  fraseIncompleta.textContent = frase.oracion;

  opcionesContainer.innerHTML = '';
  frase.opciones.forEach(op => {
    const btn = document.createElement('button');
    btn.textContent = op;
    btn.onclick = () => {
      respuestaSeleccionada = op;
      document.querySelectorAll('.opciones button').forEach(b => b.classList.remove('seleccionada'));
      btn.classList.add('seleccionada');
    };
    opcionesContainer.appendChild(btn);
  });

  nivelDisplay.textContent = indiceFrase + 1;
}

function verificarFrase() {
  const frase = frases[indiceFrase];
  if (respuestaSeleccionada === '') {
    mensaje.textContent = 'Selecciona una opción.';
    return;
  }

  if (respuestaSeleccionada === frase.correcta) {
    mensaje.textContent = '✅ ¡Correcto!';
    document.getElementById('sonido-correcto').play();
  } else {
    mensaje.textContent = '❌ Intenta de nuevo.';
    document.getElementById('sonido-incorrecto').play();
  }
}

function siguienteFrase() {
  indiceFrase = (indiceFrase + 1) % frases.length;
  cargarFrase();
}

document.addEventListener('DOMContentLoaded', cargarFrase);
