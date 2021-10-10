"use strict"

let juego = null;
var canvas = null;
let ctx= null;
let menu = null;
let BoardColumns = 5;
let BoardRows = 5;
var buttonReinicio=document.querySelector("#reinicio")

var Board_W = 0;
var Board_H = 0;
var NumeroFichas = 0;
var imgP1;
var imgP2;
var config = document.querySelector("#config");

function mostrarJuego() {
    canvas.style.display = 'block';
    buttonReinicio.style.display = 'block';
    config.style.display = 'none';
}


 function main() {
    let buttonEmpezar = document.querySelector('#empezar')

    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext("2d");
    canvas.style.display = 'none';
    buttonReinicio.style.display = 'none';
    juego = new Juego(ctx);
    buttonEmpezar.addEventListener("click", empezar)
}   
async function empezar() {
    BoardColumns = document.querySelector("#columnas").value;
    BoardRows = document.querySelector("#filas").value;
        Board_W = (30 * 2) * BoardColumns + 10 * BoardColumns;
        Board_H = (30 * 2) * BoardRows + 10 * BoardRows;
        NumeroFichas = (BoardColumns * BoardRows) / 2;
        mostrarJuego();
        juego.inicioJuego();
}


document.addEventListener("DOMContentLoaded", main);

