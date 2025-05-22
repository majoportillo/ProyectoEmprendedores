let nivelActual = 0;

const niveles = document.querySelectorAll(".nivel");
const palabras = document.querySelectorAll(".palabra");
const audioBien = document.getElementById("sonido-bien");
const audioMal = document.getElementById("sonido-mal");
const audioWin = document.getElementById("sonido-siguiente");

function cargarNivel(n) {
  niveles.forEach((nivel, index) => {
    nivel.classList.toggle("active", index === n);
  });
  activarPalabrasDelNivel(n);
}

function activarPalabrasDelNivel(n) {
  const nivel = niveles[n];
  const palabras = nivel.querySelectorAll(".palabra");

  palabras.forEach(p => {
    p.addEventListener("dragstart", e => {
      if (p.classList.contains("usada")) {
        e.preventDefault();
        return;
      }
      e.dataTransfer.setData("text/plain", p.textContent.trim().toLowerCase());
      e.dataTransfer.setData("id", p.textContent.trim());
    });
  });
}


const zonas = document.querySelectorAll('.drop-area');
zonas.forEach(z => {
  z.addEventListener('dragover', e => e.preventDefault());
  z.addEventListener('drop', e => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    const id = e.dataTransfer.getData('id');
    const correcta = z.dataset.parte.toLowerCase();

    if (z.classList.contains("correcto")) return;

    if (data === correcta) {
      z.textContent = id;
      z.classList.remove("incorrecto");
      z.classList.add("correcto");
      const palabra = [...palabras].find(p => p.textContent.trim().toLowerCase() === data);
      if (palabra) palabra.classList.add("usada");
      audioBien.play();
    } else {
      z.textContent = "❌";
      z.classList.remove("correcto");
      z.classList.add("incorrecto");
      audioMal.play();
    }
  });
});

function siguienteNivel() {
  if (nivelActual < niveles.length - 1) {
    nivelActual++;
    cargarNivel(nivelActual);
    audioWin.play();
  } else {
    alert("🎉 ¡Has completado todos los niveles!");
  }
}

function reiniciarJuego() {
  nivelActual = 0;
  cargarNivel(nivelActual);
  document.querySelectorAll('.drop-area').forEach(z => {
    z.textContent = "";
    z.classList.remove("correcto", "incorrecto");
  });
  document.querySelectorAll('.palabra').forEach(p => p.classList.remove("usada"));
}

document.addEventListener("DOMContentLoaded", () => cargarNivel(nivelActual));



