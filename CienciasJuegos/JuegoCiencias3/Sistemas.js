const niveles = [
  {
    nombre: "Sistema Digestivo",
    imagen: "img/digestivo.png",
    partes: ["Esófago", "Estómago", "Intestino delgado", "Intestino grueso"]
  },
  {
    nombre: "Sistema Respiratorio",
    imagen: "img/respiratorio.png",
    partes: ["Nariz", "Tráquea", "Pulmones", "Bronquios"]
  },
  {
    nombre: "Sistema Circulatorio",
    imagen: "img/circulatorio.png",
    partes: ["Corazón", "Arterias", "Venas", "Sangre"]
  },
  {
    nombre: "Sistema Nervioso",
    imagen: "img/nervioso.png",
    partes: ["Cerebro", "Médula espinal", "Nervios"]
  }
];

let nivelActual = 0;
let puntos = 0;

function cargarNivel() {
  const nivel = niveles[nivelActual];
  document.getElementById("nivel-title").textContent = `Nivel ${nivelActual + 1}: ${nivel.nombre}`;
  document.querySelector(".imagen-sistema").src = nivel.imagen;

  const etiquetas = document.getElementById("etiquetas");
  etiquetas.innerHTML = "";
  const opciones = [...nivel.partes];

  while (opciones.length < 8) {
    const parteFalsa = `Parte ${Math.floor(Math.random() * 100)}`;
    if (!opciones.includes(parteFalsa)) opciones.push(parteFalsa);
  }

  opciones.sort(() => Math.random() - 0.5);

  opciones.forEach((parte) => {
    const div = document.createElement("div");
    div.className = "etiqueta";
    div.textContent = parte;
    div.draggable = true;
    div.addEventListener("dragstart", manejarDragStart);
    etiquetas.appendChild(div);
  });
}

function manejarDragStart(e) {
  e.dataTransfer.setData("text", e.target.textContent);
}

function manejarDrop(e) {
  const parte = e.dataTransfer.getData("text");
  const nivel = niveles[nivelActual];
  if (nivel.partes.includes(parte)) {
    puntos += 10;
    document.getElementById("sonido-correcto").play();
  } else {
    puntos -= 5;
    document.getElementById("sonido-incorrecto").play();
  }
  document.getElementById("puntos").textContent = puntos;
  e.target.textContent = parte;
  e.target.classList.add("etiquetado");
}

function siguienteNivel() {
  if (nivelActual < niveles.length - 1) {
    nivelActual++;
    document.getElementById("sonido-nivel").play();
    cargarNivel();
  } else {
    alert("🎉 ¡Has completado todos los niveles!");
  }
}

function reiniciarJuego() {
  nivelActual = 0;
  puntos = 0;
  document.getElementById("puntos").textContent = puntos;
  cargarNivel();
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".imagen-sistema").addEventListener("dragover", (e) => e.preventDefault());
  document.querySelector(".imagen-sistema").addEventListener("drop", manejarDrop);
  cargarNivel();
});
