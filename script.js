const botonCarta = document.querySelector("#boton-carta");
const botonFuturo = document.querySelector("#boton-futuro");
const seccionCarta = document.querySelector("#carta");
const seccionFuturo = document.querySelector("#futuro");
const corazones = document.querySelector("#corazones");
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const canvas = document.querySelector("#estrellas");
const ctx = canvas.getContext("2d");
const botonRecuerdos = document.querySelector("#boton-recuerdos");
const seccionRecuerdos = document.querySelector("#recuerdos");
let estrellas = [];

function crearEstrellas() {
  const escala = window.devicePixelRatio || 1;

  canvas.width = window.innerWidth * escala;
  canvas.height = window.innerHeight * escala;
  ctx.setTransform(escala, 0, 0, escala, 0, 0);

  estrellas = Array.from({ length: 110 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    radio: Math.random() * 1.5 + 0.3,
    opacidad: Math.random() * 0.7 + 0.2,
    cambio: Math.random() * 0.012 + 0.003
  }));
}

function dibujarEstrellas() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  estrellas.forEach((estrella) => {
    estrella.opacidad += estrella.cambio;

    if (estrella.opacidad > 0.95 || estrella.opacidad < 0.15) {
      estrella.cambio *= -1;
    }

    ctx.beginPath();
    ctx.arc(estrella.x, estrella.y, estrella.radio, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 225, 235, ${estrella.opacidad})`;
    ctx.fill();
  });

  if (!reduceMotion) {
    requestAnimationFrame(dibujarEstrellas);
  }
}

crearEstrellas();
dibujarEstrellas();
window.addEventListener("resize", crearEstrellas);

botonCarta.addEventListener("click", () => {
  seccionCarta.hidden = false;
  seccionCarta.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth"
  });
  lanzarCorazones(18);
});
botonRecuerdos.addEventListener("click", () => {
  seccionRecuerdos.hidden = false;
  seccionRecuerdos.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth"
  });
  lanzarCorazones(16);
});

botonFuturo.addEventListener("click", () => {
  seccionFuturo.hidden = false;
  seccionFuturo.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth"
  });
  lanzarCorazones(34);
});

function lanzarCorazones(cantidad) {
  if (reduceMotion) return;

  for (let i = 0; i < cantidad; i += 1) {
    const corazon = document.createElement("span");

    corazon.className = "corazon-flotante";
    corazon.textContent = Math.random() > 0.3 ? "♥" : "♡";
    corazon.style.left = `${Math.random() * 100}%`;
    corazon.style.fontSize = `${14 + Math.random() * 25}px`;
    corazon.style.animationDuration = `${4 + Math.random() * 3}s`;
    corazon.style.animationDelay = `${Math.random() * 1.2}s`;

    corazones.appendChild(corazon);
    corazon.addEventListener(
      "animationend",
      () => corazon.remove(),
      { once: true }
    );
  }
}
const observadorRecuerdos = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("visible");
      observadorRecuerdos.unobserve(entrada.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".recuerdo").forEach((tarjeta) => {
  observadorRecuerdos.observe(tarjeta);
});
