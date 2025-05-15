const animales = document.querySelectorAll('.animal');
const zonas = document.querySelectorAll('.zona');

const sonidoCorrecto = document.getElementById('sonido-correcto');
const sonidoError = document.getElementById('sonido-error');
const mensaje = document.getElementById('mensaje');

// Asignación correcta de animales
const ubicacionesCorrectas = {
    leon: 'jungla',
    tiburon: 'oceano',
    camello: 'desierto'
};

// Función para verificar si todos los animales están bien ubicados
function verificarFinal() {
    let todosCorrectos = true;

    for (const [animalId, zonaId] of Object.entries(ubicacionesCorrectas)) {
        const animal = document.getElementById(animalId);
        const zona = document.getElementById(zonaId);

        if (!zona.contains(animal)) {
            todosCorrectos = false;
            break;
        }
    }

    if (todosCorrectos) {
        mensaje.textContent = '¡Felicidades! Todos los animales están en su hábitat correcto 🎉';
        mensaje.style.color = 'green';
    }
}

// Al iniciar el arrastre
animales.forEach(animal => {
    animal.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('id', animal.id);
    });
});

// Al pasar por encima de una zona
zonas.forEach(zona => {
    zona.addEventListener('dragover', (e) => e.preventDefault());

    zona.addEventListener('drop', (e) => {
        e.preventDefault();
        const id = e.dataTransfer.getData('id');
        const animal = document.getElementById(id);

        // Limpiar clases visuales anteriores
        zona.classList.remove('correcto', 'incorrecto');

        const esCorrecto = ubicacionesCorrectas[id] === zona.id;

        if (esCorrecto) {
            zona.appendChild(animal);
            zona.classList.add('correcto');
            mensaje.textContent = '¡Correcto!';
            mensaje.style.color = 'green';
            sonidoCorrecto.play();

            setTimeout(() => {
                zona.classList.remove('correcto');
            }, 1000);

            verificarFinal(); // Verificamos si todo ya está bien

        } else {
            zona.classList.add('incorrecto');
            mensaje.textContent = 'Incorrecto, intenta de nuevo';
            mensaje.style.color = 'red';
            sonidoError.play();

            setTimeout(() => {
                zona.classList.remove('incorrecto');
            }, 1000);
        }
    });
});
