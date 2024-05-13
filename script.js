let btn = document.getElementsByClassName(".btn")
let btnInicio = document.querySelector(".inciarjuego")
let cuadrilla = document.querySelector(".cuadrilla")
let popup = document.querySelector(".popup");
let juegaDeNuevo = document.querySelector(".juegaDeNuevo");
let muestraPuntaje = document.querySelector(".muestraPuntaje")
let arriba = document.querySelector(".arriba")
let fondo = document.querySelector(".abajo")
let derecha = document.querySelector(".derecha")
let izquierda = document.querySelector(".izquierda")
let ancho = 10;
let indiceActual = 0
let indiceManzana = 0
let serpienteActual = [2, 1, 0]
let direccion = 1
let puntaje = 0
let velocidad = 0.8
let tiempoIntervalo = 0
let interval = 0

document.addEventListener("DOMContentLoaded", function () {
	document.addEventListener("keyup", control)
	crearTablero()

	 
		cuadrilla.style.display = "none"
		muestraPuntaje.style.display = "none"
		btn.style.display = "none"
	
		
	juegaDeNuevo.addEventListener("click", repeticion)
	
})

function crearTablero() {

	popup.style.display = "none";
	for (let i = 0; i < 100; i++) {
		let div = document.createElement("div")
		cuadrilla.appendChild(div);

	}
}

function comienzaJuego() {

	let cuadrados = document.querySelectorAll(".cuadrilla div")
	manzanaAlAzar(cuadrados)
	btnInicio.style.display = "none";



	direccion = 1;
	muestraPuntaje.innerHTML = puntaje
	tiempoIntervalo = 1000
	serpienteActual = [2, 1, 0]
	indiceActual = 0
	serpienteActual.forEach(index => cuadrados[index].classList.add("serpiente"))
	interval = setInterval(moverResultado, tiempoIntervalo)

}

function moverResultado() {

	let cuadrados = document.querySelectorAll(".cuadrilla div")
	if (compruebaPorGolpes(cuadrados)) {
		alert("ala verga")
		
		cuadrilla.style.display = "none"
		muestraPuntaje.style.display = "none"
		arriba.style.display = "none"
		fondo.style.display = "none"
		derecha.style.display = "none"
		izquierda.style.display = "none"
		popup.style.display = "flex"
		return clearInterval(interval)
	} else {
		mueveSerpiente(cuadrados)
	}
}

function mueveSerpiente(cuadrados) {
	let cola = serpienteActual.pop()
	cuadrados[cola].classList.remove("serpiente")
	serpienteActual.unshift(serpienteActual[0] + direccion)
	//moviento termina aqui
	comeManzana(cuadrados, cola)
	cuadrados[serpienteActual[0]].classList.add("serpiente")

}
function compruebaPorGolpes(cuadrados) {
	if (
		(serpienteActual[0] + ancho >= (ancho * ancho) && direccion === ancho) ||
		(serpienteActual[0] % ancho === ancho - 1 && direccion === 1) ||
		(serpienteActual[0] % ancho === 0 && direccion === -1) ||
		(serpienteActual[0] - ancho <= 0 && direccion === -ancho) ||
		cuadrados[serpienteActual[0] + direccion].classList.contains("serpiente")
	) {
		return true;
	} else {
		return false;
	}
}
function comeManzana(cuadrados, cola) {
	if (cuadrados[serpienteActual[0]].classList.contains("manzana")) {

		cuadrados[serpienteActual[0]].classList.remove("manzana");
		cuadrados[cola].classList.add("serpiente")
		serpienteActual.push(cola)
		manzanaAlAzar(cuadrados)
		puntaje++
		muestraPuntaje.textContent = puntaje
		clearInterval(interval)
		tiempoIntervalo = tiempoIntervalo * velocidad
		interval = setInterval(moverResultado, tiempoIntervalo)

	}
}

function manzanaAlAzar(cuadrados) {
	do {
		indiceManzana = Math.floor(Math.random() * cuadrados.length)
	} while (cuadrados[indiceManzana].classList.contains("serpiente"))
	cuadrados[indiceManzana].classList.add("manzana")

}
function control(e) {
	if (e.keycode === 39) {
		direccion = 1; //derecha
	} else if (e.keycode === 38) {
		direccion = -ancho // siempre presionamos la flecha de arriba
	} else if (e.keycode === 37) {
		direccion = -1 // izquierda la serpiente ira un div a la izquieda
	} else if (e.keycode === 40) {
		direccion = +ancho; // la serpiente ira 10 div abajo
	}

}
arriba.addEventListener("click", () => direccion = -ancho)
fondo.addEventListener("click", () => direccion = +ancho)
izquierda.addEventListener("click", () => direccion = -1)
derecha.addEventListener("click", () => direccion = 1)

function repeticion() {

	cuadrilla.innerHTML = " "
	crearTablero()
	comienzaJuego()
   
	    cuadrilla.style.display = ""
		muestraPuntaje.style.display = ""
		arriba.style.display = ""
		fondo.style.display = ""
		derecha.style.display = ""
		izquierda.style.display = ""
		popup.style.display = "none";

}
