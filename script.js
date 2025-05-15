let fraseCorrecta = "Hoy el sol está brillante.";
let fraseCompleta = "";

function completarFrase(palabra) {
    fraseCompleta = palabra + " el sol está brillante.";
    document.getElementById("game-description").textContent = fraseCompleta;
    document.getElementById("message").textContent = ""; // Limpia el mensaje anterior
}

function verificarFrase() {
    const mensaje = document.getElementById("message");
    const sonidoCorrecto = document.getElementById("sonido-correcto");
    const sonidoIncorrecto = document.getElementById("sonido-incorrecto");

    if (fraseCompleta === fraseCorrecta) {
        mensaje.textContent = "✅ ¡Correcto! La frase está completa.";
        mensaje.style.color = "green";
        sonidoCorrecto.play();
    } else {
        mensaje.textContent = "❌ ¡Incorrecto! Inténtalo otra vez.";
        mensaje.style.color = "red";
        sonidoIncorrecto.play();
    }
}
