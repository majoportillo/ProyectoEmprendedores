const niveles = [
  {
    nombre: "Nivel 1: Sustantivos y Verbos",
    categorias: ["sustantivo", "verbo"],
    palabras: [
      { palabra: "leer", categoria: "verbo" },
      { palabra: "gato", categoria: "sustantivo" },
      { palabra: "correr", categoria: "verbo" },
      { palabra: "mesa", categoria: "sustantivo" },
      { palabra: "comer", categoria: "verbo" },
      { palabra: "escuela", categoria: "sustantivo" },
      { palabra: "hablar", categoria: "verbo" },
      { palabra: "coche", categoria: "sustantivo" },
      { palabra: "bailar", categoria: "verbo" },
      { palabra: "casa", categoria: "sustantivo" },
      { palabra: "lavar", categoria: "verbo" },
      { palabra: "silla", categoria: "sustantivo" },
      { palabra: "cocinar", categoria: "verbo" },
      { palabra: "jardín", categoria: "sustantivo" },
      { palabra: "dibujar", categoria: "verbo" },
      { palabra: "ventana", categoria: "sustantivo" }
    ]
  },
  {
    nombre: "Nivel 2: Sustantivos y Verbos",
    categorias: ["sustantivo", "verbo"],
    palabras: [
      { palabra: "jugar", categoria: "verbo" },
      { palabra: "pelota", categoria: "sustantivo" },
      { palabra: "escribir", categoria: "verbo" },
      { palabra: "libro", categoria: "sustantivo" },
      { palabra: "cantar", categoria: "verbo" },
      { palabra: "perro", categoria: "sustantivo" },
      { palabra: "pintar", categoria: "verbo" },
      { palabra: "cuadro", categoria: "sustantivo" },
      { palabra: "saltando", categoria: "verbo" },
      { palabra: "flor", categoria: "sustantivo" },
      { palabra: "caminar", categoria: "verbo" },
      { palabra: "árbol", categoria: "sustantivo" },
      { palabra: "llover", categoria: "verbo" },
      { palabra: "ratón", categoria: "sustantivo" },
      { palabra: "nadar", categoria: "verbo" },
      { palabra: "pájaro", categoria: "sustantivo" },
      { palabra: "estudiar", categoria: "verbo" },
      { palabra: "sombrero", categoria: "sustantivo" },
      { palabra: "tocar", categoria: "verbo" },
      { palabra: "carta", categoria: "sustantivo" }
    ]
  },
  {
    nombre: "Nivel 3: Adjetivos y Sustantivos",
    categorias: ["adjetivo", "sustantivo"],
    palabras: [
      { palabra: "alegre", categoria: "adjetivo" },
      { palabra: "niño", categoria: "sustantivo" },
      { palabra: "rojo", categoria: "adjetivo" },
      { palabra: "flor", categoria: "sustantivo" },
      { palabra: "rápido", categoria: "adjetivo" },
      { palabra: "árbol", categoria: "sustantivo" },
      { palabra: "alto", categoria: "adjetivo" },
      { palabra: "edificio", categoria: "sustantivo" },
      { palabra: "pequeño", categoria: "adjetivo" },
      { palabra: "ratón", categoria: "sustantivo" },
      { palabra: "inteligente", categoria: "adjetivo" },
      { palabra: "perro", categoria: "sustantivo" },
      { palabra: "hermoso", categoria: "adjetivo" },
      { palabra: "coche", categoria: "sustantivo" },
      { palabra: "divertido", categoria: "adjetivo" },
      { palabra: "juguete", categoria: "sustantivo" },
      { palabra: "sabroso", categoria: "adjetivo" },
      { palabra: "comida", categoria: "sustantivo" },
      { palabra: "tranquilo", categoria: "adjetivo" },
      { palabra: "río", categoria: "sustantivo" }
    ]
  },
  {
    nombre: "Nivel 4: Adjetivos y Sustantivos (2)",
    categorias: ["adjetivo", "sustantivo"],
    palabras: [
      { palabra: "bonito", categoria: "adjetivo" },
      { palabra: "bolsa", categoria: "sustantivo" },
      { palabra: "grande", categoria: "adjetivo" },
      { palabra: "casa", categoria: "sustantivo" },
      { palabra: "feo", categoria: "adjetivo" },
      { palabra: "mesa", categoria: "sustantivo" },
      { palabra: "largo", categoria: "adjetivo" },
      { palabra: "camión", categoria: "sustantivo" },
      { palabra: "corto", categoria: "adjetivo" },
      { palabra: "silla", categoria: "sustantivo" },
      { palabra: "delgado", categoria: "adjetivo" },
      { palabra: "cebra", categoria: "sustantivo" },
      { palabra: "gordo", categoria: "adjetivo" },
      { palabra: "pizza", categoria: "sustantivo" },
      { palabra: "delicioso", categoria: "adjetivo" },
      { palabra: "pastel", categoria: "sustantivo" },
      { palabra: "frío", categoria: "adjetivo" },
      { palabra: "helado", categoria: "sustantivo" },
      { palabra: "lento", categoria: "adjetivo" },
      { palabra: "tortuga", categoria: "sustantivo" }
    ]
  },
  {
    nombre: "Nivel 5: Familias de Palabras (1)",
    categorias: ["familia_pan", "familia_pintar"],
    palabras: [
      { palabra: "pan", categoria: "familia_pan" },
      { palabra: "panadería", categoria: "familia_pan" },
      { palabra: "panecillo", categoria: "familia_pan" },
      { palabra: "pintor", categoria: "familia_pintar" },
      { palabra: "pintura", categoria: "familia_pintar" },
      { palabra: "pintoresco", categoria: "familia_pintar" },
      { palabra: "pancito", categoria: "familia_pan" },
      { palabra: "panes", categoria: "familia_pan" },
      { palabra: "panadero", categoria: "familia_pan" },
      { palabra: "repintar", categoria: "familia_pintar" },
      { palabra: "pintar", categoria: "familia_pintar" },
      { palabra: "pintado", categoria: "familia_pintar" }
    ]
  },
];


let nivelActual = 0;
let puntos = 0;

function cargarNivel() {
  const nivel = niveles[nivelActual];
  document.getElementById("nivel").textContent = nivel.nombre;

  const contenedorPalabras = document.getElementById("palabras-container");
  contenedorPalabras.innerHTML = "";

  nivel.palabras.forEach((item, index) => {
    const palabra = document.createElement("div");
    palabra.className = "palabra";
    palabra.textContent = item.palabra;
    palabra.setAttribute("draggable", true);
    palabra.setAttribute("data-categoria", item.categoria);
    palabra.addEventListener("dragstart", drag);
    contenedorPalabras.appendChild(palabra);
  });

  const contenedorCategorias = document.getElementById("categorias-container");
  contenedorCategorias.innerHTML = "";
  nivel.categorias.forEach(categoria => {
    const zona = document.createElement("div");
    zona.className = "categoria";
    zona.id = categoria;
    zona.innerHTML = `<strong>${categoria.charAt(0).toUpperCase() + categoria.slice(1)}</strong><div class="zona-palabras"></div>`;
    zona.ondrop = drop;
    zona.ondragover = allowDrop;
    contenedorCategorias.appendChild(zona);
  });
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.textContent);
  ev.dataTransfer.setData("categoria", ev.target.getAttribute("data-categoria"));
}

function drop(ev) {
  ev.preventDefault();
  const texto = ev.dataTransfer.getData("text");
  const categoria = ev.dataTransfer.getData("categoria");
  const zona = ev.target.closest(".categoria"); 

  const palabra = Array.from(document.querySelectorAll(`.palabra[data-categoria="${categoria}"]`))
                       .find(p => p.textContent === texto && !p.classList.contains("usada"));
    if (!palabra || !zona) return;
    
    if (categoria === zona.id) {
    puntos++;
    document.getElementById("sonido-bien").play();
    const zonaPalabras = zona.querySelector(".zona-palabras");
    zonaPalabras.appendChild(palabra);
    palabra.classList.add("usada");
    palabra.setAttribute("draggable", false);
    } else {
        document.getElementById("sonido-mal").play();
    }
    document.getElementById("puntos").textContent = `Puntos:  ${puntos}`;
    const totalPalabras = niveles[nivelActual].palabras.length;
    const usadas = document.querySelectorAll(".palabra.usada").length;

    if (usadas === totalPalabras) {
        document.getElementById("mensaje-nivel").textContent = "¡Muy bien! Nivel completado ✅";
        setTimeout(() => {
        siguienteNivel();
        document.getElementById("mensaje-nivel").textContent = "";
        }, 2000);
    }
}

function siguienteNivel() {
  if (nivelActual < niveles.length - 1) {
    nivelActual++;
    cargarNivel();
    document.getElementById("sonido-siguiente").play();
  } else {
    alert("¡Has completado todos los niveles!");
  }
}

function reiniciarJuego() {
  nivelActual = 0;
  puntos = 0;
  document.getElementById("puntos").textContent = "Puntos: 0";
  cargarNivel();
}

document.addEventListener("DOMContentLoaded", cargarNivel);