let num1, num2, respuesta, operacion, textoOperacion;
let aciertos = 0;
let errores = 0;
let tiempoRestante = 20;
let intervalo;
const txt_tiempo = document.getElementById("tiempo");

const txt_suma = document.getElementById("suma");
const op1 = document.getElementById("op1");
const op2 = document.getElementById("op2");
const op3 = document.getElementById("op3");
const txt_msj = document.getElementById("msj");
const txt_resultado = document.getElementById("resultado");
const txt_aciertos = document.getElementById("aciertos");
const txt_errores = document.getElementById("errores");


const sonidoBien = document.getElementById("audio-bien");
const sonidoMal = document.getElementById("audio-mal");
const sonidoPerder = document.getElementById("audio-perder");

function generarOperacion() {
	const operadores = ['+', '-', '*', '/', '√'];
	operacion = operadores[Math.floor(Math.random() * operadores.length)];

	// Rango de dificultad moderada
	num1 = Math.floor(Math.random() * 50) + 1;
	num2 = Math.floor(Math.random() * 12) + 1;

	switch (operacion) {
		case '+':
			respuesta = num1 + num2;
			textoOperacion = `${num1} + ${num2} =`;
			break;
		case '-':
			if (num1 < num2) [num1, num2] = [num2, num1];
			respuesta = num1 - num2;
			textoOperacion = `${num1} - ${num2} =`;
			break;
		case '*':
			respuesta = num1 * num2;
			textoOperacion = `${num1} × ${num2} =`;
			break;
		case '/':
			respuesta = num1;
			let temp = num1 * num2;
			textoOperacion = `${temp} ÷ ${num2} =`;
			respuesta = num1;
			break;
		case '√':
			const cuadrados = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196];
    		let raizNum = cuadrados[Math.floor(Math.random() * cuadrados.length)];
    		respuesta = Math.sqrt(raizNum);
    		textoOperacion = `√${raizNum} =`;
    		break;
	}
	txt_suma.innerHTML = textoOperacion;
}

function comenzar() {
	txt_resultado.innerHTML = "?";
	txt_msj.innerHTML = "";
	txt_msj.style.color = "black";
	generarOperacion();
	iniciarTemporizador();

	let opciones = [respuesta];
	while (opciones.length < 3) {
		let incorrecta = respuesta + Math.floor(Math.random() * 10 - 5);
		if (incorrecta !== respuesta && !opciones.includes(incorrecta) && incorrecta >= 0) {
			opciones.push(incorrecta);
		}
	}
	opciones = opciones.sort(() => Math.random() - 0.5);

	op1.innerHTML = opciones[0];
	op2.innerHTML = opciones[1];
	op3.innerHTML = opciones[2];
	habilitarOpciones();
}

function controlarRespuesta(opcionElegida) {
	const eleccion = parseInt(opcionElegida.innerHTML);
	txt_resultado.innerHTML = eleccion;

	if (eleccion === respuesta) {
		txt_msj.innerHTML = "¡Excelente!";
		txt_msj.style.color = "green";
		sonidoBien.play();
        aciertos++;
        txt_aciertos.innerHTML = aciertos;
		clearInterval(intervalo);
		setTimeout(comenzar, 2000);
	} else {
		txt_msj.innerHTML = "¡Intenta de nuevo!";
		txt_msj.style.color = "red";
		sonidoMal.play();
        errores++;
        txt_errores.innerHTML = errores;
		setTimeout(() => {
			txt_resultado.innerHTML = "?";
			txt_msj.innerHTML = "";
		}, 2000);
	}
}
function iniciarTemporizador() {
	clearInterval(intervalo); // Reiniciar
	tiempoRestante = 20;
	txt_tiempo.innerHTML = tiempoRestante;
	intervalo = setInterval(() => {
		tiempoRestante--;
		txt_tiempo.innerHTML = tiempoRestante;
		if (tiempoRestante <= 0) {
			clearInterval(intervalo);
			deshabilitarOpciones();
			sonidoPerder.play();


			setTimeout(() => {
				const reiniciar = confirm("Se acabó el tiempo. ¿Quieres volver a jugar?");
				if (reiniciar) {
					aciertos = 0;
					errores = 0;
					txt_aciertos.innerHTML = aciertos;
					txt_errores.innerHTML = errores;
					habilitarOpciones();
					comenzar();
				}
			}, 200);
		}
	}, 1000);
}
function deshabilitarOpciones() {
	op1.onclick = null;
	op2.onclick = null;
	op3.onclick = null;
	op1.style.opacity = "0.5";
	op2.style.opacity = "0.5";
	op3.style.opacity = "0.5";
}

function habilitarOpciones() {
	op1.onclick = () => controlarRespuesta(op1);
	op2.onclick = () => controlarRespuesta(op2);
	op3.onclick = () => controlarRespuesta(op3);
	op1.style.opacity = "1";
	op2.style.opacity = "1";
	op3.style.opacity = "1";
}

comenzar();

