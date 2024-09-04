const canvas = document.getElementById("canvas");
const color = document.getElementById("color");
const grosor = document.getElementById("grosor");
const borrar = document.getElementById("borrar");
const dibujar = document.getElementById("Dibujar");
const rectangulo = document.getElementById("Rectangulo");
const ctx = canvas.getContext("2d");

let dibujando = false;
let dibujandoRectangulo = false;

let startX;
let startY;

ctx.strokeStyle = color.value;
ctx.lineWidth = grosor.value;

borrar.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

color.addEventListener("change", () => {
  ctx.strokeStyle = color.value;
});

grosor.addEventListener("change", () => {
  ctx.lineWidth = grosor.value;
});

dibujar.addEventListener("click", () => {
  canvas.removeEventListener("touchstart", dibujarRectangulo);
  canvas.removeEventListener("touchend", pararRectangulo);
  canvas.removeEventListener("touchmove", movimientoRectangulo);

  canvas.removeEventListener("mousedown", dibujarRectangulo);
  canvas.removeEventListener("mouseup", pararRectangulo);
  canvas.removeEventListener("mousemove", movimientoRectangulo);

  canvas.addEventListener("touchstart", comenzarDibujo);
  canvas.addEventListener("touchend", pararDibujo);
  canvas.addEventListener("touchmove", movimientoDibujo);

  canvas.addEventListener("mousedown", comenzarDibujo);
  canvas.addEventListener("mouseup", pararDibujo);
  canvas.addEventListener("mousemove", movimientoDibujo);
});

rectangulo.addEventListener("click", () => {
  canvas.removeEventListener("touchstart", comenzarDibujo);
  canvas.removeEventListener("touchend", pararDibujo);
  canvas.removeEventListener("touchmove", movimientoDibujo);

  canvas.removeEventListener("mousedown", comenzarDibujo);
  canvas.removeEventListener("mouseup", pararDibujo);
  canvas.removeEventListener("mousemove", movimientoDibujo);

  canvas.addEventListener("touchstart", dibujarRectangulo);
  canvas.addEventListener("touchend", pararRectangulo);
  canvas.addEventListener("touchmove", movimientoRectangulo);

  canvas.addEventListener("mousedown", dibujarRectangulo);
  canvas.addEventListener("mouseup", pararRectangulo);
  canvas.addEventListener("mousemove", movimientoRectangulo);
});

function comenzarDibujo(e) {
  dibujando = true;
  ctx.beginPath();
  ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function pararDibujo(e) {
  dibujando = false;
}

function movimientoDibujo(e) {
  if (dibujando) {
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
  }
}

function dibujarRectangulo(e) {
  dibujandoRectangulo = true;
  startX = e.clientX - canvas.offsetLeft;
  startY = e.clientY - canvas.offsetTop;
}

function pararRectangulo() {
  dibujandoRectangulo = false;
}

function movimientoRectangulo(e) {
  if (dibujandoRectangulo) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(
      startX,
      startY,
      e.clientX - canvas.offsetLeft - startX,
      e.clientY - canvas.offsetTop - startY
    );
  }
}
